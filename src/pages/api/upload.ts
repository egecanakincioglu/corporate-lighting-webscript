import {
  readFileSync,
  writeFileSync,
  renameSync,
  mkdirSync,
  readdirSync,
  rmSync,
} from "fs";
import { join } from "path";
import sharp from "sharp";
import formidable, { IncomingForm } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyUser } from "@/src/modules/database/events/verifyUser";
import {
  findFileDataFromSettings,
  getExtensionChecker,
  getFileName,
  tempUploadDir,
} from "@/src/modules/helpers/files";
import {
  allowedFileExtensions,
  getFilePath,
  sendResponse,
  textUploadKeys,
} from "@/projectData";
import { uploadsDB } from "@/src/lib/jsonDb";
import { isArray, isObject, isString } from "@/src/lib/verifications";
import {
  RequestResult,
  TextRawSetting,
  UploadFileKeySettings,
} from "@/src/@types/database";
import { parseJsonBody } from "@/src/modules/helpers/objects";
import { getSEO } from "@/src/lib/seo";

export const config = {
  api: {
    bodyParser: false,
  },
};

function clearTempFile() {
  rmSync(tempUploadDir, { recursive: true });
  mkdirSync(tempUploadDir);
}

async function handleSingleFileUpload(
  uploadFile: formidable.File,
  uploadedFiles: formidable.File[],
  fields: formidable.Fields<string>,
  fileSettings: UploadFileKeySettings
): Promise<RequestResult> {
  try {
    const fileType = fileSettings.type;
    const checkExtension = getExtensionChecker(fileType);

    if (!checkExtension) {
      return { message: "Dosya türü desteklenmiyor", status: false };
    }

    const result = checkExtension(uploadFile.originalFilename ?? "");

    if (!result) {
      return { message: `Desteklenmeyen dosya formatı.`, status: false };
    }

    const { description, title, additionalDescription } = fields;
    const {
      description: useDescription,
      additionalDescription: useAdditionalDescription,
      title: useTitle,
      uploadName,
    } = fileSettings;

    const fileIndex = uploadedFiles.indexOf(uploadFile);

    const uploadDescription = description?.at(fileIndex);
    const uploadTitle = title?.at(fileIndex);
    const uploadAdditionalDescription = additionalDescription?.at(fileIndex);

    if (useDescription && !uploadDescription) {
      return { message: "Dosya açıklaması belirtilmelidir", status: false };
    }

    if (useAdditionalDescription && !uploadAdditionalDescription) {
      return { message: "Ek açıklama belirtilmelidir", status: false };
    }

    if (useTitle && !uploadTitle) {
      return { message: "Dosya başlığı belirtilmelidir", status: false };
    }

    const fileBuffer = readFileSync(uploadFile.filepath);
    const finalBuffer = await (fileType === "image"
      ? sharp(fileBuffer).webp().toBuffer()
      : fileBuffer);

    const uploadNameBase = getFileName(uploadName);
    const finalUploadName = uploadNameBase.endsWith("-")
      ? `${uploadNameBase}${fileIndex + 1}`
      : uploadNameBase;
    const fileExtension = allowedFileExtensions[fileType].at(0);
    const finalExtension = fileExtension ? `.${fileExtension}` : "";
    const finalUploadPath = join(
      tempUploadDir,
      finalUploadName + finalExtension
    );

    renameSync(uploadFile.filepath, finalUploadPath);
    writeFileSync(finalUploadPath, finalBuffer);

    return { status: true };
  } catch (error) {
    console.log(error);
    return { message: "Dosya yükleme başarısız", status: false };
  }
}

async function handleFileUpload(req: NextApiRequest): Promise<RequestResult> {
  try {
    const form = new IncomingForm({
      uploadDir: tempUploadDir,
      keepExtensions: true,
      multiples: true,
      allowEmptyFiles: false,
    });

    const [fields, data] = await form.parse(req);
    const { files: uploadedFiles } = data;
    const { name } = fields;
    const fileName = name?.at(0);

    if (!fileName) {
      return { message: "Dosya adı belirtilmelidir", status: false };
    }

    const fileSettings = findFileDataFromSettings(fileName);

    if (!fileSettings) {
      return {
        message: "Yüklenmek istenen dosya sistemde bulunamadı",
        status: false,
      };
    }

    const { count, uploadName } = fileSettings;

    if (!uploadedFiles) {
      return { message: `Yüklenen dosyalar bulunamadı`, status: false };
    }

    if (uploadedFiles.length !== count) {
      return {
        message: `Yüklenen dosya sayısı ${count} olmalıdır`,
        status: false,
      };
    }

    for (const uploadFile of uploadedFiles) {
      const result = await handleSingleFileUpload(
        uploadFile,
        uploadedFiles,
        fields,
        fileSettings
      );

      if (!result.status) {
        return { message: result.message, status: false };
      }
    }

    const tempUploadedFiles = readdirSync(tempUploadDir, {
      withFileTypes: true,
    }).filter((file) => file.isFile());

    for (const file of tempUploadedFiles) {
      const filePath = join(tempUploadDir, file.name);
      const finalPath = getFilePath(
        "public",
        ...uploadName.split("/").slice(0, -1),
        file.name
      );

      renameSync(filePath, finalPath);
    }

    if (fields.description?.length || fields.title?.length) {
      uploadsDB.overwriteKey("files", {
        [fileName]: {
          descriptions: fields.description,
          titles: fields.title,
          additionalDescriptions: fields.additionalDescription,
        },
      });
    }

    return { status: true, message: "Dosyalarınız başarıyla yüklendi" };
  } catch (error) {
    console.error(error);
    return { message: "Yükleme başarısız", status: false, code: 500 };
  }
}

function handleSingleTextUpload(
  entry: unknown,
  setting: TextRawSetting
): RequestResult {
  const [count, verification] = setting;
  if (!isString(entry)) {
    return { message: "Metin tipi geçersiz", status: false };
  }

  if (!entry.length) {
    return { message: "Metin boş olamaz", status: false };
  }

  if (entry.length > count) {
    return {
      message: `Metin en fazla ${setting} karakter olabilir`,
      status: false,
    };
  }

  if (verification && !verification(entry)) {
    return { message: "Metin doğrulama başarısız", status: false };
  }

  return { status: true };
}

function handleTextUpload(textUpload: object): RequestResult {
  if (!isObject(textUpload)) {
    return { message: "Yüklenen metin bilgileri geçersiz", status: false };
  }

  const entries = Object.entries(textUpload);

  for (const [key, entry] of entries) {
    if (!isObject(entry) && !isString(entry)) {
      return { message: "Metin bilgileri geçersiz", status: false };
    }

    if (!(key in textUploadKeys)) {
      return { message: `Metin adı ${key} belirtilmemiş`, status: false };
    }

    const setting = textUploadKeys[key as keyof typeof textUploadKeys]!;

    if (isArray(setting)) {
      const result = handleSingleTextUpload(entry, setting);

      if (!result.status) {
        return result;
      }
    } else {
      if (!isObject(entry)) {
        return { message: "Metin bilgisi geçersiz", status: false };
      }

      if (Object.keys(entry).length !== Object.keys(setting).length) {
        return { message: "Metin bilgileri eksik", status: false };
      }

      for (const key in setting) {
        if (!(key in entry)) {
          return { message: `${key} belirtilmemiş`, status: false };
        }

        const inlineSetting: TextRawSetting =
          setting[key as keyof typeof setting]!;
        const value: unknown = entry[key as keyof typeof entry];
        const result = handleSingleTextUpload(value, inlineSetting);

        if (!result.status) {
          return result;
        }
      }
    }
  }

  uploadsDB.overwriteKey("texts", textUpload);
  return { status: true, message: "Metin başarıyla yüklendi" };
}

async function handlePostRequest(req: NextApiRequest): Promise<RequestResult> {
  const token = req.cookies.sessionToken;
  const { status } = await verifyUser(token);
  const contentType = req.headers["content-type"];

  if (!status) {
    return { message: "Unauthorized", status: false, code: 401 };
  }

  if (contentType?.includes("application/json")) {
    const body = await parseJsonBody(req);

    if (
      !isObject(body) ||
      !("textUpload" in body) ||
      !isObject(body.textUpload)
    ) {
      return { message: "Geçersiz veri girildi.", status: false };
    }

    return handleTextUpload(body.textUpload);
  }

  return await handleFileUpload(req);
}

async function handleGetRequest(): Promise<RequestResult> {
  const isUploading = uploadsDB.getKey("isUploading");

  if (isUploading) {
    return { message: "Başka bir yükleme işlemi devam ediyor", status: false };
  }

  return {
    status: true,
    data: {
      seo: getSEO(),
      files: uploadsDB.getKey("files"),
      texts: uploadsDB.getKey("texts"),
    },
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "POST": {
        if (uploadsDB.getKey("isUploading")) {
          return sendResponse(
            { message: "Başka bir yükleme işlemi devam ediyor", status: false },
            res
          );
        }
        uploadsDB.setKey("isUploading", true);
        const result = await handlePostRequest(req);
        if (
          !result.status &&
          (result.code === undefined || result.code === 400)
        ) {
          clearTempFile();
        }
        uploadsDB.setKey("isUploading", false);
        return sendResponse(result, res);
      }
      case "GET": {
        const result = await handleGetRequest();
        return sendResponse(result, res);
      }
      default: {
        return sendResponse(
          { status: false, code: 405, message: "Method Not Allowed" },
          res
        );
      }
    }
  } catch (error) {
    console.log("Server error:", error);
    process.exit(0);
    return sendResponse(
      { status: false, code: 500, message: "Internal Server Error" },
      res
    );
  }
}

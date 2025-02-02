import {
  allowedFileExtensions,
  getFilePath,
  uploadFileSettings,
} from "@/projectData";
import { FileType, UploadFileKeySettings } from "@/src/@types/database";
import { basename, extname } from "path";

export function findFileDataFromSettings(
  fileName: string
): UploadFileKeySettings | undefined {
  return Object.entries(uploadFileSettings).find(([name]) => {
    const nameWithoutExt = getFileName(name);
    return nameWithoutExt === fileName;
  })?.[1];
}

export function getExtensionChecker(
  fileType: FileType
): ((input: string) => boolean) | undefined {
  if (!(fileType in allowedFileExtensions)) return;

  const checkType = allowedFileExtensions[fileType];

  return (input: string) => {
    const ext = extname(input).slice(1).toLowerCase();
    return checkType.includes(ext);
  };
}

export function getFileName(path: string): string {
  return basename(path, extname(path));
}

export const tempUploadDir = getFilePath("temp");

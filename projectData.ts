import { join } from "path";
import { NextApiResponse } from "next";
import {
  RateLimitConfig,
  RequestResult,
  TextRawData,
  UploadFileSettings,
} from "./src/@types/database";
import {
  emailVerification,
  phoneVerification,
  socialMediaVerification,
} from "./src/lib/verifications";

export const projectFolderName = "afra-main";

export const allowedVisitPaths = [
  "contact",
  "mission",
  "vision",
  "services",
  "products",
  "terms",
  "privacy",
];

export const rateLimitConfig: RateLimitConfig = {
  changePassword: {
    limit: 3,
    interval: 60,
  },
  // firstLogin: {},
  login: {
    limit: 5,
    interval: 60,
  },
  // images: {},
  // upload: {},
  verification: {
    limit: 10,
    interval: 60,
  },
  messages: {
    limit: 2,
    interval: 7,
  },
  // verifyUser: {},
  visits: {
    limit: 30,
    interval: 60,
  },
};

export const allowedPaths = [
  "dashboard",
  "setup",
  "forgot-password",
  ...allowedVisitPaths,
];

export const uploadFileSettings: UploadFileSettings = {
  logo: {
    type: "image",
    name: "Logo",
    count: 1,
    description: false,
    title: false,
    uploadName: "main-logo",
  },
  banner: {
    type: "image",
    name: "Banner",
    count: 4,
    description: false,
    title: false,
    uploadName: "general-banner/banner-",
  },
  favorites: {
    type: "image",
    name: "Favoriler",
    count: 12,
    description: false,
    title: true,
    uploadName: "highlights/highlight-product-",
  },
  ads: {
    type: "image",
    name: "Reklamlar",
    count: 3,
    description: false,
    title: false,
    uploadName: "ad-banners/ad-banner-",
  },
  workingAreas: {
    type: "image",
    name: "Çalışma Alanları",
    count: 6,
    description: true,
    title: true,
    uploadName: "working-areas/work-area-",
  },
  catalog: {
    type: "pdf",
    name: "Katalog",
    count: 1,
    description: false,
    title: false,
    uploadName: "catalogs/afr-1",
  },
  services: {
    type: "image",
    name: "Hizmetler",
    count: 4,
    description: true,
    additionalDescription: true,
    title: true,
    uploadName: "service-areas/service-area-",
  },
};

export const facebookSiteVerification = socialMediaVerification("facebook");
export const instagramSiteVerification = socialMediaVerification("instagram");
export const linkedinSiteVerification = socialMediaVerification("linkedin");
export const twitterSiteVerification = socialMediaVerification("twitter", "x");

export const textUploadKeys: TextRawData = {
  name: [256],
  contact: {
    phone: [32, phoneVerification],
    email: [128, emailVerification],
    address: [512],
  },
  social: {
    facebook: [256, facebookSiteVerification],
    instagram: [256, instagramSiteVerification],
    linkedin: [256, linkedinSiteVerification],
    twitter: [256, twitterSiteVerification],
  },
  mission: [4096],
  vision: [4096],
};

export const allowedFileExtensions = {
  image: ["webp", "png", "jpg", "jpeg"],
  pdf: ["pdf"],
};

export const pathTranslations = {
  mainPage: "Ana Sayfa",
  contact: "İletişim",
  services: "Hizmetler",
  products: "Ürünler",
  mission: "Misyon",
  vision: "Vizyon",
  terms: "Koşullar",
  privacy: "Gizlilik",
};

export function getFilePath(...path: string[]): string {
  const dir = getProjectDir();
  return join(dir, ...path);
}

export function getProjectDir(): string {
  const dir = __filename.split(projectFolderName)[0] + projectFolderName;
  return dir;
}

export function sendResponse(
  input: RequestResult,
  response: NextApiResponse
): void {
  const { status, message } = input;
  const finalResponse = status
    ? { status, message, data: input.data }
    : { status, message };
  response.status(status ? 200 : input.code || 400).json(finalResponse);
}

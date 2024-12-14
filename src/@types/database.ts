import { JWTPayload } from "jose";
import {
  PartialRecord,
  RecursiveObject,
  VerificationFunction,
} from "./objects";
import { SEOConfig } from "./seo";

export type RateLimitConfig = PartialRecord<RateLimitURLConfig>;
export interface RateLimitURLConfig {
  limit: number;
  interval: number;
}

export interface AdSettings {
  clientId: string;
  clientSecret: string;
  developerToken: string;
  managerId: string;
  customerId: string;
  accessToken: string;
  refreshToken: string;
}

export interface SQLData {
  host: string;
  user: string;
  password: string;
  databaseName: string;
  adSettings: Partial<AdSettings>;
}

export interface PendingEmailData {
  email: string;
  token: string;
}

export type TextsUploadData = PartialRecord<
  RecursiveObject<string | undefined, 1>
>;
export type TextRawSetting = [number, VerificationFunction?];
export type TextRawData = PartialRecord<
  RecursiveObject<TextRawSetting | undefined, 1>
>;

export interface APIUploadsData {
  seo: SEOConfig;
  isUploading?: boolean;
  texts?: TextsUploadData;
  files?: {
    [key: string]: {
      descriptions: string[] | undefined;
      titles: string[] | undefined;
      additionalDescriptions: string[] | undefined;
    };
  };
}

export interface UploadsData {
  seo: SEOConfig;
  isUploading: boolean;
  texts: TextsUploadData;
  files: {
    [key: string]: {
      descriptions: string[] | undefined;
      titles: string[] | undefined;
      additionalDescriptions: string[] | undefined;
    };
  };
}

export interface FirstLoginData {
  step1: boolean;
  step2: FirstLoginStep2;
  step3: FirstLoginStep3;
}

export interface FirstLoginStep2 {
  host: string;
  user: string;
  password: string;
  database: string;
}

export interface FirstLoginStep3 {
  email: string;
  password: string;
}

export interface FirstLoginGETData {
  available: boolean;
  currentStep: number;
}

export interface SharedUser {
  id: number;
  username: string;
  email: string;
}

export interface User extends SharedUser {
  passwordHash: string;
  createdAt: Date;
  sessions: string[];
}

export interface UserLoginData {
  username: string;
  password: string;
}

export interface MySQLInitalizeOptions {
  host: string;
  user: string;
  password: string;
  database: string;
}

export interface VisitData {
  pageViewed: string;
  country: string;
  city: string;
  visitDate: Date;
  ipAddress: string;
  referrer: string;
  userAgent: string;
}

export interface UploadFileKeySettings {
  type: FileType;
  name: string;
  count: number;
  description: boolean;
  additionalDescription?: boolean;
  title: boolean;
  uploadName: string;
}

export type FileType = "image" | "pdf";
export type UploadFileSettings = PartialRecord<UploadFileKeySettings>;

export type RequestResult =
  | { status: false; message: string; code?: number }
  | { status: true; message?: string; data?: unknown };

export type VerifyTokenResult =
  | { status: true; data: VerifyTokenResultData }
  | { status: false; data?: VerifyTokenResultData };

export type VerifyUserResult = { status: true; user: User } | { status: false };

export interface VerifyTokenResultData {
  token: string;
  payload: JWTPayload;
}

import { NextRouter } from "next/router";
import { ReactNode } from "react";

export interface UploadDataProviderProps {
  children: ReactNode;
}

export interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  data?: string;
}

export interface Service {
  alt: string;
  url: string;
  image: File | undefined;
  title: string;
  description: string;
  detailedDescription: string;
}

export interface WorkArea {
  alt: string;
  image: File | undefined;
  url: string;
  title: string;
  description: string;
}

export interface Message {
  id: number;
  name: string;
  subject: string;
  email: string;
  message: string;
  sent_at?: Date;
}

export interface AdData {
  id: number;
  campaign: string;
  clicks: number;
  impressions: number;
  ctr: string;
}

export interface AdBanner {
  image: File | undefined;
  url: string;
}

export type Photo = [URL: string, File?: File];

export interface Photos {
  left: Photo;
  topCenter: Photo;
  bottomCenter: Photo;
  right: Photo;
}

export interface Product {
  image: File | undefined;
  title: string;
  url: string;
}

export interface Step2Props {
  dbHost: string;
  dbUsername: string;
  dbPassword: string;
  dbName: string;
  setErrors: (errors: { api: string }) => void;
  router: NextRouter;
}

export interface ImageData {
  src: string;
  alt: string;
}

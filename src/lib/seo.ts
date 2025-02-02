import {
  ComponentSEOConfig,
  PageSEOConfig,
  SEOConfig,
  SEOReplaceOptions,
} from "../@types/seo";
import SEO from "../../seo.json" assert { type: "json" };

export function getSEO(): SEOConfig {
  return SEO;
}

export function getComponentSEO(): ComponentSEOConfig {
  return getSEO().component;
}

export function getPageSEO(): PageSEOConfig {
  return getSEO().page;
}

export function replaceAlt(input: string, alt: string): string {
  return input.replace(/\{alt\}/g, alt);
}

export function replaceName(input: string, name: string): string {
  return input.replace(/\{name\}/g, name);
}

export function replaceUrl(input: string, url: string): string {
  return input.replace(/\{url\}/g, url);
}

export function replaceEmail(input: string, email: string): string {
  return input.replace(/\{email\}/g, email);
}

export function replacePhone(input: string, phone: string): string {
  return input.replace(/\{phone\}/g, phone);
}

export function replaceStyle(input: string, style: string): string {
  return input.replace(/\{style\}/g, style);
}

export const seoReplacerMap = {
  alt: replaceAlt,
  name: replaceName,
  url: replaceUrl,
  email: replaceEmail,
  phone: replacePhone,
  style: replaceStyle,
} as const;

export function seoTextReplacer(
  input: string,
  options: Partial<SEOReplaceOptions>
): string {
  return Object.entries(options).reduce(
    (acc, [key, value]) =>
      seoReplacerMap[key as keyof SEOReplaceOptions](acc, value as string),
    input
  );
}

export interface ComponentSEOConfig {
  workingAreas: {
    title: BackgroundTitle;
    images: PhotoURL;
  };
  vision: {
    title: BackgroundTitle;
  };
  terms: {
    title: FullTitle;
    sections: Section[];
  };
  serviceArea: {
    images: PhotoURL;
  };
  products: {
    title: BackgroundTitle;
  };
  privacy: {
    title: FullTitle;
    intro: string[];
    sections: Section[];
  };
  mission: {
    title: BackgroundTitle;
  };
  loading: {
    logo: Logo;
  };
  highlights: {
    title: BackgroundTitle;
    images: PhotoURL;
    ads: PhotoURL;
  };
  header: {
    logo: Logo;
  };
  footer: {
    logo: Logo;
    pages: {
      privacy: string;
      terms: string;
    };
    poweredBy: {
      name: string;
      url: string;
      logo: Logo;
    };
  };
  contact: {
    title: BackgroundTitle;
  };
  banner: {
    images: PhotoURL;
  };
}

export interface PageSEOConfig {
  name: string;
  description: string;
  keywords: string;
  favicon: string;
  manifest: string;
  font: string;
  ogImage: string;
  ogLocale: string;
  ogType: string;
  pages: {
    vision: PageConfig;
    terms: PageConfig;
    services: PageConfig;
    products: PageConfig;
    privacy: PageConfig;
    mission: PageConfig;
    mainPage: PageConfig;
    contact: ExtendedPageConfig;
  };
}

export interface SEOConfig {
  component: ComponentSEOConfig;
  page: PageSEOConfig;
}

export interface ExtendedPageConfig extends PageConfig {
  languages: string[];
  work: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  serviceArea: string;
}

export interface PageConfig {
  title: string;
  description: string;
  keywords: string;
}

export interface Section {
  title: string;
  content: string;
  warnings?: string[];
}

export interface Logo {
  path: string;
  alt: string;
}

export interface PhotoURL {
  urlTemplate: string;
  alt: string;
  count: number;
}

export interface BackgroundTitle {
  backgroundText: string;
  foregroundText: string;
}

export interface FullTitle {
  backgroundText: string;
  foregroundText: string;
  text: string;
}

export interface SEOReplaceOptions {
  alt: string;
  name: string;
  url: string;
  email: string;
  phone: string;
  style: string;
}

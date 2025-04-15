interface SeoFields {
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  noindex?: boolean;
  __component?: string;
}

export interface CategoryFields {
  locale?: string;
  name: string;
  slug?: string;
  description?: string;
  long_description?: any;
  visible?: boolean;
  icon?: any;
  seo?: SeoFields;
}

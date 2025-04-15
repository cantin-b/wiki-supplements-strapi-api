import type { Schema, Struct } from '@strapi/strapi';

export interface SharedAffiliateInfo extends Struct.ComponentSchema {
  collectionName: 'components_shared_affiliate_infos';
  info: {
    description: '';
    displayName: 'Affiliate Info';
  };
  attributes: {
    affiliate_link: Schema.Attribute.String;
    currency: Schema.Attribute.String;
    note: Schema.Attribute.Text;
    price: Schema.Attribute.Decimal;
    store_name: Schema.Attribute.String;
  };
}

export interface SharedBanEntry extends Struct.ComponentSchema {
  collectionName: 'components_shared_ban_entries';
  info: {
    displayName: 'ban-entry';
  };
  attributes: {
    name: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo Meta';
  };
  attributes: {
    canonical_url: Schema.Attribute.String;
    meta_description: Schema.Attribute.Text;
    meta_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    meta_title: Schema.Attribute.String;
    noindex: Schema.Attribute.Boolean;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.affiliate-info': SharedAffiliateInfo;
      'shared.ban-entry': SharedBanEntry;
      'shared.seo': SharedSeo;
    }
  }
}

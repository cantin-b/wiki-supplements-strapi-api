/**
 * category controller
 */
import { slugify } from '../../../utils/slugify';
import { CategoryFields } from '../../types/category'
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::category.category', ({ strapi }) => ({
  /*
    async find(ctx) {
      const { query } = ctx;
      const locale = query.locale || 'en';
      const page = Number(query.page) || 1;
      const pageSize = Number(query.pageSize) || 25;

      const start = (page - 1) * pageSize;

      const [results, total] = await strapi.db.query('api::category.category').findWithCount({
        where: { 
          locale,
          publishedAt: {$notNull: true}
        },
        offset: start,
        limit: pageSize,
      });

      const pagination = {
        page,
        pageSize,
        pageCount: Math.ceil(total / pageSize),
        total,
      };

      return ctx.send(this.transformResponse(results, { pagination }));
    },
  */

  async find(ctx) {
    const doc = await strapi.documents('api::category.category').findMany({ 
      populate: '*' 
    });

    return ctx.send(this.transformResponse(doc));
  },

  async findOne(ctx) {
    const doc = await strapi.documents('api::category.category').findFirst();

    return ctx.send(this.transformResponse(doc));
  },

  async findByDocId(ctx) {
    const { documentId } = ctx.params; // or from an entity
    console.log('ctx.params ', ctx.params);
    const locale = typeof ctx.query.locale === 'string' ? ctx.query.locale : 'en';
    const doc = await strapi.documents('api::category.category').findOne({ 
      documentId, 
      locale
    });
    return ctx.send(this.transformResponse(doc));
  },

  // async findOne(ctx) {
  //   const id = Number(ctx.params.id);
  //   const locale = ctx.query.locale || 'en';
  //   const entity = await strapi.db.query('api::category.category').findOne({
  //     where: {
  //       id, 
  //       locale,
  //       publishedAt: { $notNull: true}
  //     },
  //   });
  //   console.log('FIND ONE DEBUG', { id, locale, entity });

  //   const localizations = await strapi.db.query('api::category.category').findMany({
  //     where: {
  //       documentId: entity.documentId,
  //       id: {$ne: entity.id},
  //       publishedAt: { $notNull: true }
  //     }
  //   })

  //   if (!entity || !entity.publishedAt) {
  //     return ctx.notFound('Category not found or not published');
  //   }
  //   return ctx.send(this.transformResponse({ ...entity, localizations }));
  // },

  // async create(ctx) {
  //   const { body } = ctx.request;
  //   const sanitizedInput = await this.sanitizeInput(body, ctx);

  //   const newEntity = await strapi.documents('api::category.category').create({
  //     data: sanitizedInput
  //   });

  //   return this.transformResponse(newEntity);
  // },

  async create(ctx) {
    const { body, query: { locale = 'en' } } = ctx.request;
    const sanitizedInput = await this.sanitizeInput(body, ctx) as CategoryFields;

    // Add slug from name
    if (!sanitizedInput.slug) {
      sanitizedInput.slug = slugify(sanitizedInput.name)
    }
    
    // Attach SEO component format
    if (sanitizedInput.seo) {
      sanitizedInput.seo = {
        __component: 'shared.seo',
        ...sanitizedInput.seo
      }
    }

    // 1. Create the base document
    const baseDoc = await strapi.documents('api::category.category').create({
      data: sanitizedInput,
      locale: String(locale),
      populate: {
        seo: true
      }
    });

    // 2. Create translations using the localizations field
    const translations: CategoryFields[] = body.translations || [];
  
    for (const translation of translations) {
      const translationInput = {
        ...translation,
        documentId: baseDoc.documentId,
        slug: translation.slug || slugify(translation.name),
        seo: translation.seo 
          ? {
            __component: 'shared.seo',
            ...translation.seo
          }
          : undefined
      };

      const filteredTranslationInput = Object.keys(translationInput).filter(([key, value]) => key !== locale)

      console.log(filteredTranslationInput)

      await strapi.documents('api::category.category').create({
        data: translationInput,
        locale: translation.locale,
        populate: {
          seo: true
        }
      });
    }

    return this.transformResponse(baseDoc);
  },

  async log(ctx) {
    console.log('STRAPI', strapi)
    strapi.log.info('Custom /log route hit'); // optional logging
    return ctx.send({ message: 'This is your custom log endpoint' });
  }
}));

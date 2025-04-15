import defaultRoutes from './default'
import customRoutes from './custom'

export default {
  routes: [
    ...defaultRoutes.routes,
    ...customRoutes.routes
  ]
}

/**
 * supplement router
 */

// import { factories } from '@strapi/strapi';

// export default factories.createCoreRouter('api::category.category');

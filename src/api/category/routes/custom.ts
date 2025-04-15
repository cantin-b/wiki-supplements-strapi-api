export default {
    routes: [
      {
        method: 'GET',
        path: '/log',
        handler: 'api::category.category.log',
        config: {
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/categories/doc-id/:documentId',
        handler: 'api::category.category.findByDocId',
        config: {
          auth: false
        }
      }
    ],
  };
  
export default {
  routes: [
    {
      method: 'GET',
      path: '/categories',
      handler: 'api::category.category.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/categories/:id',
      handler: 'api::category.category.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/categories',
      handler: 'api::category.category.create',
      config: {
        auth: {},
      },
    },
    {
      method: 'PUT',
      path: '/categories/:id',
      handler: 'api::category.category.update',
      config: {
        auth: {},
      },
    },
    {
      method: 'DELETE',
      path: '/categories/:id',
      handler: 'api::category.category.delete',
      config: {
        auth: {},
      },
    },
  ],
};

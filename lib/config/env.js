const { env } = process;

// Expose heroku helper
module.exports = {
  port: env.PORT,
  client: env.CLIENT_CONF ? env.CLIENT_CONF.split(',') : null,
  auth: {
    google: {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    JWTSecret: env.JWT_SECRET,
    domainWhitelist: env.DOMAIN_WHITELIST
      ? env.DOMAIN_WHITELIST.split(',')
      : null,
  },
  pagination: {
    offset: env.PAGINATION_OFFSET,
    limit: env.PAGINATION_LIMIT,
  },
};

const config = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    uri: process.env.MONGO_URI ,
    name: "contact-book-api",
  },
};
module.exports = config;

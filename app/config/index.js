const config = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    uri:
      process.env.MONGO_URI ||
      "mongodb+srv://chauthai:chauthai123@quanlyphongtro.zumwed9.mongodb.net/?retryWrites=true&w=majority",
    name: "contact-book-api",
  },
};
module.exports = config;

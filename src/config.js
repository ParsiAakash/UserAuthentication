const config = {
  port: process.env.PORT || 3000,
  mysql: {
    host: process.env.HOST || "bh.amazonaws.com",
    database: process.env.DATABASE || "dbBH",
    username: process.env.USERNAME || "user",
    password: process.env.PASSWORD || "password",
    port: 3306
  }
};

export default config;

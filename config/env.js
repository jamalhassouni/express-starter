const DevEnv = {
  PORT: 8000,
  APP_ENV: "development",
  baseURL: "http://localhost:8000",
};
const ProdEnv = {
  PORT: 8000,
  APP_ENV: "production",
  baseURL: "https://api.patternlot.com",
};

const env = process.env.NODE_ENV !== "production" ? DevEnv : ProdEnv;

module.exports = env;

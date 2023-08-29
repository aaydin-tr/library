const DBConfigs = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "libraryuser",
  password: process.env.DB_PASSWORD || "librarypassword",
  database: process.env.DB_DATABASE || "librarydb",
};

export default DBConfigs;

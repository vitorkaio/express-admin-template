require('dotenv').config()
const env = process.env.NODE_ENV; // 'dev' or 'test'

const development = {
 app: {
   db: {
     host: process.env.APP_DEV_DB_HOST,
     port: process.env.APP_DEV_DB_PORT,
     name: process.env.APP_DEV_DB_NAME,
   },
   port: process.env.APP_PORT
 }
};

const test = {
  type: {
    name: "test"
  }
};

const config = {
  development,
  test
};

module.exports = config[env];

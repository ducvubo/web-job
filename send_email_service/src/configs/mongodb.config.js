"use strict";

//lv 0
const dev = {
  app: {
    port: 8080,
  },
  db: `mongodb://localhost:27108/sso-app`,
};

//level 1
const pro = {
  app: {
    port: 8080,
  },
  db: `mongodb://localhost:27108/sso-app`,
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";
module.exports = config["dev"];

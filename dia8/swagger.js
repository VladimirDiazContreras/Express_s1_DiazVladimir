const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const yaml = require("yaml");

const file = fs.readFileSync("./openapi.yaml", "utf8");
const swaggerDocument = yaml.parse(file);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};


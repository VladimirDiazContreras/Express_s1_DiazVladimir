import fs from "fs";
import path from "path";
import yaml from "yaml";
import swaggerUi from "swagger-ui-express";

// Leemos el archivo openapi.yaml
const file = fs.readFileSync(path.resolve("docs/openapi.yaml"), "utf8");
// Lo parseamos de YAML a objeto JS
const swaggerDocument = yaml.parse(file);

export { swaggerUi, swaggerDocument };

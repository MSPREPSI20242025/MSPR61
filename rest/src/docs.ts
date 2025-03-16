import { Router } from "express";
import * as path from "path";
import * as fs from "fs";

const router = Router();

// Serve the OpenAPI spec as JSON
router.get("/openapi.json", (req, res) => {
    const yamlPath = path.join(__dirname, "../docs/swagger.yaml");
    const yaml = require("js-yaml");
    const fileContents = fs.readFileSync(yamlPath, "utf8");
    const jsonSpec = yaml.load(fileContents);
    res.json(jsonSpec);
});

// Serve the OpenAPI spec as YAML
router.get("/openapi.yaml", (req, res) => {
    const yamlPath = path.join(__dirname, "../docs/swagger.yaml");
    res.sendFile(yamlPath);
});

// Serve Redoc standalone HTML
router.get("/", (req, res) => {
    const htmlPath = path.join(__dirname, "../docs/redoc-static.html");
    res.sendFile(htmlPath);
});

export default router;

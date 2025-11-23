import { readFileSync } from "fs";
import { join } from "path";

const initSchemaSql = readFileSync(join(__dirname, "initSchema.sql"), "utf-8");

export const initSchemaStatements = initSchemaSql
  .split(";")
  .map((stmt) => stmt.trim())
  .filter((stmt) => stmt.length > 0);

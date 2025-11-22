import { readFileSync } from "fs";
import { join } from "path";

export const initSchema = readFileSync(
  join(__dirname, "initSchema.sql"),
  "utf-8"
);

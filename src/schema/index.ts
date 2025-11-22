import { readFileSync } from "fs";
import { join } from "path";

export const poolsSchema = readFileSync(
  join(__dirname, "pools.sql"),
  "utf-8"
);

export const swapsSchema = readFileSync(
  join(__dirname, "swaps.sql"),
  "utf-8"
);

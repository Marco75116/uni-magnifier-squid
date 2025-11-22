import { createClient } from "@clickhouse/client";

export const clickhouseClient = createClient({
  username: "default",
  password: "default",
  url: "http://localhost:8123",
});

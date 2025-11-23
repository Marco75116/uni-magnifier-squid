import pino from "pino";
import { ModifyLiquidityEventArgs } from "../../abi/PoolManager";

export function normalizeAddress(address: string): string {
  return address.toLowerCase();
}

export function getLogger(chainTag: string) {
  const prefix = chainTag.toUpperCase();

  return pino({
    base: null,
    messageKey: "message",
    level: process.env.LOG_LEVEL || "info",
    formatters: {
      level(label) {
        return { level: label.toUpperCase() };
      },
      log(object) {
        return {
          ...object,
          message: object.message ? `[${prefix}] ${object.message}` : undefined,
        };
      },
    },
    transport: process.stdout?.isTTY
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            messageKey: "message",
            ignore: "pid,hostname",
          },
        }
      : undefined,
  });
}

export function formatTimestampForClickHouse(date: Date): string {
  return date.toISOString().replace("T", " ").replace("Z", "").split(".")[0];
}

export function getPositionId(
  chainId: number,
  event: ModifyLiquidityEventArgs
): string {
  return `${chainId}-${event.sender}-${event.id}-${event.tickLower}-${event.tickUpper}-${event.salt}`;
}

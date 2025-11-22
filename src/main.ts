import { createClient } from "@clickhouse/client";
import { evmDecoder, evmPortalSource } from "@subsquid/pipes/evm";
import { clickhouseTarget } from "@subsquid/pipes/targets/clickhouse";
import { portalSqliteCache } from "@subsquid/pipes/portal-cache/node";
import assert from "assert";

import * as PoolManager from "./abi/PoolManager";
import * as PositionDiscriptor from "./abi/PositionDiscriptor";
import * as PositionManager from "./abi/PositionManager";
import * as Permit2 from "./abi/Permit2";
import { initSchema } from "./schema";
import {
  getNetworkConfig,
  networksConfigs,
} from "./utils/constants/network.constant";
import { clickhouseClient } from "./utils/clients/clickhouse.client";

// Validate network argument
assert(
  networksConfigs.hasOwnProperty(process.argv[2]),
  `Processor executable takes one argument - a network string ID - ` +
    `that must be in ${JSON.stringify(Object.keys(networksConfigs))}. Got "${
      process.argv[2]
    }".`
);

const network = process.argv[2];
const networkConfig = getNetworkConfig(network);
const CHAIN_ID = networkConfig.chainId;
const CONTRACTS = networkConfig.contracts;

/**
 * Converts a Date object to ClickHouse DateTime format string (YYYY-MM-DD HH:MM:SS)
 */
function formatTimestampForClickHouse(date: Date): string {
  return date.toISOString().replace("T", " ").replace("Z", "").split(".")[0];
}

/**
 * This example demonstrates how to index Uniswap V4 protocol events from Ethereum Mainnet.
 * It creates a connection to a local ClickHouse instance, sets up an EVM Portal Source to stream
 * events from Uniswap V4 PoolManager (pool initialization and swaps),
 * and pipes the decoded data to ClickHouse for storage and analysis.
 */
async function main() {
  await evmPortalSource({
    portal: {
      url: networkConfig.gatewaySqdUrl,
      finalized: true,
    },
    cache: portalSqliteCache({
      path: `./${networkConfig.chainTag}-portal.cache.sqlite`,
    }),
  })
    // Configure decoders for each contract. The events list is fully configurable -
    // specify only the events you need to index for your use case.
    .pipeComposite({
      PoolManager: evmDecoder({
        range: CONTRACTS.PoolManager.range,
        contracts: [CONTRACTS.PoolManager.address],
        events: {
          Initialize: PoolManager.events.Initialize,
          Swap: PoolManager.events.Swap,
        },
      }),
      // PositionDiscriptor: evmDecoder({
      //     range: CONTRACTS.PositionDiscriptor.range,
      //     contracts: [CONTRACTS.PositionDiscriptor.address],
      //     events: {...PositionDiscriptor.events},
      // }),
      // PositionManager: evmDecoder({
      //     range: CONTRACTS.PositionManager.range,
      //     contracts: [CONTRACTS.PositionManager.address],
      //     events: {...PositionManager.events},
      // }),
      // Permit2: evmDecoder({
      //     range: CONTRACTS.Permit2.range,
      //     contracts: [CONTRACTS.Permit2.address],
      //     events: {...Permit2.events},
      // }),
    })
    .pipeTo(
      clickhouseTarget({
        client: clickhouseClient,
        async onStart({ store }) {
          await store.command({
            query: initSchema,
          });
        },
        async onData({ data, store }) {
          const pools: {
            chainId: number;
            block_number: number;
            timestamp: string;
            tx_hash: string;
            pool_id: string;
            currency0: string;
            currency1: string;
            fee: number;
            tick_spacing: number;
            hooks: string;
            sqrt_price_x96: string;
            tick: number;
            sign: number;
          }[] = [];

          // Process PoolManager Initialize events
          for (const e of data.PoolManager?.Initialize || []) {
            pools.push({
              chainId: CHAIN_ID,
              block_number: e.block.number,
              timestamp: formatTimestampForClickHouse(e.timestamp),
              tx_hash: e.rawEvent.transactionHash,
              pool_id: e.event.id,
              currency0: e.event.currency0,
              currency1: e.event.currency1,
              fee: e.event.fee,
              tick_spacing: e.event.tickSpacing,
              hooks: e.event.hooks,
              sqrt_price_x96: e.event.sqrtPriceX96.toString(),
              tick: e.event.tick,
              sign: 1,
            });
          }

          if (pools.length > 0) {
            await store.insert({
              table: "pools",
              values: pools,
              format: "JSONEachRow",
            });
          }

          const swaps: {
            chainId: number;
            block_number: number;
            timestamp: string;
            tx_hash: string;
            pool_id: string;
            sender: string;
            amount0: string;
            amount1: string;
            sqrt_price_x96: string;
            liquidity: string;
            tick: number;
            fee: number;
            sign: number;
          }[] = [];

          // Process PoolManager Swap events
          for (const e of data.PoolManager?.Swap || []) {
            swaps.push({
              chainId: CHAIN_ID,
              block_number: e.block.number,
              timestamp: formatTimestampForClickHouse(e.timestamp),
              tx_hash: e.rawEvent.transactionHash,
              pool_id: e.event.id,
              sender: e.event.sender,
              amount0: e.event.amount0.toString(),
              amount1: e.event.amount1.toString(),
              sqrt_price_x96: e.event.sqrtPriceX96.toString(),
              liquidity: e.event.liquidity.toString(),
              tick: e.event.tick,
              fee: e.event.fee,
              sign: 1,
            });
          }

          if (swaps.length > 0) {
            await store.insert({
              table: "swaps",
              values: swaps,
              format: "JSONEachRow",
            });
          }
        },
      })
    );
}

void main();

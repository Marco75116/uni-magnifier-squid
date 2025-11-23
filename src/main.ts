import { createClient } from "@clickhouse/client";
import { evmDecoder, evmPortalSource } from "@subsquid/pipes/evm";
import { clickhouseTarget } from "@subsquid/pipes/targets/clickhouse";
import { portalSqliteCache } from "@subsquid/pipes/portal-cache/node";
import assert from "assert";

import * as PoolManager from "./abi/PoolManager";
import * as PositionDiscriptor from "./abi/PositionDiscriptor";
import * as PositionManager from "./abi/PositionManager";
import * as Permit2 from "./abi/Permit2";
import { initSchemaStatements } from "./schema";
import {
  getNetworkConfig,
  networksConfigs,
} from "./utils/constants/network.constant";
import { clickhouseClient } from "./utils/clients/clickhouse.client";
import {
  formatTimestampForClickHouse,
  getLogger,
  getPositionId,
} from "./utils/helpers/global.helper";

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

async function main() {
  const logger = getLogger(networkConfig.chainTag);
  logger.info(`Starting indexer for chain ID ${CHAIN_ID}`);

  await evmPortalSource({
    portal: {
      url: networkConfig.gatewaySqdUrl,
      finalized: true,
    },
    cache: portalSqliteCache({
      path: `./${networkConfig.chainTag}-portal.cache.sqlite`,
    }),
    logger,
  })
    .pipeComposite({
      PoolManager: evmDecoder({
        range: CONTRACTS.PoolManager.range,
        contracts: [CONTRACTS.PoolManager.address],
        events: {
          Initialize: PoolManager.events.Initialize,
          Swap: PoolManager.events.Swap,
          ModifyLiquidity: PoolManager.events.ModifyLiquidity,
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
          for (const statement of initSchemaStatements) {
            await store.command({
              query: statement,
            });
          }
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

          const positions: {
            chainId: number;
            block_number: number;
            timestamp: string;
            tx_hash: string;
            position_id: string;
            pool_id: string;
            sender: string;
            tick_lower: number;
            tick_upper: number;
            liquidity_delta: string;
            salt: string;
            sign: number;
          }[] = [];

          for (const e of data.PoolManager?.ModifyLiquidity || []) {
            positions.push({
              chainId: CHAIN_ID,
              block_number: e.block.number,
              timestamp: formatTimestampForClickHouse(e.timestamp),
              tx_hash: e.rawEvent.transactionHash,
              position_id: getPositionId(CHAIN_ID, e.event),
              pool_id: e.event.id,
              sender: e.event.sender,
              tick_lower: e.event.tickLower,
              tick_upper: e.event.tickUpper,
              liquidity_delta: e.event.liquidityDelta.toString(),
              salt: e.event.salt,
              sign: 1,
            });
          }

          if (positions.length > 0) {
            await store.insert({
              table: "modify_liquidity",
              values: positions,
              format: "JSONEachRow",
            });
          }
        },
      })
    );
}

void main();

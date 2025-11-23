export type PoolRecord = {
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
};

export type SwapRecord = {
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
};

export type ModifyLiquidityRecord = {
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
};

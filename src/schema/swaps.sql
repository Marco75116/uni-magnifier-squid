CREATE TABLE IF NOT EXISTS swaps (
    block_number UInt64,
    timestamp DateTime,
    tx_hash String,
    pool_id String,
    sender String,
    amount0 String,
    amount1 String,
    sqrt_price_x96 String,
    liquidity String,
    tick Int32,
    fee UInt32,
    sign Int8
) ENGINE = CollapsingMergeTree(sign)
ORDER BY (timestamp, block_number, tx_hash)

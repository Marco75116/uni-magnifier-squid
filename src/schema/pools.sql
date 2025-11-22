CREATE TABLE IF NOT EXISTS pools (
    block_number UInt64,
    timestamp DateTime,
    tx_hash String,
    pool_id String,
    currency0 String,
    currency1 String,
    fee UInt32,
    tick_spacing Int32,
    hooks String,
    sqrt_price_x96 String,
    tick Int32,
    sign Int8
) ENGINE = CollapsingMergeTree(sign)
ORDER BY (timestamp, block_number, tx_hash)

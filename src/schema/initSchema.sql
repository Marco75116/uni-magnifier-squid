-- Pool initialization events
CREATE TABLE IF NOT EXISTS pools (
    chainId UInt32,
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
ORDER BY (chainId, timestamp, block_number, tx_hash);

-- Pool swap events
CREATE TABLE IF NOT EXISTS swaps (
    chainId UInt32,
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
ORDER BY (chainId, timestamp, block_number, tx_hash);

-- Position modifications (liquidity add/remove)
CREATE TABLE IF NOT EXISTS modify_liquidity (
    chainId UInt32,
    block_number UInt64,
    timestamp DateTime,
    tx_hash String,
    position_id String,
    pool_id String,
    sender String,
    tick_lower Int32,
    tick_upper Int32,
    liquidity_delta String,
    salt String,
    sign Int8
) ENGINE = CollapsingMergeTree(sign)
ORDER BY (chainId, position_id, timestamp, block_number)

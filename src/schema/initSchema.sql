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
ORDER BY (chainId, position_id, timestamp, block_number);


CREATE TABLE IF NOT EXISTS positions (
    chainId UInt32,
    position_id String,
    pool_id String,
    sender String,
    tick_lower Int32,
    tick_upper Int32,
    salt String,
    liquidity Int256,
    creation_block_number UInt64,
    creation_timestamp DateTime
) ENGINE = SummingMergeTree(liquidity)
ORDER BY (chainId, position_id)
PRIMARY KEY (chainId, position_id);

CREATE MATERIALIZED VIEW IF NOT EXISTS positions_mv
TO positions
AS SELECT
    chainId,
    position_id,
    pool_id,
    sender,
    tick_lower,
    tick_upper,
    salt,
    toInt256(liquidity_delta) * sign AS liquidity,
    block_number AS creation_block_number,
    timestamp AS creation_timestamp
FROM modify_liquidity;

# Uniswap V4 Indexer

Index Uniswap V4 pool initializations and swaps on Ethereum Mainnet.

## Tables

### `pools`
Tracks Uniswap V4 pool creations:
- Pool ID and token pair
- Fee tier and tick spacing
- Initial price and tick
- Hook contract address

### `swaps`
Tracks all swaps in Uniswap V4 pools:
- Pool ID and sender
- Token amounts (amount0/amount1)
- Price and liquidity after swap
- Fee tier used

## Quick Start

```bash
# Install dependencies
npm install

# Start ClickHouse
docker-compose up -d

# Run the indexer
npm start
```

## Configuration

Edit `src/main.ts` to:
- Add more events (ModifyLiquidity, Donate, etc.)
- Customize data extraction
- Modify block ranges


import type { NetworkConfig } from "../network.constant";
import { normalizeAddress } from "../../helpers/global.helper";

export const baseNetworkConfig: NetworkConfig = {
  chainId: 8453,
  chainTag: "base",
  gatewaySqdUrl: "https://portal.sqd.dev/datasets/base-mainnet",
  contracts: {
    PoolManager: {
      address: normalizeAddress("0x498581ff718922c3f8e6a244956af099b2652b2b"),
      range: { from: 25_350_988 },
    },
    PositionDiscriptor: {
      address: normalizeAddress("0x25d093633990dc94bedeed76c8f3cdaa75f3e7d5"),
      range: { from: 25_350_992 },
    },
    PositionManager: {
      address: normalizeAddress("0x7c5f5a4bbd8fd63184577525326123b519429bdc"),
      range: { from: 25_350_993 },
    },
    Permit2: {
      address: normalizeAddress("0x000000000022D473030F116dDEE9F6B43aC78BA3"),
      range: { from: 25_350_988 },
    },
  },
};

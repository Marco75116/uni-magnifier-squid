import type { NetworkConfig } from "../network.constant";
import { normalizeAddress } from "../../helpers/global.helper";

export const unichainNetworkConfig: NetworkConfig = {
  chainId: 130,
  chainTag: "uni",
  gatewaySqdUrl: "https://portal.sqd.dev/datasets/unichain-mainnet",
  contracts: {
    PoolManager: {
      address: normalizeAddress("0x1f98400000000000000000000000000000000004"),
      range: { from: 0 },
    },
    PositionDiscriptor: {
      address: normalizeAddress("0x9fb28449a191cd8c03a1b7abfb0f5996ecf7f722"),
      range: { from: 6_819_675 },
    },
    PositionManager: {
      address: normalizeAddress("0x4529a01c7a0410167c5740c487a8de60232617bf"),
      range: { from: 6_819_679 },
    },
    Permit2: {
      address: normalizeAddress("0x000000000022D473030F116dDEE9F6B43aC78BA3"),
      range: { from: 0 },
    },
  },
};

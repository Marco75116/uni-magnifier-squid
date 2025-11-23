import type { NetworkConfig } from "../network.constant";
import { normalizeAddress } from "../../helpers/global.helper";

export const ethNetworkConfig: NetworkConfig = {
  chainId: 1,
  chainTag: "eth",
  gatewaySqdUrl: "https://portal.sqd.dev/datasets/ethereum-mainnet",
  contracts: {
    PoolManager: {
      address: normalizeAddress("0x000000000004444c5dc75cB358380D2e3dE08A90"),
      range: { from: 21_688_329 },
    },
    PositionDiscriptor: {
      address: normalizeAddress("0xd1428Ba554F4C8450b763a0B2040A4935c63f06C"),
      range: { from: 21_689_088 },
    },
    PositionManager: {
      address: normalizeAddress("0xbd216513d74c8cf14cf4747e6aaa6420ff64ee9e"),
      range: { from: 21_689_089 },
    },
    Permit2: {
      address: normalizeAddress("0x000000000022D473030F116dDEE9F6B43aC78BA3"),
      range: { from: 21_688_329 },
    },
  },
};

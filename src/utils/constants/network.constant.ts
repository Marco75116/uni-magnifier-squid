import { ethNetworkConfig } from "./networkconfigs/eth.networkconfig";
import { unichainNetworkConfig } from "./networkconfigs/unichain.networkconfig";
import { baseNetworkConfig } from "./networkconfigs/base.networkconfig";

export type ContractConfig = {
  address: string;
  range: { from: number };
};

export type ContractsConfig = {
  PoolManager: ContractConfig;
  PositionDiscriptor: ContractConfig;
  PositionManager: ContractConfig;
  Permit2: ContractConfig;
};

export type NetworkConfig = {
  gatewaySqdUrl: string;
  chainId: number;
  chainTag: string;
  contracts: ContractsConfig;
};

export const networksConfigs: Record<string, NetworkConfig> = {
  eth: ethNetworkConfig,
  uni: unichainNetworkConfig,
  base: baseNetworkConfig,
};

export const getNetworkConfig = (network: string): NetworkConfig => {
  const config = networksConfigs[network];
  if (!config) {
    throw new Error(`Network config not found for: ${network}`);
  }
  return config;
};

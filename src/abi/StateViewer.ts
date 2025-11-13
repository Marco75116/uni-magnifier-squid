import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const functions = {
    getFeeGrowthGlobals: viewFun("0x9ec538c8", "getFeeGrowthGlobals(bytes32)", {"poolId": p.bytes32}, {"feeGrowthGlobal0": p.uint256, "feeGrowthGlobal1": p.uint256}),
    getFeeGrowthInside: viewFun("0x53e9c1fb", "getFeeGrowthInside(bytes32,int24,int24)", {"poolId": p.bytes32, "tickLower": p.int24, "tickUpper": p.int24}, {"feeGrowthInside0X128": p.uint256, "feeGrowthInside1X128": p.uint256}),
    getLiquidity: viewFun("0xfa6793d5", "getLiquidity(bytes32)", {"poolId": p.bytes32}, p.uint128),
    'getPositionInfo(bytes32,bytes32)': viewFun("0x97fd7b42", "getPositionInfo(bytes32,bytes32)", {"poolId": p.bytes32, "positionId": p.bytes32}, {"liquidity": p.uint128, "feeGrowthInside0LastX128": p.uint256, "feeGrowthInside1LastX128": p.uint256}),
    'getPositionInfo(bytes32,address,int24,int24,bytes32)': viewFun("0xdacf1d2f", "getPositionInfo(bytes32,address,int24,int24,bytes32)", {"poolId": p.bytes32, "owner": p.address, "tickLower": p.int24, "tickUpper": p.int24, "salt": p.bytes32}, {"liquidity": p.uint128, "feeGrowthInside0LastX128": p.uint256, "feeGrowthInside1LastX128": p.uint256}),
    getPositionLiquidity: viewFun("0xf0928f29", "getPositionLiquidity(bytes32,bytes32)", {"poolId": p.bytes32, "positionId": p.bytes32}, p.uint128),
    getSlot0: viewFun("0xc815641c", "getSlot0(bytes32)", {"poolId": p.bytes32}, {"sqrtPriceX96": p.uint160, "tick": p.int24, "protocolFee": p.uint24, "lpFee": p.uint24}),
    getTickBitmap: viewFun("0x1c7ccb4c", "getTickBitmap(bytes32,int16)", {"poolId": p.bytes32, "tick": p.int16}, p.uint256),
    getTickFeeGrowthOutside: viewFun("0x8a2bb9e6", "getTickFeeGrowthOutside(bytes32,int24)", {"poolId": p.bytes32, "tick": p.int24}, {"feeGrowthOutside0X128": p.uint256, "feeGrowthOutside1X128": p.uint256}),
    getTickInfo: viewFun("0x7c40f1fe", "getTickInfo(bytes32,int24)", {"poolId": p.bytes32, "tick": p.int24}, {"liquidityGross": p.uint128, "liquidityNet": p.int128, "feeGrowthOutside0X128": p.uint256, "feeGrowthOutside1X128": p.uint256}),
    getTickLiquidity: viewFun("0xcaedab54", "getTickLiquidity(bytes32,int24)", {"poolId": p.bytes32, "tick": p.int24}, {"liquidityGross": p.uint128, "liquidityNet": p.int128}),
    poolManager: viewFun("0xdc4c90d3", "poolManager()", {}, p.address),
}

export class Contract extends ContractBase {

    getFeeGrowthGlobals(poolId: GetFeeGrowthGlobalsParams["poolId"]) {
        return this.eth_call(functions.getFeeGrowthGlobals, {poolId})
    }

    getFeeGrowthInside(poolId: GetFeeGrowthInsideParams["poolId"], tickLower: GetFeeGrowthInsideParams["tickLower"], tickUpper: GetFeeGrowthInsideParams["tickUpper"]) {
        return this.eth_call(functions.getFeeGrowthInside, {poolId, tickLower, tickUpper})
    }

    getLiquidity(poolId: GetLiquidityParams["poolId"]) {
        return this.eth_call(functions.getLiquidity, {poolId})
    }

    'getPositionInfo(bytes32,bytes32)'(poolId: GetPositionInfoParams_0["poolId"], positionId: GetPositionInfoParams_0["positionId"]) {
        return this.eth_call(functions['getPositionInfo(bytes32,bytes32)'], {poolId, positionId})
    }

    'getPositionInfo(bytes32,address,int24,int24,bytes32)'(poolId: GetPositionInfoParams_1["poolId"], owner: GetPositionInfoParams_1["owner"], tickLower: GetPositionInfoParams_1["tickLower"], tickUpper: GetPositionInfoParams_1["tickUpper"], salt: GetPositionInfoParams_1["salt"]) {
        return this.eth_call(functions['getPositionInfo(bytes32,address,int24,int24,bytes32)'], {poolId, owner, tickLower, tickUpper, salt})
    }

    getPositionLiquidity(poolId: GetPositionLiquidityParams["poolId"], positionId: GetPositionLiquidityParams["positionId"]) {
        return this.eth_call(functions.getPositionLiquidity, {poolId, positionId})
    }

    getSlot0(poolId: GetSlot0Params["poolId"]) {
        return this.eth_call(functions.getSlot0, {poolId})
    }

    getTickBitmap(poolId: GetTickBitmapParams["poolId"], tick: GetTickBitmapParams["tick"]) {
        return this.eth_call(functions.getTickBitmap, {poolId, tick})
    }

    getTickFeeGrowthOutside(poolId: GetTickFeeGrowthOutsideParams["poolId"], tick: GetTickFeeGrowthOutsideParams["tick"]) {
        return this.eth_call(functions.getTickFeeGrowthOutside, {poolId, tick})
    }

    getTickInfo(poolId: GetTickInfoParams["poolId"], tick: GetTickInfoParams["tick"]) {
        return this.eth_call(functions.getTickInfo, {poolId, tick})
    }

    getTickLiquidity(poolId: GetTickLiquidityParams["poolId"], tick: GetTickLiquidityParams["tick"]) {
        return this.eth_call(functions.getTickLiquidity, {poolId, tick})
    }

    poolManager() {
        return this.eth_call(functions.poolManager, {})
    }
}

/// Function types
export type GetFeeGrowthGlobalsParams = FunctionArguments<typeof functions.getFeeGrowthGlobals>
export type GetFeeGrowthGlobalsReturn = FunctionReturn<typeof functions.getFeeGrowthGlobals>

export type GetFeeGrowthInsideParams = FunctionArguments<typeof functions.getFeeGrowthInside>
export type GetFeeGrowthInsideReturn = FunctionReturn<typeof functions.getFeeGrowthInside>

export type GetLiquidityParams = FunctionArguments<typeof functions.getLiquidity>
export type GetLiquidityReturn = FunctionReturn<typeof functions.getLiquidity>

export type GetPositionInfoParams_0 = FunctionArguments<typeof functions['getPositionInfo(bytes32,bytes32)']>
export type GetPositionInfoReturn_0 = FunctionReturn<typeof functions['getPositionInfo(bytes32,bytes32)']>

export type GetPositionInfoParams_1 = FunctionArguments<typeof functions['getPositionInfo(bytes32,address,int24,int24,bytes32)']>
export type GetPositionInfoReturn_1 = FunctionReturn<typeof functions['getPositionInfo(bytes32,address,int24,int24,bytes32)']>

export type GetPositionLiquidityParams = FunctionArguments<typeof functions.getPositionLiquidity>
export type GetPositionLiquidityReturn = FunctionReturn<typeof functions.getPositionLiquidity>

export type GetSlot0Params = FunctionArguments<typeof functions.getSlot0>
export type GetSlot0Return = FunctionReturn<typeof functions.getSlot0>

export type GetTickBitmapParams = FunctionArguments<typeof functions.getTickBitmap>
export type GetTickBitmapReturn = FunctionReturn<typeof functions.getTickBitmap>

export type GetTickFeeGrowthOutsideParams = FunctionArguments<typeof functions.getTickFeeGrowthOutside>
export type GetTickFeeGrowthOutsideReturn = FunctionReturn<typeof functions.getTickFeeGrowthOutside>

export type GetTickInfoParams = FunctionArguments<typeof functions.getTickInfo>
export type GetTickInfoReturn = FunctionReturn<typeof functions.getTickInfo>

export type GetTickLiquidityParams = FunctionArguments<typeof functions.getTickLiquidity>
export type GetTickLiquidityReturn = FunctionReturn<typeof functions.getTickLiquidity>

export type PoolManagerParams = FunctionArguments<typeof functions.poolManager>
export type PoolManagerReturn = FunctionReturn<typeof functions.poolManager>


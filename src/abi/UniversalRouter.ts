import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const functions = {
    V3_POSITION_MANAGER: viewFun("0x817122dc", "V3_POSITION_MANAGER()", {}, p.address),
    V4_POSITION_MANAGER: viewFun("0xd0c9f6cb", "V4_POSITION_MANAGER()", {}, p.address),
    'execute(bytes,bytes[])': fun("0x24856bc3", "execute(bytes,bytes[])", {"commands": p.bytes, "inputs": p.array(p.bytes)}, ),
    'execute(bytes,bytes[],uint256)': fun("0x3593564c", "execute(bytes,bytes[],uint256)", {"commands": p.bytes, "inputs": p.array(p.bytes), "deadline": p.uint256}, ),
    msgSender: viewFun("0xd737d0c7", "msgSender()", {}, p.address),
    poolManager: viewFun("0xdc4c90d3", "poolManager()", {}, p.address),
    uniswapV3SwapCallback: fun("0xfa461e33", "uniswapV3SwapCallback(int256,int256,bytes)", {"amount0Delta": p.int256, "amount1Delta": p.int256, "data": p.bytes}, ),
    unlockCallback: fun("0x91dd7346", "unlockCallback(bytes)", {"data": p.bytes}, p.bytes),
}

export class Contract extends ContractBase {

    V3_POSITION_MANAGER() {
        return this.eth_call(functions.V3_POSITION_MANAGER, {})
    }

    V4_POSITION_MANAGER() {
        return this.eth_call(functions.V4_POSITION_MANAGER, {})
    }

    msgSender() {
        return this.eth_call(functions.msgSender, {})
    }

    poolManager() {
        return this.eth_call(functions.poolManager, {})
    }
}

/// Function types
export type V3_POSITION_MANAGERParams = FunctionArguments<typeof functions.V3_POSITION_MANAGER>
export type V3_POSITION_MANAGERReturn = FunctionReturn<typeof functions.V3_POSITION_MANAGER>

export type V4_POSITION_MANAGERParams = FunctionArguments<typeof functions.V4_POSITION_MANAGER>
export type V4_POSITION_MANAGERReturn = FunctionReturn<typeof functions.V4_POSITION_MANAGER>

export type ExecuteParams_0 = FunctionArguments<typeof functions['execute(bytes,bytes[])']>
export type ExecuteReturn_0 = FunctionReturn<typeof functions['execute(bytes,bytes[])']>

export type ExecuteParams_1 = FunctionArguments<typeof functions['execute(bytes,bytes[],uint256)']>
export type ExecuteReturn_1 = FunctionReturn<typeof functions['execute(bytes,bytes[],uint256)']>

export type MsgSenderParams = FunctionArguments<typeof functions.msgSender>
export type MsgSenderReturn = FunctionReturn<typeof functions.msgSender>

export type PoolManagerParams = FunctionArguments<typeof functions.poolManager>
export type PoolManagerReturn = FunctionReturn<typeof functions.poolManager>

export type UniswapV3SwapCallbackParams = FunctionArguments<typeof functions.uniswapV3SwapCallback>
export type UniswapV3SwapCallbackReturn = FunctionReturn<typeof functions.uniswapV3SwapCallback>

export type UnlockCallbackParams = FunctionArguments<typeof functions.unlockCallback>
export type UnlockCallbackReturn = FunctionReturn<typeof functions.unlockCallback>


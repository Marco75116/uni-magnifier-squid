import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const functions = {
    _quoteExactInput: fun("0x6a36a38c", "_quoteExactInput((address,(address,uint24,int24,address,bytes)[],uint128))", {"params": p.struct({"exactCurrency": p.address, "path": p.array(p.struct({"intermediateCurrency": p.address, "fee": p.uint24, "tickSpacing": p.int24, "hooks": p.address, "hookData": p.bytes})), "exactAmount": p.uint128})}, p.bytes),
    _quoteExactInputSingle: fun("0xeebe0c6a", "_quoteExactInputSingle(((address,address,uint24,int24,address),bool,uint128,bytes))", {"params": p.struct({"poolKey": p.struct({"currency0": p.address, "currency1": p.address, "fee": p.uint24, "tickSpacing": p.int24, "hooks": p.address}), "zeroForOne": p.bool, "exactAmount": p.uint128, "hookData": p.bytes})}, p.bytes),
    _quoteExactOutput: fun("0xaa2f1501", "_quoteExactOutput((address,(address,uint24,int24,address,bytes)[],uint128))", {"params": p.struct({"exactCurrency": p.address, "path": p.array(p.struct({"intermediateCurrency": p.address, "fee": p.uint24, "tickSpacing": p.int24, "hooks": p.address, "hookData": p.bytes})), "exactAmount": p.uint128})}, p.bytes),
    _quoteExactOutputSingle: fun("0x595323f5", "_quoteExactOutputSingle(((address,address,uint24,int24,address),bool,uint128,bytes))", {"params": p.struct({"poolKey": p.struct({"currency0": p.address, "currency1": p.address, "fee": p.uint24, "tickSpacing": p.int24, "hooks": p.address}), "zeroForOne": p.bool, "exactAmount": p.uint128, "hookData": p.bytes})}, p.bytes),
    poolManager: viewFun("0xdc4c90d3", "poolManager()", {}, p.address),
    quoteExactInput: fun("0xca253dc9", "quoteExactInput((address,(address,uint24,int24,address,bytes)[],uint128))", {"params": p.struct({"exactCurrency": p.address, "path": p.array(p.struct({"intermediateCurrency": p.address, "fee": p.uint24, "tickSpacing": p.int24, "hooks": p.address, "hookData": p.bytes})), "exactAmount": p.uint128})}, {"amountOut": p.uint256, "gasEstimate": p.uint256}),
    quoteExactInputSingle: fun("0xaa9d21cb", "quoteExactInputSingle(((address,address,uint24,int24,address),bool,uint128,bytes))", {"params": p.struct({"poolKey": p.struct({"currency0": p.address, "currency1": p.address, "fee": p.uint24, "tickSpacing": p.int24, "hooks": p.address}), "zeroForOne": p.bool, "exactAmount": p.uint128, "hookData": p.bytes})}, {"amountOut": p.uint256, "gasEstimate": p.uint256}),
    quoteExactOutput: fun("0x147d2af9", "quoteExactOutput((address,(address,uint24,int24,address,bytes)[],uint128))", {"params": p.struct({"exactCurrency": p.address, "path": p.array(p.struct({"intermediateCurrency": p.address, "fee": p.uint24, "tickSpacing": p.int24, "hooks": p.address, "hookData": p.bytes})), "exactAmount": p.uint128})}, {"amountIn": p.uint256, "gasEstimate": p.uint256}),
    quoteExactOutputSingle: fun("0x58733073", "quoteExactOutputSingle(((address,address,uint24,int24,address),bool,uint128,bytes))", {"params": p.struct({"poolKey": p.struct({"currency0": p.address, "currency1": p.address, "fee": p.uint24, "tickSpacing": p.int24, "hooks": p.address}), "zeroForOne": p.bool, "exactAmount": p.uint128, "hookData": p.bytes})}, {"amountIn": p.uint256, "gasEstimate": p.uint256}),
    unlockCallback: fun("0x91dd7346", "unlockCallback(bytes)", {"data": p.bytes}, p.bytes),
}

export class Contract extends ContractBase {

    poolManager() {
        return this.eth_call(functions.poolManager, {})
    }
}

/// Function types
export type _quoteExactInputParams = FunctionArguments<typeof functions._quoteExactInput>
export type _quoteExactInputReturn = FunctionReturn<typeof functions._quoteExactInput>

export type _quoteExactInputSingleParams = FunctionArguments<typeof functions._quoteExactInputSingle>
export type _quoteExactInputSingleReturn = FunctionReturn<typeof functions._quoteExactInputSingle>

export type _quoteExactOutputParams = FunctionArguments<typeof functions._quoteExactOutput>
export type _quoteExactOutputReturn = FunctionReturn<typeof functions._quoteExactOutput>

export type _quoteExactOutputSingleParams = FunctionArguments<typeof functions._quoteExactOutputSingle>
export type _quoteExactOutputSingleReturn = FunctionReturn<typeof functions._quoteExactOutputSingle>

export type PoolManagerParams = FunctionArguments<typeof functions.poolManager>
export type PoolManagerReturn = FunctionReturn<typeof functions.poolManager>

export type QuoteExactInputParams = FunctionArguments<typeof functions.quoteExactInput>
export type QuoteExactInputReturn = FunctionReturn<typeof functions.quoteExactInput>

export type QuoteExactInputSingleParams = FunctionArguments<typeof functions.quoteExactInputSingle>
export type QuoteExactInputSingleReturn = FunctionReturn<typeof functions.quoteExactInputSingle>

export type QuoteExactOutputParams = FunctionArguments<typeof functions.quoteExactOutput>
export type QuoteExactOutputReturn = FunctionReturn<typeof functions.quoteExactOutput>

export type QuoteExactOutputSingleParams = FunctionArguments<typeof functions.quoteExactOutputSingle>
export type QuoteExactOutputSingleReturn = FunctionReturn<typeof functions.quoteExactOutputSingle>

export type UnlockCallbackParams = FunctionArguments<typeof functions.unlockCallback>
export type UnlockCallbackReturn = FunctionReturn<typeof functions.unlockCallback>


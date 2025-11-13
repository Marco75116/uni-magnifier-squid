import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Approval: event("0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", "Approval(address,address,uint256)", {"owner": indexed(p.address), "spender": indexed(p.address), "id": indexed(p.uint256)}),
    ApprovalForAll: event("0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31", "ApprovalForAll(address,address,bool)", {"owner": indexed(p.address), "operator": indexed(p.address), "approved": p.bool}),
    Subscription: event("0x9709492381f90bdc5938bb4e3b8e35b7e0eac8af058619e27191c5a40ce79fa9", "Subscription(uint256,address)", {"tokenId": indexed(p.uint256), "subscriber": indexed(p.address)}),
    Transfer: event("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "Transfer(address,address,uint256)", {"from": indexed(p.address), "to": indexed(p.address), "id": indexed(p.uint256)}),
    Unsubscription: event("0xa0ebb1de82db929a9153472f37d3a66dbede4436258311ad0f52a35a2c91d150", "Unsubscription(uint256,address)", {"tokenId": indexed(p.uint256), "subscriber": indexed(p.address)}),
}

export const functions = {
    DOMAIN_SEPARATOR: viewFun("0x3644e515", "DOMAIN_SEPARATOR()", {}, p.bytes32),
    WETH9: viewFun("0x4aa4a4fc", "WETH9()", {}, p.address),
    approve: fun("0x095ea7b3", "approve(address,uint256)", {"spender": p.address, "id": p.uint256}, ),
    balanceOf: viewFun("0x70a08231", "balanceOf(address)", {"owner": p.address}, p.uint256),
    getApproved: viewFun("0x081812fc", "getApproved(uint256)", {"_0": p.uint256}, p.address),
    getPoolAndPositionInfo: viewFun("0x7ba03aad", "getPoolAndPositionInfo(uint256)", {"tokenId": p.uint256}, {"poolKey": p.struct({"currency0": p.address, "currency1": p.address, "fee": p.uint24, "tickSpacing": p.int24, "hooks": p.address}), "info": p.uint256}),
    getPositionLiquidity: viewFun("0x1efeed33", "getPositionLiquidity(uint256)", {"tokenId": p.uint256}, p.uint128),
    initializePool: fun("0xf7020405", "initializePool((address,address,uint24,int24,address),uint160)", {"key": p.struct({"currency0": p.address, "currency1": p.address, "fee": p.uint24, "tickSpacing": p.int24, "hooks": p.address}), "sqrtPriceX96": p.uint160}, p.int24),
    isApprovedForAll: viewFun("0xe985e9c5", "isApprovedForAll(address,address)", {"_0": p.address, "_1": p.address}, p.bool),
    modifyLiquidities: fun("0xdd46508f", "modifyLiquidities(bytes,uint256)", {"unlockData": p.bytes, "deadline": p.uint256}, ),
    modifyLiquiditiesWithoutUnlock: fun("0x4afe393c", "modifyLiquiditiesWithoutUnlock(bytes,bytes[])", {"actions": p.bytes, "params": p.array(p.bytes)}, ),
    msgSender: viewFun("0xd737d0c7", "msgSender()", {}, p.address),
    multicall: fun("0xac9650d8", "multicall(bytes[])", {"data": p.array(p.bytes)}, p.array(p.bytes)),
    name: viewFun("0x06fdde03", "name()", {}, p.string),
    nextTokenId: viewFun("0x75794a3c", "nextTokenId()", {}, p.uint256),
    nonces: viewFun("0x502e1a16", "nonces(address,uint256)", {"owner": p.address, "word": p.uint256}, p.uint256),
    ownerOf: viewFun("0x6352211e", "ownerOf(uint256)", {"id": p.uint256}, p.address),
    'permit(address,uint256,uint256,uint256,bytes)': fun("0x0f5730f1", "permit(address,uint256,uint256,uint256,bytes)", {"spender": p.address, "tokenId": p.uint256, "deadline": p.uint256, "nonce": p.uint256, "signature": p.bytes}, ),
    'permit(address,((address,uint160,uint48,uint48),address,uint256),bytes)': fun("0x2b67b570", "permit(address,((address,uint160,uint48,uint48),address,uint256),bytes)", {"owner": p.address, "permitSingle": p.struct({"details": p.struct({"token": p.address, "amount": p.uint160, "expiration": p.uint48, "nonce": p.uint48}), "spender": p.address, "sigDeadline": p.uint256}), "signature": p.bytes}, p.bytes),
    permit2: viewFun("0x12261ee7", "permit2()", {}, p.address),
    permitBatch: fun("0x002a3e3a", "permitBatch(address,((address,uint160,uint48,uint48)[],address,uint256),bytes)", {"owner": p.address, "_permitBatch": p.struct({"details": p.array(p.struct({"token": p.address, "amount": p.uint160, "expiration": p.uint48, "nonce": p.uint48})), "spender": p.address, "sigDeadline": p.uint256}), "signature": p.bytes}, p.bytes),
    permitForAll: fun("0x3aea60f0", "permitForAll(address,address,bool,uint256,uint256,bytes)", {"owner": p.address, "operator": p.address, "approved": p.bool, "deadline": p.uint256, "nonce": p.uint256, "signature": p.bytes}, ),
    poolKeys: viewFun("0x86b6be7d", "poolKeys(bytes25)", {"poolId": p.bytes25}, {"currency0": p.address, "currency1": p.address, "fee": p.uint24, "tickSpacing": p.int24, "hooks": p.address}),
    poolManager: viewFun("0xdc4c90d3", "poolManager()", {}, p.address),
    positionInfo: viewFun("0x89097a6a", "positionInfo(uint256)", {"tokenId": p.uint256}, p.uint256),
    revokeNonce: fun("0x05c1ee20", "revokeNonce(uint256)", {"nonce": p.uint256}, ),
    'safeTransferFrom(address,address,uint256)': fun("0x42842e0e", "safeTransferFrom(address,address,uint256)", {"from": p.address, "to": p.address, "id": p.uint256}, ),
    'safeTransferFrom(address,address,uint256,bytes)': fun("0xb88d4fde", "safeTransferFrom(address,address,uint256,bytes)", {"from": p.address, "to": p.address, "id": p.uint256, "data": p.bytes}, ),
    setApprovalForAll: fun("0xa22cb465", "setApprovalForAll(address,bool)", {"operator": p.address, "approved": p.bool}, ),
    subscribe: fun("0x2b9261de", "subscribe(uint256,address,bytes)", {"tokenId": p.uint256, "newSubscriber": p.address, "data": p.bytes}, ),
    subscriber: viewFun("0x16a24131", "subscriber(uint256)", {"tokenId": p.uint256}, p.address),
    supportsInterface: viewFun("0x01ffc9a7", "supportsInterface(bytes4)", {"interfaceId": p.bytes4}, p.bool),
    symbol: viewFun("0x95d89b41", "symbol()", {}, p.string),
    tokenDescriptor: viewFun("0x5a9d7a68", "tokenDescriptor()", {}, p.address),
    tokenURI: viewFun("0xc87b56dd", "tokenURI(uint256)", {"tokenId": p.uint256}, p.string),
    transferFrom: fun("0x23b872dd", "transferFrom(address,address,uint256)", {"from": p.address, "to": p.address, "id": p.uint256}, ),
    unlockCallback: fun("0x91dd7346", "unlockCallback(bytes)", {"data": p.bytes}, p.bytes),
    unsubscribe: fun("0xad0b27fb", "unsubscribe(uint256)", {"tokenId": p.uint256}, ),
    unsubscribeGasLimit: viewFun("0x4767565f", "unsubscribeGasLimit()", {}, p.uint256),
}

export class Contract extends ContractBase {

    DOMAIN_SEPARATOR() {
        return this.eth_call(functions.DOMAIN_SEPARATOR, {})
    }

    WETH9() {
        return this.eth_call(functions.WETH9, {})
    }

    balanceOf(owner: BalanceOfParams["owner"]) {
        return this.eth_call(functions.balanceOf, {owner})
    }

    getApproved(_0: GetApprovedParams["_0"]) {
        return this.eth_call(functions.getApproved, {_0})
    }

    getPoolAndPositionInfo(tokenId: GetPoolAndPositionInfoParams["tokenId"]) {
        return this.eth_call(functions.getPoolAndPositionInfo, {tokenId})
    }

    getPositionLiquidity(tokenId: GetPositionLiquidityParams["tokenId"]) {
        return this.eth_call(functions.getPositionLiquidity, {tokenId})
    }

    isApprovedForAll(_0: IsApprovedForAllParams["_0"], _1: IsApprovedForAllParams["_1"]) {
        return this.eth_call(functions.isApprovedForAll, {_0, _1})
    }

    msgSender() {
        return this.eth_call(functions.msgSender, {})
    }

    name() {
        return this.eth_call(functions.name, {})
    }

    nextTokenId() {
        return this.eth_call(functions.nextTokenId, {})
    }

    nonces(owner: NoncesParams["owner"], word: NoncesParams["word"]) {
        return this.eth_call(functions.nonces, {owner, word})
    }

    ownerOf(id: OwnerOfParams["id"]) {
        return this.eth_call(functions.ownerOf, {id})
    }

    permit2() {
        return this.eth_call(functions.permit2, {})
    }

    poolKeys(poolId: PoolKeysParams["poolId"]) {
        return this.eth_call(functions.poolKeys, {poolId})
    }

    poolManager() {
        return this.eth_call(functions.poolManager, {})
    }

    positionInfo(tokenId: PositionInfoParams["tokenId"]) {
        return this.eth_call(functions.positionInfo, {tokenId})
    }

    subscriber(tokenId: SubscriberParams["tokenId"]) {
        return this.eth_call(functions.subscriber, {tokenId})
    }

    supportsInterface(interfaceId: SupportsInterfaceParams["interfaceId"]) {
        return this.eth_call(functions.supportsInterface, {interfaceId})
    }

    symbol() {
        return this.eth_call(functions.symbol, {})
    }

    tokenDescriptor() {
        return this.eth_call(functions.tokenDescriptor, {})
    }

    tokenURI(tokenId: TokenURIParams["tokenId"]) {
        return this.eth_call(functions.tokenURI, {tokenId})
    }

    unsubscribeGasLimit() {
        return this.eth_call(functions.unsubscribeGasLimit, {})
    }
}

/// Event types
export type ApprovalEventArgs = EParams<typeof events.Approval>
export type ApprovalForAllEventArgs = EParams<typeof events.ApprovalForAll>
export type SubscriptionEventArgs = EParams<typeof events.Subscription>
export type TransferEventArgs = EParams<typeof events.Transfer>
export type UnsubscriptionEventArgs = EParams<typeof events.Unsubscription>

/// Function types
export type DOMAIN_SEPARATORParams = FunctionArguments<typeof functions.DOMAIN_SEPARATOR>
export type DOMAIN_SEPARATORReturn = FunctionReturn<typeof functions.DOMAIN_SEPARATOR>

export type WETH9Params = FunctionArguments<typeof functions.WETH9>
export type WETH9Return = FunctionReturn<typeof functions.WETH9>

export type ApproveParams = FunctionArguments<typeof functions.approve>
export type ApproveReturn = FunctionReturn<typeof functions.approve>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type GetApprovedParams = FunctionArguments<typeof functions.getApproved>
export type GetApprovedReturn = FunctionReturn<typeof functions.getApproved>

export type GetPoolAndPositionInfoParams = FunctionArguments<typeof functions.getPoolAndPositionInfo>
export type GetPoolAndPositionInfoReturn = FunctionReturn<typeof functions.getPoolAndPositionInfo>

export type GetPositionLiquidityParams = FunctionArguments<typeof functions.getPositionLiquidity>
export type GetPositionLiquidityReturn = FunctionReturn<typeof functions.getPositionLiquidity>

export type InitializePoolParams = FunctionArguments<typeof functions.initializePool>
export type InitializePoolReturn = FunctionReturn<typeof functions.initializePool>

export type IsApprovedForAllParams = FunctionArguments<typeof functions.isApprovedForAll>
export type IsApprovedForAllReturn = FunctionReturn<typeof functions.isApprovedForAll>

export type ModifyLiquiditiesParams = FunctionArguments<typeof functions.modifyLiquidities>
export type ModifyLiquiditiesReturn = FunctionReturn<typeof functions.modifyLiquidities>

export type ModifyLiquiditiesWithoutUnlockParams = FunctionArguments<typeof functions.modifyLiquiditiesWithoutUnlock>
export type ModifyLiquiditiesWithoutUnlockReturn = FunctionReturn<typeof functions.modifyLiquiditiesWithoutUnlock>

export type MsgSenderParams = FunctionArguments<typeof functions.msgSender>
export type MsgSenderReturn = FunctionReturn<typeof functions.msgSender>

export type MulticallParams = FunctionArguments<typeof functions.multicall>
export type MulticallReturn = FunctionReturn<typeof functions.multicall>

export type NameParams = FunctionArguments<typeof functions.name>
export type NameReturn = FunctionReturn<typeof functions.name>

export type NextTokenIdParams = FunctionArguments<typeof functions.nextTokenId>
export type NextTokenIdReturn = FunctionReturn<typeof functions.nextTokenId>

export type NoncesParams = FunctionArguments<typeof functions.nonces>
export type NoncesReturn = FunctionReturn<typeof functions.nonces>

export type OwnerOfParams = FunctionArguments<typeof functions.ownerOf>
export type OwnerOfReturn = FunctionReturn<typeof functions.ownerOf>

export type PermitParams_0 = FunctionArguments<typeof functions['permit(address,uint256,uint256,uint256,bytes)']>
export type PermitReturn_0 = FunctionReturn<typeof functions['permit(address,uint256,uint256,uint256,bytes)']>

export type PermitParams_1 = FunctionArguments<typeof functions['permit(address,((address,uint160,uint48,uint48),address,uint256),bytes)']>
export type PermitReturn_1 = FunctionReturn<typeof functions['permit(address,((address,uint160,uint48,uint48),address,uint256),bytes)']>

export type Permit2Params = FunctionArguments<typeof functions.permit2>
export type Permit2Return = FunctionReturn<typeof functions.permit2>

export type PermitBatchParams = FunctionArguments<typeof functions.permitBatch>
export type PermitBatchReturn = FunctionReturn<typeof functions.permitBatch>

export type PermitForAllParams = FunctionArguments<typeof functions.permitForAll>
export type PermitForAllReturn = FunctionReturn<typeof functions.permitForAll>

export type PoolKeysParams = FunctionArguments<typeof functions.poolKeys>
export type PoolKeysReturn = FunctionReturn<typeof functions.poolKeys>

export type PoolManagerParams = FunctionArguments<typeof functions.poolManager>
export type PoolManagerReturn = FunctionReturn<typeof functions.poolManager>

export type PositionInfoParams = FunctionArguments<typeof functions.positionInfo>
export type PositionInfoReturn = FunctionReturn<typeof functions.positionInfo>

export type RevokeNonceParams = FunctionArguments<typeof functions.revokeNonce>
export type RevokeNonceReturn = FunctionReturn<typeof functions.revokeNonce>

export type SafeTransferFromParams_0 = FunctionArguments<typeof functions['safeTransferFrom(address,address,uint256)']>
export type SafeTransferFromReturn_0 = FunctionReturn<typeof functions['safeTransferFrom(address,address,uint256)']>

export type SafeTransferFromParams_1 = FunctionArguments<typeof functions['safeTransferFrom(address,address,uint256,bytes)']>
export type SafeTransferFromReturn_1 = FunctionReturn<typeof functions['safeTransferFrom(address,address,uint256,bytes)']>

export type SetApprovalForAllParams = FunctionArguments<typeof functions.setApprovalForAll>
export type SetApprovalForAllReturn = FunctionReturn<typeof functions.setApprovalForAll>

export type SubscribeParams = FunctionArguments<typeof functions.subscribe>
export type SubscribeReturn = FunctionReturn<typeof functions.subscribe>

export type SubscriberParams = FunctionArguments<typeof functions.subscriber>
export type SubscriberReturn = FunctionReturn<typeof functions.subscriber>

export type SupportsInterfaceParams = FunctionArguments<typeof functions.supportsInterface>
export type SupportsInterfaceReturn = FunctionReturn<typeof functions.supportsInterface>

export type SymbolParams = FunctionArguments<typeof functions.symbol>
export type SymbolReturn = FunctionReturn<typeof functions.symbol>

export type TokenDescriptorParams = FunctionArguments<typeof functions.tokenDescriptor>
export type TokenDescriptorReturn = FunctionReturn<typeof functions.tokenDescriptor>

export type TokenURIParams = FunctionArguments<typeof functions.tokenURI>
export type TokenURIReturn = FunctionReturn<typeof functions.tokenURI>

export type TransferFromParams = FunctionArguments<typeof functions.transferFrom>
export type TransferFromReturn = FunctionReturn<typeof functions.transferFrom>

export type UnlockCallbackParams = FunctionArguments<typeof functions.unlockCallback>
export type UnlockCallbackReturn = FunctionReturn<typeof functions.unlockCallback>

export type UnsubscribeParams = FunctionArguments<typeof functions.unsubscribe>
export type UnsubscribeReturn = FunctionReturn<typeof functions.unsubscribe>

export type UnsubscribeGasLimitParams = FunctionArguments<typeof functions.unsubscribeGasLimit>
export type UnsubscribeGasLimitReturn = FunctionReturn<typeof functions.unsubscribeGasLimit>


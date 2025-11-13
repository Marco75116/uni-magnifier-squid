import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Approval: event("0xda9fa7c1b00402c17d0161b249b1ab8bbec047c5a52207b9c112deffd817036b", "Approval(address,address,address,uint160,uint48)", {"owner": indexed(p.address), "token": indexed(p.address), "spender": indexed(p.address), "amount": p.uint160, "expiration": p.uint48}),
    Lockdown: event("0x89b1add15eff56b3dfe299ad94e01f2b52fbcb80ae1a3baea6ae8c04cb2b98a4", "Lockdown(address,address,address)", {"owner": indexed(p.address), "token": p.address, "spender": p.address}),
    NonceInvalidation: event("0x55eb90d810e1700b35a8e7e25395ff7f2b2259abd7415ca2284dfb1c246418f3", "NonceInvalidation(address,address,address,uint48,uint48)", {"owner": indexed(p.address), "token": indexed(p.address), "spender": indexed(p.address), "newNonce": p.uint48, "oldNonce": p.uint48}),
    Permit: event("0xc6a377bfc4eb120024a8ac08eef205be16b817020812c73223e81d1bdb9708ec", "Permit(address,address,address,uint160,uint48,uint48)", {"owner": indexed(p.address), "token": indexed(p.address), "spender": indexed(p.address), "amount": p.uint160, "expiration": p.uint48, "nonce": p.uint48}),
    UnorderedNonceInvalidation: event("0x3704902f963766a4e561bbaab6e6cdc1b1dd12f6e9e99648da8843b3f46b918d", "UnorderedNonceInvalidation(address,uint256,uint256)", {"owner": indexed(p.address), "word": p.uint256, "mask": p.uint256}),
}

export const functions = {
    DOMAIN_SEPARATOR: viewFun("0x3644e515", "DOMAIN_SEPARATOR()", {}, p.bytes32),
    allowance: viewFun("0x927da105", "allowance(address,address,address)", {"_0": p.address, "_1": p.address, "_2": p.address}, {"amount": p.uint160, "expiration": p.uint48, "nonce": p.uint48}),
    approve: fun("0x87517c45", "approve(address,address,uint160,uint48)", {"token": p.address, "spender": p.address, "amount": p.uint160, "expiration": p.uint48}, ),
    invalidateNonces: fun("0x65d9723c", "invalidateNonces(address,address,uint48)", {"token": p.address, "spender": p.address, "newNonce": p.uint48}, ),
    invalidateUnorderedNonces: fun("0x3ff9dcb1", "invalidateUnorderedNonces(uint256,uint256)", {"wordPos": p.uint256, "mask": p.uint256}, ),
    lockdown: fun("0xcc53287f", "lockdown((address,address)[])", {"approvals": p.array(p.struct({"token": p.address, "spender": p.address}))}, ),
    nonceBitmap: viewFun("0x4fe02b44", "nonceBitmap(address,uint256)", {"_0": p.address, "_1": p.uint256}, p.uint256),
    'permit(address,((address,uint160,uint48,uint48)[],address,uint256),bytes)': fun("0x2a2d80d1", "permit(address,((address,uint160,uint48,uint48)[],address,uint256),bytes)", {"owner": p.address, "permitBatch": p.struct({"details": p.array(p.struct({"token": p.address, "amount": p.uint160, "expiration": p.uint48, "nonce": p.uint48})), "spender": p.address, "sigDeadline": p.uint256}), "signature": p.bytes}, ),
    'permit(address,((address,uint160,uint48,uint48),address,uint256),bytes)': fun("0x2b67b570", "permit(address,((address,uint160,uint48,uint48),address,uint256),bytes)", {"owner": p.address, "permitSingle": p.struct({"details": p.struct({"token": p.address, "amount": p.uint160, "expiration": p.uint48, "nonce": p.uint48}), "spender": p.address, "sigDeadline": p.uint256}), "signature": p.bytes}, ),
    'permitTransferFrom(((address,uint256),uint256,uint256),(address,uint256),address,bytes)': fun("0x30f28b7a", "permitTransferFrom(((address,uint256),uint256,uint256),(address,uint256),address,bytes)", {"permit": p.struct({"permitted": p.struct({"token": p.address, "amount": p.uint256}), "nonce": p.uint256, "deadline": p.uint256}), "transferDetails": p.struct({"to": p.address, "requestedAmount": p.uint256}), "owner": p.address, "signature": p.bytes}, ),
    'permitTransferFrom(((address,uint256)[],uint256,uint256),(address,uint256)[],address,bytes)': fun("0xedd9444b", "permitTransferFrom(((address,uint256)[],uint256,uint256),(address,uint256)[],address,bytes)", {"permit": p.struct({"permitted": p.array(p.struct({"token": p.address, "amount": p.uint256})), "nonce": p.uint256, "deadline": p.uint256}), "transferDetails": p.array(p.struct({"to": p.address, "requestedAmount": p.uint256})), "owner": p.address, "signature": p.bytes}, ),
    'permitWitnessTransferFrom(((address,uint256),uint256,uint256),(address,uint256),address,bytes32,string,bytes)': fun("0x137c29fe", "permitWitnessTransferFrom(((address,uint256),uint256,uint256),(address,uint256),address,bytes32,string,bytes)", {"permit": p.struct({"permitted": p.struct({"token": p.address, "amount": p.uint256}), "nonce": p.uint256, "deadline": p.uint256}), "transferDetails": p.struct({"to": p.address, "requestedAmount": p.uint256}), "owner": p.address, "witness": p.bytes32, "witnessTypeString": p.string, "signature": p.bytes}, ),
    'permitWitnessTransferFrom(((address,uint256)[],uint256,uint256),(address,uint256)[],address,bytes32,string,bytes)': fun("0xfe8ec1a7", "permitWitnessTransferFrom(((address,uint256)[],uint256,uint256),(address,uint256)[],address,bytes32,string,bytes)", {"permit": p.struct({"permitted": p.array(p.struct({"token": p.address, "amount": p.uint256})), "nonce": p.uint256, "deadline": p.uint256}), "transferDetails": p.array(p.struct({"to": p.address, "requestedAmount": p.uint256})), "owner": p.address, "witness": p.bytes32, "witnessTypeString": p.string, "signature": p.bytes}, ),
    'transferFrom((address,address,uint160,address)[])': fun("0x0d58b1db", "transferFrom((address,address,uint160,address)[])", {"transferDetails": p.array(p.struct({"from": p.address, "to": p.address, "amount": p.uint160, "token": p.address}))}, ),
    'transferFrom(address,address,uint160,address)': fun("0x36c78516", "transferFrom(address,address,uint160,address)", {"from": p.address, "to": p.address, "amount": p.uint160, "token": p.address}, ),
}

export class Contract extends ContractBase {

    DOMAIN_SEPARATOR() {
        return this.eth_call(functions.DOMAIN_SEPARATOR, {})
    }

    allowance(_0: AllowanceParams["_0"], _1: AllowanceParams["_1"], _2: AllowanceParams["_2"]) {
        return this.eth_call(functions.allowance, {_0, _1, _2})
    }

    nonceBitmap(_0: NonceBitmapParams["_0"], _1: NonceBitmapParams["_1"]) {
        return this.eth_call(functions.nonceBitmap, {_0, _1})
    }
}

/// Event types
export type ApprovalEventArgs = EParams<typeof events.Approval>
export type LockdownEventArgs = EParams<typeof events.Lockdown>
export type NonceInvalidationEventArgs = EParams<typeof events.NonceInvalidation>
export type PermitEventArgs = EParams<typeof events.Permit>
export type UnorderedNonceInvalidationEventArgs = EParams<typeof events.UnorderedNonceInvalidation>

/// Function types
export type DOMAIN_SEPARATORParams = FunctionArguments<typeof functions.DOMAIN_SEPARATOR>
export type DOMAIN_SEPARATORReturn = FunctionReturn<typeof functions.DOMAIN_SEPARATOR>

export type AllowanceParams = FunctionArguments<typeof functions.allowance>
export type AllowanceReturn = FunctionReturn<typeof functions.allowance>

export type ApproveParams = FunctionArguments<typeof functions.approve>
export type ApproveReturn = FunctionReturn<typeof functions.approve>

export type InvalidateNoncesParams = FunctionArguments<typeof functions.invalidateNonces>
export type InvalidateNoncesReturn = FunctionReturn<typeof functions.invalidateNonces>

export type InvalidateUnorderedNoncesParams = FunctionArguments<typeof functions.invalidateUnorderedNonces>
export type InvalidateUnorderedNoncesReturn = FunctionReturn<typeof functions.invalidateUnorderedNonces>

export type LockdownParams = FunctionArguments<typeof functions.lockdown>
export type LockdownReturn = FunctionReturn<typeof functions.lockdown>

export type NonceBitmapParams = FunctionArguments<typeof functions.nonceBitmap>
export type NonceBitmapReturn = FunctionReturn<typeof functions.nonceBitmap>

export type PermitParams_0 = FunctionArguments<typeof functions['permit(address,((address,uint160,uint48,uint48)[],address,uint256),bytes)']>
export type PermitReturn_0 = FunctionReturn<typeof functions['permit(address,((address,uint160,uint48,uint48)[],address,uint256),bytes)']>

export type PermitParams_1 = FunctionArguments<typeof functions['permit(address,((address,uint160,uint48,uint48),address,uint256),bytes)']>
export type PermitReturn_1 = FunctionReturn<typeof functions['permit(address,((address,uint160,uint48,uint48),address,uint256),bytes)']>

export type PermitTransferFromParams_0 = FunctionArguments<typeof functions['permitTransferFrom(((address,uint256),uint256,uint256),(address,uint256),address,bytes)']>
export type PermitTransferFromReturn_0 = FunctionReturn<typeof functions['permitTransferFrom(((address,uint256),uint256,uint256),(address,uint256),address,bytes)']>

export type PermitTransferFromParams_1 = FunctionArguments<typeof functions['permitTransferFrom(((address,uint256)[],uint256,uint256),(address,uint256)[],address,bytes)']>
export type PermitTransferFromReturn_1 = FunctionReturn<typeof functions['permitTransferFrom(((address,uint256)[],uint256,uint256),(address,uint256)[],address,bytes)']>

export type PermitWitnessTransferFromParams_0 = FunctionArguments<typeof functions['permitWitnessTransferFrom(((address,uint256),uint256,uint256),(address,uint256),address,bytes32,string,bytes)']>
export type PermitWitnessTransferFromReturn_0 = FunctionReturn<typeof functions['permitWitnessTransferFrom(((address,uint256),uint256,uint256),(address,uint256),address,bytes32,string,bytes)']>

export type PermitWitnessTransferFromParams_1 = FunctionArguments<typeof functions['permitWitnessTransferFrom(((address,uint256)[],uint256,uint256),(address,uint256)[],address,bytes32,string,bytes)']>
export type PermitWitnessTransferFromReturn_1 = FunctionReturn<typeof functions['permitWitnessTransferFrom(((address,uint256)[],uint256,uint256),(address,uint256)[],address,bytes32,string,bytes)']>

export type TransferFromParams_0 = FunctionArguments<typeof functions['transferFrom((address,address,uint160,address)[])']>
export type TransferFromReturn_0 = FunctionReturn<typeof functions['transferFrom((address,address,uint160,address)[])']>

export type TransferFromParams_1 = FunctionArguments<typeof functions['transferFrom(address,address,uint160,address)']>
export type TransferFromReturn_1 = FunctionReturn<typeof functions['transferFrom(address,address,uint160,address)']>


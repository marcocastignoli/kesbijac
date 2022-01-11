import { callContract, initSandbox } from '../utils.js'

export default class Call {
    key() {
        return 'call'
    }
    async init() {
        return async function (contract, fn, params) {
            let sandbox = await initSandbox({
                contract,
                fn,
                params
            })
            return await callContract(sandbox)
        }
    }
}
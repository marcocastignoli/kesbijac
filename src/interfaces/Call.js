import { callContract, initSandbox } from '../utils.js'
import fetch from "node-fetch";

export default class Call {
    key() {
        return 'call'
    }
    async init() {
        return async function () {
            let domain = 'http://localhost:8888'
            let contract = ''
            let fn = ''
            let params = {}
            
            if (arguments.length === 4) {
                domain = arguments[0]
                contract = arguments[1]
                fn = arguments[2]
                params = arguments[3]
            } else {
                contract = arguments[0]
                fn = arguments[1]
                params = arguments[2]
            }
            try {
                const data = await fetch(`${domain}/${contract}/${fn}`, {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                const {res} = await data.json()
                return res
            } catch (e) {
                return false
            }
            /* let sandbox = await initSandbox({
                contract,
                fn,
                params
            })
            return await callContract(sandbox) */
        }
    }
}
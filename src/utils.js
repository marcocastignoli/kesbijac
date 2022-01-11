import vm from 'vm'
import fs from 'fs'

import Params from './interfaces/Params.js'
import State from './interfaces/State.js'
import Auth from './interfaces/Auth.js'
import Call from './interfaces/Call.js'
import Crypto from './interfaces/Crypto.js'
import Log from './interfaces/Log.js'

export async function addInterface(sandbox, i, options) {
    sandbox[i.key()] = await i.init(options)
    return sandbox
}

export async function callContract(sandbox) {
    let contract
    try {
        contract = await fs.promises.readFile(`contracts/${sandbox.contract}/contract.js`)
    } catch(e) {
        return 'Contract doesn\'t exist'
    }
    await new Promise(resolve => {
        sandbox.resolve = resolve;
        const code = `
            ${contract}
            async function init() {
                res = null
                let contract = new ${sandbox.contract}()
                if (contract[fn]) {
                    res = await contract[fn](params)
                } else {
                    res = 'function doesn\\\'t exist'
                }
                resolve()
            }
            init()
        `;
        const script = new vm.Script(code);
        const context = new vm.createContext(sandbox);
        script.runInContext(context);
    });
    return sandbox.res
}

export async function initSandbox({contract, fn, params, req}) {
    let sandbox = {
        contract,
        fn,
    };
    await addInterface(sandbox, new Params(), {
        req: req ? req : { body: params }
    })
    await addInterface(sandbox, new State(), {
        sandbox
    })
    await addInterface(sandbox, new Call())
    await addInterface(sandbox, new Auth())
    await addInterface(sandbox, new Crypto())
    await addInterface(sandbox, new Log())
    return sandbox
}
import storage from 'node-persist'

export default class State {
    key() {
        return 'state'
    }
    async init({sandbox}) {
        const stateStorage = storage.create({
            dir: `var/${sandbox.contract}`,
            stringify: JSON.stringify,
            parse: JSON.parse,
        })
        await stateStorage.init()
        return {
            set: async function set(k,v) {
                return await stateStorage.setItem(k,v)
            },
            get: async function get(k) {
                return await stateStorage.getItem(k)
            },
        }
    }
}
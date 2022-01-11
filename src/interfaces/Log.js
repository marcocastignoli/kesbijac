export default class Log {
    key() {
        return 'log'
    }
    async init() {
        return console.log
    }
}
export default class Params {
    key() {
        return 'params'
    }
    async init({req}) {
        return req.body
    }
}
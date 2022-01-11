export default class Money {
    key() {
        return 'money'
    }
    async init(req) {
        return {
            amount: 20,
            sender: 'marco',
            send: () => {}
        }
    }
}
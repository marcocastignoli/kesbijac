import bcrypt from 'bcrypt'

export default class Crypto {
    key() {
        return 'crypto'
    }
    async init(req) {
        return {
            async bcryptHash(pwd) {
                const salt = await bcrypt.genSalt(10);
                return await bcrypt.hash(pwd, salt);
            },
            async bcryptCompare(pwd1, pwd2) {
                return await bcrypt.compare(pwd1, pwd2)
            }
        }
    }
}
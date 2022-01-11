import jwt from 'jsonwebtoken'

export default class Auth {
    key() {
        return 'auth'
    }
    async init(req) {
        return {
            jwtSign: jwt.sign,
            jwtVerify: jwt.verify,
        }
    }
}
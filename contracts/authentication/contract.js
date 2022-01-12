const SECRET_KEY = 'SECRET_KEY'

class authentication {
    async login({ username, password }) {
        let password2 = await state.get(`${username}`)
        if (!password2) {
            return 'User doesn\'t exist'
        }
        const validPassword = await crypto.bcryptCompare(password, password2);
        if (!validPassword) {
            return 'Password not valid'
        }
        return auth.jwtSign({ username }, SECRET_KEY);
    }
    async register({ username, password }) {
        let user = await state.get(`${username}`)
        if (user) {
            return 'Already registered'
        }
        let pwd = await crypto.bcryptHash(password)
        await state.set(`${username}`, pwd)
        return true
    }
    async verify({ token }) {
        try {
            const decoded = auth.jwtVerify(token, SECRET_KEY);
            if (decoded && decoded.username) {
                let username = decoded.username
                let user = await state.get(`${username}`)
                if (user) {
                    return username
                }
            }
            return false
        } catch (e) {
            return false
        }
    }
    async isAdmin({token}) {
        let username = await this.verify({token})
        if (username === 'admin') {
            return true
        }
        return false
    }
}
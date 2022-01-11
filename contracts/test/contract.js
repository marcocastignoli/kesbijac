class test  {
    async set({key, value}) {
        await state.set(key, value)
        return true
    }
    async get({key}) {
        let a = await call('bank', 'balance')
        return await state.get(key) + a
    }
    async private({token}) {
        let username = await call('authentication', 'verify', {
            token
        })
        if (!username) {
            return '401'
        }
        return 'you can see me'
    }
    async onlyAdmin({token}) {
        let isAdmin = await call('authentication', 'isAdmin', {
            token
        })
        if (!isAdmin) {
            return '401'
        }
        return 'you are admin'
    }
}
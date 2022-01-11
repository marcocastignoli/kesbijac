class bank {
    async deposit() {
        if (!money) {
            return 'Must use money interface'
        }
        if (money.amount < 0) {
            return 'Must send $'
        }
        let balance = await state.get('balance') || 0
        await state.set('balance', parseInt(balance) + parseInt(money.amount))
        return true
    }

    async send({ amount, recipient }) {
        if (!money) {
            return 'Must use money interface'
        }
        if (money.sender != 'marco') {
            return 'Only the owner of this wallet can withdraw.'
        }
        let balance = await state.get('balance') || 0
        if (balance < amount) {
            return "Not enough funds."
        }
        money.send({
            amount: amount,
            currency: 'eur',
            destination: recipient
        })
        await state.set('balance', parseInt(balance) - parseInt(amount))
        return true
    }

    async balance() {
        return await state.get('balance') || 0
    }
}
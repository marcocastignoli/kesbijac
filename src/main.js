import { callContract, initSandbox, addInterface } from './utils.js'

import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json());

app.post('/:contract/:fn', async (req, res) => {
    let sandbox = await initSandbox({
        contract: req.params.contract,
        fn: req.params.fn,
        req
    })
    return res.send({
        res: await callContract(sandbox)
    })
})

app.listen(8888)
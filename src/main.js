import { callContract, initSandbox, addInterface } from './utils.js'

import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(bodyParser.json());

app.use(cors({
    origin: [
        'http://localhost',
        'http://localhost:8080',
    ]
}))

app.get('/contracts/:contract', async (req, res) => {
    let response = {
        name: req.params.contract
    }
    try {
        response.components = JSON.parse(await fs.promises.readFile(`contracts/${response.name}/abi.json`))
    } catch(e) {
        return res.status(404).send()
    }
    return res.send(response)
})

app.get('/contracts', async (req, res) => {
    const folders = (await fs.promises.readdir('./contracts', { withFileTypes: true }))
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

    const contracts = await Promise.all(folders.map(async folder => {
        try {
            return {
                name: folder,
                //components: JSON.parse(await fs.promises.readFile(`contracts/${folder}/abi.json`))
            }
        } catch (e) {
            return {
                name: folder,
            }
        }
    }))
    res.send(contracts)
})

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
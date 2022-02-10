import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import dbConnect from "./services/mongoose.js";

dotenv.config()

const port = process.env.PORT || 8000
const server = express()

server.use(express.json())
server.use(cors())

dbConnect()

if (process.env.NODE_ENV === 'production') {
    server.use(express.static('client/build'))
    server.get('*', (req, res) => {
        res.sendFile(path.resolve('client/build/index.html'))
    })
}

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})
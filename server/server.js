import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import dbConnect from "./services/mongoose.js";
import cookieParser from 'cookie-parser'
import passport from 'passport'
import router from "./routes/authRouter.js";
import jwtStrategy from "./services/passport.js";

dotenv.config()

const port = process.env.PORT || 8000
const server = express()


server.use(cors())
server.use(express.json())
server.use(cookieParser())
server.use(passport.initialize())
passport.use('jwt', jwtStrategy)

dbConnect()

server.use('/api/user', router)


if (process.env.NODE_ENV === 'production') {
    server.use(express.static('client/build'))
    server.get('*', (req, res) => {
        res.sendFile(path.resolve('client/build/index.html'))
    })
}

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})
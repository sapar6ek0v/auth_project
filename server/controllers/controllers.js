import jwt from 'jsonwebtoken'
import User from '../models/authModels.js'

export const signUp = (req, res) => {

    User.findOne({email: req.body.email}, (error, user) => {
        if (error) return res.status(400).json({message: "Error", error})
        if (user) return res.status(400).json({message: "Такого .."})

        const newUser = new User({...req.body})

        newUser.save((err, data) => {
            if (err) return res.status(401).json({message: 'Error!!!', err})

            res.json({
                message: "Success!!",
                data
            })
        })
    })
}


export const signIn = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) return res.status(400).json({message: "Error", err})
        if (!user) return res.status(400).json({message: "Такого пользователя не существует!"})

        if (!user.authenticate(req.body.password)) return res.status(401).json({message: "Неверные login or password!"})

        const token = jwt.sign({_id: user._id}, 'secret', {expiresIn: "1d"})
        res.cookie('token', token, {maxAge: 1000 * 60 * 60 * 24})

        res.json({
            token,
            user: {
                name: user.name,
                user: user.email,
                role: user.role
            }
        })
    })
}

export const auth = (req, res) => {
    const {token} = req.cookies
    if (!token) return res.status(401).json({message: 'Пользователь не авторизован!'})

    try {
        const verifyToken = jwt.verify(token, 'secret')
        const {_id} = verifyToken

        User.findById(_id, (err, user) => {
            if (err) return res.status(400).json({message: "Error", err})
            if (!user) return res.status(400).json({message: "Такого пользователя не существует!"})

            const refreshToken = jwt.sign({_id}, 'secret', {expiresIn: '1d'})
            res.cookie('token', refreshToken, {maxAge: 1000 * 60 * 60 * 24})

            res.json({
                token: refreshToken,
                user: {
                    name: user.name,
                    user: user.email,
                    role: user.role
                }
            })
        })
    } catch (e) {
        res.status(401).json({message: e})
    }
}

export const onlyAuthUsers = (req, res) => {
  res.json({message: "For private only users" })
}
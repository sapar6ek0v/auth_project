import passport from "passport";

const handleJwt = (req, res, next, roles) => {
    return async (error, user) => {
        if (error || !user) return res.status(401).json({message: "Пользователь не авторизован", error})

        if (!roles.includes(user.role)) return res.status(401).json({message: "Доступ запрещен"})

        await req.logIn(user, {session: false})
        user.req = user
        next()
    }
}


const authenticateMiddleware = (roles = []) => {
    return (req, res, next) => {
        const auth = passport.authenticate("jwt", {session: false}, handleJwt(req, res, next, roles))
    return auth(req, res, next)
    }
}

export default authenticateMiddleware
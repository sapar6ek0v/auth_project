import {Strategy, ExtractJwt} from 'passport-jwt'
import User from '../models/authModels.js'

const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies.token;
    }
    return token;
};
const options = {
    jwtFromRequest : ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: 'secret'
}

const jwtStrategy = (new Strategy(options, function(jwt_payload, done) {
    User.findById( jwt_payload._id, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
}))

export default jwtStrategy
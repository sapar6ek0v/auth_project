import express from "express";
import {signIn, signUp, auth, onlyAuthUsers} from "../controllers/controllers.js";
import authenticateMiddleware from "../middleware/authenticateMiddleware.js";


const router = express.Router()


router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.get('/auth', auth)
router.get('/private',  authenticateMiddleware(['admin', 'user']), onlyAuthUsers)
router.get('/private-admin', authenticateMiddleware(['admin']), (req, res) => {
    res.json({message:'only for admins'})
})



export default router
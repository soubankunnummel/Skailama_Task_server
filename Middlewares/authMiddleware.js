

// jwt ferivy token\
import jwt from 'jsonwebtoken'
import User from '../Models/user.model.js';


export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (!user) return res.status(401).send({ message: 'Unauthorized' });
        req.user = user
        next();
    } catch (error) {
        res.status(401).send({ message: 'Unauthorized' });
    }
}
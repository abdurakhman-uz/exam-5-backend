import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Users from '../schemas/users.js';
dotenv.config()
const { JWT_SECRET } = process.env
const authenticateToken = async (req, res, next) => {

    try {
        const token = req.headers.token || req.query.token || req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            
            const userInfo = await Users.findOne({_id: decoded.id})
            if (userInfo.role !== 'admin') {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(403).json({ message: 'Invalid token' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authenticateToken;
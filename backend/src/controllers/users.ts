import { Router, Request, Response } from 'express';
import db from '../models';
import bcrypt from 'bcrypt';

const router = Router();
const { User } = db;

router.post('/', async (req: Request, res: Response) => {
    try {
        let { password, ...rest } = req.body;
        const user = await User.create({
            ...rest,
            passwordDigest: await bcrypt.hash(password, 10)
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

export default router;

import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../models';

const router = Router();
const { User } = db;

router.post('/', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.passwordDigest))) {
            return res.status(404).json({ message: 'Could not find a user with the provided username and password' });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

export default router;

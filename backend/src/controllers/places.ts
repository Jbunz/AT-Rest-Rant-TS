import { Router, Request, Response } from 'express';
import db from '../models'; // Adjust this import based on your Sequelize setup

const { Place, Comment, User } = db;

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    if (!req.body.pic) {
        req.body.pic = 'http://placekitten.com/400/400';
    }
    if (!req.body.city) {
        req.body.city = 'Anytown';
    }
    if (!req.body.state) {
        req.body.state = 'USA';
    }
    try {
        const place = await Place.create(req.body);
        res.json(place);
    } catch (error: any) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const places = await Place.findAll();
        res.json(places);
    } catch (error: any) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

router.get('/:placeId', async (req: Request, res: Response) => {
    const placeId = Number(req.params.placeId);
    if (isNaN(placeId)) {
        res.status(404).json({ message: `Invalid id "${placeId}"` });
    } else {
        try {
            const place = await Place.findOne({
                where: { placeId: placeId },
                include: {
                    model: Comment,
                    as: 'comments',
                    include: User // Assuming User is associated with Comment
                }
            });
            if (!place) {
                res.status(404).json({ message: `Could not find place with id "${placeId}"` });
            } else {
                res.json(place);
            }
        } catch (error: any) {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
});

router.put('/:placeId', async (req: Request, res: Response) => {
    const placeId = Number(req.params.placeId);
    if (isNaN(placeId)) {
        res.status(404).json({ message: `Invalid id "${placeId}"` });
    } else {
        try {
            const place = await Place.findOne({
                where: { placeId: placeId },
            });
            if (!place) {
                res.status(404).json({ message: `Could not find place with id "${placeId}"` });
            } else {
                Object.assign(place, req.body);
                await place.save();
                res.json(place);
            }
        } catch (error: any) {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
});

router.delete('/:placeId', async (req: Request, res: Response) => {
    const placeId = Number(req.params.placeId);
    if (isNaN(placeId)) {
        res.status(404).json({ message: `Invalid id "${placeId}"` });
    } else {
        try {
            const place = await Place.findOne({
                where: { placeId: placeId }
            });
            if (!place) {
                res.status(404).json({ message: `Could not find place with id "${placeId}"` });
            } else {
                await place.destroy();
                res.json(place);
            }
        } catch (error: any) {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
});

router.post('/:placeId/comments', async (req: Request, res: Response) => {
    const placeId = Number(req.params.placeId);
    req.body.rant = req.body.rant ? true : false;

    try {
        const place = await Place.findOne({
            where: { placeId: placeId }
        });

        if (!place) {
            res.status(404).json({ message: `Could not find place with id "${placeId}"` });
            return;
        }

        const author = await User.findOne({
            where: { userId: req.body.authorId }
        });

        if (!author) {
            res.status(404).json({ message: `Could not find author with id "${req.body.authorId}"` });
            return;
        }

        const comment = await Comment.create({
            ...req.body,
            placeId: placeId
        });

        res.json({
            ...comment.toJSON(),
            author
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

router.delete('/:placeId/comments/:commentId', async (req: Request, res: Response) => {
    const placeId = Number(req.params.placeId);
    const commentId = Number(req.params.commentId);

    if (isNaN(placeId)) {
        res.status(404).json({ message: `Invalid id "${placeId}"` });
    } else if (isNaN(commentId)) {
        res.status(404).json({ message: `Invalid id "${commentId}"` });
    } else {
        try {
            const comment = await Comment.findOne({
                where: { commentId: commentId, placeId: placeId }
            });
            if (!comment) {
                res.status(404).json({ message: `Could not find comment with id "${commentId}" for place with id "${placeId}"` });
            } else {
                await comment.destroy();
                res.json(comment);
            }
        } catch (error: any) {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
});

export default router;

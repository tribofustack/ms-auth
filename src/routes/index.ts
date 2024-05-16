import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({
        title: "Orderly",
        version: "1.0.0"
    });
});

export default router;

import { Router, Request, Response } from 'express';

const router = Router();

router.get('/teste', (req: Request, res: Response) => {
   return res.json({ Syspizza: "Online!"})
   // throw new Error('Erro ao fazer essa requisição')
});

export { router };
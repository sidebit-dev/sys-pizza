import { NextFunction, Request, Response} from "express";
import { verify } from 'jsonwebtoken'

interface PayLoad{
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    //console.log("CHAMOU ESSE MIDDLEWARE")
    // Receber o token
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).end();
    }
    // console.log(authToken);
    const [, token] = authToken.split(" ")
    // console.log(token);

    try {
        // Validar esse token.
        const { sub } = verify(
           token,
           process.env.JWT_SECRET
        ) as PayLoad;

        console.log(sub);
    } catch (err) {
        return res.status(401).end();
    }
   // return next();
}
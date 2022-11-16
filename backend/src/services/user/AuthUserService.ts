import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';

interface AuthRequest{
   email: string;
   password: string; 
}

class AuthUserService{
    async execute({email, password}: AuthRequest){
        // console.log(email);
        // Verificar se o email existe.
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("User/password incorrect");
        }

        // Precisa verificar se a senha que ele mandou está correta
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            throw new Error("User/password incorrect"); 
        }

        // Gerar um Token JWT e devolver os dados do usuário como id, name, email

        return { ok: true };
    }
}

export { AuthUserService };
import { createContext, ReactNode, useState } from "react";

import { api } from "../services/apiClient";

import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
    Router.push("/");
  } catch {
    console.log("erro ao deslogar");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    //    console.log("DADOS PARA LOGAR", email);
    //    console.log("SENHA", password);
    try {
      const response = await api.post("/session", {
        email,
        password,
      });
      //console.log(response.data);

      const { id, name, token } = response.data;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/", // quais caminhos terao acesso ao cookie
      });

      setUser({
        id,
        name,
        email,
      });

      //Passar para proximas requisicoes o nosso token
      api.defaults.headers['Authrization'] =  `Bearer ${token}`

      //Redirecionar o user para /dashboard
      Router.push('/dashboard');
      
    } catch (err) {
      console.log("ERRO AO ACESSAR ", err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

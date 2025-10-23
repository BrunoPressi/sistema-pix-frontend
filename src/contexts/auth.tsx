import { createContext, type ReactNode, useState } from "react";
import {api, logoutAPI} from "../services/api";
import { loginAPI } from "../services/api"
import React from "react";
import Cookies from "js-cookie";
import {decodeToken} from "../services/utils.ts";
import type {JwtPayload} from "jsonwebtoken";

interface AuthContextData {
    signed: boolean;
    token: string | null;
    userData: JwtPayload | null;
    login(cpf_cnpj: string, senha: string): Promise<void>;
    logout(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => {
        return Cookies.get('token') ?? null;
    });
    const signed = Boolean(token);
    const [userData, setUserData] = useState<JwtPayload | null>(null)

    React.useEffect(() => {
        if (token) {
            setUserData(decodeToken(token))
            api.defaults.headers.Authorization = `Bearer ${token}`;
            Cookies.set('token', token);
        } else {
            Cookies.remove('token');
            api.defaults.headers.Authorization = "";
        }
    }, [token]);

    const login = async (cpf_cnpj: string, senha: string) => {
        try {
            const response = await loginAPI(cpf_cnpj, senha)
            const token = response.token;
            setToken(token);
            setUserData(decodeToken(token))
            api.defaults.headers.Authorization = `Bearer ${token}`;
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const logout = async () => {
        await logoutAPI();
        Cookies.remove('token');
        setToken(null);
        api.defaults.headers.Authorization = "";
    };

    return (
        <AuthContext.Provider value={{ signed, token, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

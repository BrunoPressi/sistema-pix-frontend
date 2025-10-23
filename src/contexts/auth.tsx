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
    const [userData, setUserData] = useState<JwtPayload | null>(() => {
        const token = Cookies.get('token');
        if (token) {
            const decoded = decodeToken(token);
            if (decoded.exp && decoded.exp * 1000 > Date.now()) {
                return decoded;
            } else {
                Cookies.remove("token");
                return null;
            }
        }
        return null;
    })
    const signed = Boolean(token);


    React.useEffect(() => {
        if (token) {
            const decoded = decodeToken(token);
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                setToken(null);
                setUserData(null);
                Cookies.remove("token");
                api.defaults.headers.Authorization = "";
                return;
            }
            // Token válido
            api.defaults.headers.Authorization = `Bearer ${token}`;
        } else {
            api.defaults.headers.Authorization = "";
        }
    }, [token]);

    const login = async (cpf_cnpj: string, senha: string) => {
        try {
            const response = await loginAPI(cpf_cnpj, senha)
            const token = response.token;
            const userData = decodeToken(token);
            setToken(token);
            Cookies.set('token', token);
            setUserData(userData)
            api.defaults.headers.Authorization = `Bearer ${token}`;
        } catch (error: any) {
            throw error.response?.data || error;
        }
    };

    const logout = async () => {
        await logoutAPI();
        Cookies.remove('token');
        setToken(null);
        setUserData(null)
        api.defaults.headers.Authorization = "";
    };

    return (
        <AuthContext.Provider value={{ signed, token, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

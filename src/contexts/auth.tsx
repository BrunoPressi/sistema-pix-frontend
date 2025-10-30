import { createContext, type ReactNode, useState } from "react";
import {api, logoutAPI} from "../backend/api.ts";
import { loginAPI } from "../backend/api.ts"
import React from "react";
import Cookies from "js-cookie";
import {decodeToken} from "../Utils/Utils.ts";
import type {JwtPayload} from "jsonwebtoken";
import type {LoginDTO} from "../types/LoginDTO.ts";

interface AuthContextData {
    signed: boolean;
    token: string | null;
    userData: JwtPayload | null;
    loginContext(loginDto: LoginDTO): Promise<void>;
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

    const loginContext = async (loginDTO: LoginDTO) => {
        try {
            const response = await loginAPI(loginDTO)
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
        <AuthContext.Provider value={{ signed, token, userData, loginContext, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

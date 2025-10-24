import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage.tsx";
import CadastroPage from "../pages/Cadastro/CadastroPage.tsx";
import DefaultPage from "../pages/Default/DefaultPage.tsx";

export const SignRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="CadastroPage" element={<CadastroPage/>}/>
                <Route path="*" element={<DefaultPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}
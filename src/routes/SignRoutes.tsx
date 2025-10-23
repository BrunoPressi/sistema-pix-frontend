import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage.tsx";
import CadastroPage from "../pages/Cadastro/CadastroPage.tsx";

export const SignRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path ="CadastroPage" element={<CadastroPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "../pages/Home/HomePage.tsx";
import NovaChavePage from "../pages/Chave/NovaChavePage.tsx";
import MinhasChavesPage from "../pages/Chave/MinhasChavesPage.tsx";
import DefaultPage from "../pages/Default/DefaultPage.tsx";
import PerfilPage from "../pages/Perfil/PerfilPage.tsx";
import {NovaTransacaoPage} from "../pages/Transacao/NovaTransacaoPage.tsx";

export const OtherRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/HomePage" element={<HomePage/>} />
                <Route path="/NovaChavePage" element={<NovaChavePage/>}/>
                <Route path="/MinhasChavesPage" element={<MinhasChavesPage/>}/>
                <Route path="/PerfilPage" element={<PerfilPage/>}/>
                <Route path="*" element={<DefaultPage/>}/>
                <Route path="/NovaTransacaoPage" element={<NovaTransacaoPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}
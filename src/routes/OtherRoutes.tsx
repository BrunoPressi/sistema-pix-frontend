import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "../pages/Home/HomePage.tsx";
import NovaChavePage from "../pages/Chave/NovaChavePage.tsx";

export const OtherRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/HomePage" element={<HomePage/>} />
                <Route path="/NovaChavePage" element={<NovaChavePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}
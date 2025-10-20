import './App.css'
import LoginPage from "../pages/Login/LoginPage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CadastroPage from "../pages/Cadastro/CadastroPage.tsx";

function App() {

  return (
      <Router>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/CadastroPage" element={<CadastroPage />} />
          </Routes>
      </Router>
  )
}

export default App

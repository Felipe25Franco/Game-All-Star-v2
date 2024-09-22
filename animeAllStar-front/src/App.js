import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Principais/login';
import Noticias from './pages/Principais/noticias';
import Ranking from './pages/Principais/ranking';
import HomePage from './pages/HomePage';

import CreatePersonagem from './pages/Criacao/CreatePersonagem';
import NewPersonagem from './pages/Criacao/NewPersonagem';

import DashBoardCadastro from './pages/admin/DashBoardCadastro';

import MundosAdmin from './pages/admin/Cadastro/MundosAdmin';
import MundosAdminListagem from './pages/admin/Listagem/MundosAdminListagem';
import ClasseAdminListagem from './pages/admin/Listagem/ClasseAdminListagem';

import ItensAdmin from './pages/admin/Cadastro/ItensAdmin';
import ItensAdminListagem from './pages/admin/Listagem/ItensAdminListagem';
import TipoItensAdmin from './pages/admin/Cadastro/Tipos/TipoItensAdmin';
import SubTipoItensAdmin from './pages/admin/Cadastro/Tipos/SubTipos/SubTipoItensAdmin';
import SubTipoItensAdminListagem from './pages/admin/Listagem/SubTipoItensAdminListagem';

import CriaturasAdmin from './pages/admin/Cadastro/CriaturaAdmin';
import TipoCriaturasAdmin from './pages/admin/Cadastro/Tipos/TipoCriaturaAdmin';
import CriaturasAdminListagem from './pages/admin/Listagem/CriaturaAdminListagem';
import TipoCriaturaAdminListagem from './pages/admin/Listagem/Tipos/TipoCriaturaAdminListagem';

import './App.css';

import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <Router>
      <div className="HOME">
        <Header />
        <button
          className={`button-sidebar ${isSidebarOpen ? 'move-right' : ''}`}
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? '<' : '>'}
        </button>
        <Sidebar isOpen={isSidebarOpen} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Rota da HomePage */}
            <Route path="/login" element={<Login />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/ranking" element={<Ranking />} />

            <Route path="/createPersonagem" element={<CreatePersonagem />} />
            <Route path="/newPersonagem" element={<NewPersonagem />} />

            {/* Adicione outras rotas conforme necessário */}
            <Route path="/dashBoardCadastro" element={<DashBoardCadastro />} />

            <Route path="/mundosAdmin" element={<MundosAdmin />} />
            <Route path="/mundosAdminListagem" element={<MundosAdminListagem />} />

            <Route path="/classesAdminListagem" element={<ClasseAdminListagem />} />

            

            <Route path="/itensAdmin" element={<ItensAdmin />} />
            <Route path="/itensAdminListagem" element={<ItensAdminListagem />} />
            
            <Route path="/tipoItensAdmin" element={<TipoItensAdmin />} />
            <Route path="/subTipoItensAdmin" element={<SubTipoItensAdmin />} />
            
            <Route path="/criaturasAdminListagem" element={<CriaturasAdminListagem />} />
            <Route path="/tipoCriaturasAdminListagem" element={<TipoCriaturaAdminListagem />} />
            
            <Route path="/criaturasAdmin" element={<CriaturasAdmin />} />
            <Route path="/tipoCriaturasAdmin" element={<TipoCriaturasAdmin />} />

            SubTipoItensAdminListagem
            
          </Routes>
        </main>
      </div>
    </Router>
  );

}

export default App;

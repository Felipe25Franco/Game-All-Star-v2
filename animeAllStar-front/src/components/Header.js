import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components/Header.css'; // Se você tiver um CSS específico para o Header

function Header() {
  const location = useLocation();

  // Define o título do logo com base na rota atual
  const getLogoText = () => {
    if (location.pathname === '/login') {
      return 'All Star Anime Game | Login';
    }
    if (location.pathname === '/noticias') {
      return 'All Star Anime Game | Noticias';
    }
    if (location.pathname === '/suporte') {
      return 'All Star Anime Game | Suporte';
    }
    if (location.pathname === '/contato') {
      return 'All Star Anime Game | Contato';
    }
    if (location.pathname === '/ranking') {
      return 'All Star Anime Game | Ranking';
    }
    if (location.pathname === '/dashBoardCadastro') {
      return 'All Star Anime Game | DashBoard';
    }
    if (location.pathname === '/mundoPOST') {
      return 'All Star Anime Game | Mundos POST';
    }
    return 'All Star Anime Game';
  };
  return (
    <header>
      <nav className="nav" id="nav">
      <Link className="logo" to="/">
          {getLogoText()}
        </Link>
        <ul className="nav-list" id="nav-list">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/noticias">Notícias</Link></li>
          <li><Link to="/suporte">Suporte</Link></li>
          <li><Link to="/contato">Contato</Link></li>
          <li><Link to="/dashBoardCadastro">DashBoardCadastro</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Sidebar.css';

function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul className="sidebar-list" id="sidebar-list">
        <div className="section-pages">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/noticias">Notícias</Link></li>
          <li><Link to="/suporte">Suporte</Link></li>
          <li><Link to="/contato">Contato</Link></li>
        </div>
        <div className="section-subPages">
          <li><Link to="/ranking">Ranking</Link></li>
          <li><Link to="/atualizacoes">Atualizações</Link></li>
        </div>
        <div className="section-footer-li">
          <p>FIQUE CONECTADO</p>
          <ul className="foot-list" id="foot-list">
            <li><a href="#" target="_blank"><i className="fa-brands fa-facebook" style={{ color: '#3300ff' }}></i></a></li>
            <li><a href="#" target="_blank"><i className="fa-brands fa-instagram" style={{ color: '#f924d2' }}></i></a></li>
            <li><a href="#" target="_blank"><i className="fa-brands fa-square-x-twitter" style={{ color: '#9e9e9e' }}></i></a></li>
            <li><a href="#" target="_blank"><i className="fa-brands fa-youtube" style={{ color: '#f50000' }}></i></a></li>
            <li><a href="#" target="_blank"><i className="fa-brands fa-discord" style={{ color: '#B197FC' }}></i></a></li>
          </ul>
        </div>
      </ul>
    </aside>
  );
}

export default Sidebar;

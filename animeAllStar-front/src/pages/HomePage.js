import React from 'react';
import Noticias from '../components/Noticias';
import Atualizacoes from '../components/Atualizacoes';
import Ranking from '../components/Ranking';
import '../styles/pages/HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="section-wrapper">
        <section className="section-noticias">
          <h2>Notícias</h2>
          <Noticias />
        </section>

        <section className="section-atualizacoes">
          <h2>Atualizações</h2>
          <Atualizacoes />
        </section>
      </div>

      <section className="section-ranking">
        <h2>Ranking</h2>
        <Ranking />
      </section>
    </div>
  );
}

export default HomePage;

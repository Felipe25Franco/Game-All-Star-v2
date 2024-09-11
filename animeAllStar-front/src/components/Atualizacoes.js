import React from 'react';

const Atualizacoes = () => {
  const atualizacoes = [
    { version: "v1.2", description: "Adição de novos personagens." },
    { version: "v1.1", description: "Correção de bugs." },
    { version: "v1.0", description: "Lançamento do jogo." },
  ];

  return (
    <section className="atualizacoes-section">
      <h2>Últimas Atualizações</h2>
      <div className="atualizacoes-list">
        {atualizacoes.map((atualizacao, index) => (
          <div key={index} className="atualizacao-item">
            <h3>{atualizacao.version}</h3>
            <p>{atualizacao.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Atualizacoes;

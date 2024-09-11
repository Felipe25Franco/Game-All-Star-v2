import React from 'react';

const Ranking = () => {
  const ranking = [
    { player: "Player 1", points: 1500 },
    { player: "Player 2", points: 1300 },
    { player: "Player 3", points: 1200 },
  ];

  return (
    <section className="ranking-section">
      <h2>Ranking dos Jogadores</h2>
      <div className="ranking-list">
        {ranking.map((item, index) => (
          <div key={index} className="ranking-item">
            <h3>{item.player}</h3>
            <p>{item.points} pontos</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Ranking;

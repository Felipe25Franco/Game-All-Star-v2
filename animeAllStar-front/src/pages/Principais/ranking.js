
import React, { useState, useEffect } from 'react';
import '../../styles/Ranking.css'; // Certifique-se de criar e adicionar estilos em 'Ranking.css' se desejar

const Ranking = () => {
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        // Aqui você pode fazer uma requisição para buscar o ranking de uma API ou arquivo
        fetch('https://api.exemplo.com/ranking') // Substitua pela URL real
            .then(response => response.json())
            .then(data => setRanking(data))
            .catch(error => console.error('Erro ao buscar ranking:', error));
    }, []);

    return (
        <div className="ranking-container">
            <h1>Ranking</h1>
            {ranking.length === 0 ? (
                <p>Carregando ranking...</p>
            ) : (
                <table className="ranking-table">
                    <thead>
                        <tr>
                            <th>Posição</th>
                            <th>Nome</th>
                            <th>Pontos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranking.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.nome}</td>
                                <td>{item.pontos}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Ranking;

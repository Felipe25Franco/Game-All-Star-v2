import React, { useState, useEffect } from 'react';
import '../styles/Noticias.css';

const Noticias = () => {
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/noticias')
            .then(response => response.json())
            .then(data => setNoticias(data))
            .catch(error => console.error('Erro ao buscar notícias:', error));
    }, []);

    return (
        <div className="noticias-container">
            <h1>Notícias</h1>
            {noticias.length === 0 ? (
                <p>Carregando notícias...</p>
            ) : (
                <ul className="noticias-list">
                    {noticias.map((noticia, index) => (
                        <li key={index} className="noticia-item">
                            {noticia.imagemUrl && (
                                <img src={noticia.imagemUrl} alt={noticia.titulo} className="noticia-image" />
                            )}
                            <h2 className="noticia-title">{noticia.titulo}</h2>
                            <p className="noticia-content">{noticia.conteudo}</p>
                            <p className="noticia-date">
                                <small>{new Date(noticia.data).toLocaleDateString()}</small>
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Noticias;

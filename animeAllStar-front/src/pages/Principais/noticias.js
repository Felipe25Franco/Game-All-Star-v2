import React from 'react';
import '../../styles/Noticias.css'; // Certifique-se de criar e adicionar estilos em 'Noticias.css' se desejar

const Noticias = () => {
    // Dados fictícios para teste
    const noticias = [
        {
            id: 1,
            titulo: 'Lançamento do Novo Jogo',
            conteudo: 'Estamos animados para anunciar o lançamento do nosso novo jogo, que traz gráficos incríveis e uma jogabilidade envolvente!',
            data: '2024-08-24',
            imagem_url: '../../../assets/imagens/deadpool.webp'
        },
        {
            id: 2,
            titulo: 'Atualização Importante',
            conteudo: 'Uma nova atualização foi lançada com várias correções e melhorias de desempenho. Certifique-se de atualizar seu jogo para a versão mais recente.',
            data: '2024-08-23',
            imagem_url: '../../../assets/imagens/deadpool.webp'
        }
    ];

    return (
        <div className="noticias-container">
            <h1>Notícias</h1>
            {noticias.length === 0 ? (
                <p>Carregando notícias...</p>
            ) : (
                <ul>
                    {noticias.map((noticia) => (
                        <li key={noticia.id} className="noticia-item">
                            <img src={noticia.imagem_url} alt={noticia.titulo} className="noticia-imagem" />
                            <h2>{noticia.titulo}</h2>
                            <p>{noticia.conteudo}</p>
                            <p><small>{new Date(noticia.data).toLocaleDateString()}</small></p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Noticias;

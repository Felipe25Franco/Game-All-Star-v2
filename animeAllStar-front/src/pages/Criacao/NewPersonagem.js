import React, { useState } from 'react';
import '../../styles/pages/Criacao/NewPersonagem.css';


function NewPersonagem() {
  const [selectedWorld, setSelectedWorld] = useState(0); // Estado para controlar o mundo selecionado
  const worlds = [
    { name: 'Mundo Naruto', image: './assets/imagens/Naruto.jpg' },
    { name: 'Mundo Fairy Tail', image: './assets/imagens/Fairy Tail.jpg' },
    { name: 'Mundo One Piece', image: './assets/imagens/One Piece.jpeg' },
    { name: 'Mundo Bleach', image: './assets/imagens/Bleach.webp' },
    { name: 'Mundo Dragon Ball', image: './assets/imagens/Dragon Ball.png' },
  ];

  const handleNextWorld = () => {
    setSelectedWorld((prevWorld) => (prevWorld + 1) % worlds.length);
  };

  const handlePrevWorld = () => {
    setSelectedWorld((prevWorld) =>
      prevWorld === 0 ? worlds.length - 1 : prevWorld - 1
    );
  };

  return (
    <div className="new-personagem-container">
      <h1>Criar Novo Personagem</h1>
      <form className="new-personagem-form">
        {/* Nome do Personagem */}
        <label htmlFor="nome-personagem">Nome do Personagem:</label>
        <input type="text" id="nome-personagem" name="nomePersonagem" required />

        {/* Sexo do Personagem */}
        <label htmlFor="sexo-personagem">Sexo do Personagem:</label>
        <div className="sexo-options">
          <label>
            <input type="radio" name="sexoPersonagem" value="Masculino" required /> Masculino
          </label>
          <label>
            <input type="radio" name="sexoPersonagem" value="Feminino" required /> Feminino
          </label>
        </div>

        {/* Carrossel de Mundos */}
        <div className="world-selection">
          <h2>Escolha o Mundo Inicial</h2>
          <div className="carousel">
            <button type="button" onClick={handlePrevWorld}>Anterior</button>
            <div className="world-preview">
              <img src={worlds[selectedWorld].image} alt={worlds[selectedWorld].name} />
              <p>{worlds[selectedWorld].name}</p>
            </div>
            <button type="button" onClick={handleNextWorld}>Próximo</button>
          </div>
        </div>

        <button type="submit">Salvar Personagem</button>
      </form>
    </div>
  );
}

export default NewPersonagem;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/Criacao/CreatePersonagem.css';

function CreatePersonagem() {
  const navigate = useNavigate();

  const handleCriarNovoPersonagem = () => {
    // Lógica para criar um novo personagem
    navigate('/newPersonagem');
    // Navegar para uma página onde cria o personagem, ou exibir modal
  };

  return (
    <div className="personagem-container">
      <h1>Seu Personagem</h1>
      {/* Aqui você pode renderizar informações do personagem */}
      <div className="personagem-info">
        <h2>Nome: Nome do Personagem</h2>
        <p>Nível: 10</p>
        <p>Poder: 1000</p>
      </div>

      {/* Container dos botões */}
            <div className="personagem-buttons">
              <button onClick={handleCriarNovoPersonagem}>Criar Novo Personagem</button>
              <button >Outra Ação</button>
            </div>
    </div>
  );
}

export default CreatePersonagem;

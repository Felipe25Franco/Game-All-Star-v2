import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../config/axios';
import { useNavigate } from 'react-router-dom';
import '../../../styles/pages/admin/Cadastro/TipoItensAdmin.css';

function CadastroTipoItem() {
  const [novoTipo, setNovoTipo] = useState('');
  const navigate = useNavigate();

  const handleAddTipo = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/tipos`, { nome: novoTipo });
      navigate('/admin/itens'); // Volta para a página de itens após o cadastro
    } catch (error) {
      console.error('Erro ao adicionar tipo:', error);
    }
  };

  return (
    <div className="cadastro-tipo-item-container">
      <h1>Cadastro de Tipo de Item</h1>
      <form onSubmit={handleAddTipo}>
        <label htmlFor="novoTipo">Nome do Tipo:</label>
        <input
          type="text"
          id="novoTipo"
          value={novoTipo}
          onChange={(e) => setNovoTipo(e.target.value)}
          required
        />
        <button type="submit">Adicionar Tipo</button>
      </form>
    </div>
  );
}

export default CadastroTipoItem;

import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../../../config/axios';
import { useNavigate } from 'react-router-dom';
import '../../../../../styles/pages/admin/Cadastro/SubTipoItensAdmin.css';

function SubTipoItensAdmin() {
  const [novoSubTipo, setNovoSubTipo] = useState({ nome: '', descricao: '' });
  const navigate = useNavigate();

  const handleAddSubTipo = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/subTipoItens`, novoSubTipo);
      navigate('/itensAdminListagem'); // Volta para a página de itens após o cadastro
    } catch (error) {
      console.error('Erro ao adicionar subtipo:', error);
    }
  };

  return (
    <div className="cadastro-subtipo-item-container">
      <h1>Cadastro de Subtipo de Item</h1>
      <form onSubmit={handleAddSubTipo}>
        <label htmlFor="nome">Nome do Subtipo:</label>
        <input
          type="text"
          id="nome"
          value={novoSubTipo.nome}
          onChange={(e) => setNovoSubTipo({ ...novoSubTipo, nome: e.target.value })}
          required
        />

        <label htmlFor="descricao">Descrição do Subtipo:</label>
        <textarea
          id="descricao"
          value={novoSubTipo.descricao}
          onChange={(e) => setNovoSubTipo({ ...novoSubTipo, descricao: e.target.value })}
          required
        />

        <button type="submit">Adicionar Subtipo</button>
      </form>
    </div>
  );
}

export default SubTipoItensAdmin;

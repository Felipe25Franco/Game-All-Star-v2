import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../config/axios';
import { useNavigate } from 'react-router-dom';
import '../../../styles/pages/admin/Cadastro/TipoItensAdmin.css';

function CadastroTipoItem() {
  const [novoTipo, setNovoTipo] = useState('');
  const [subtipos, setSubtipos] = useState([]);
  const [subtipoSelecionado, setSubtipoSelecionado] = useState('');
  const navigate = useNavigate();

  // Função para buscar os subtipos de item da API
  useEffect(() => {
    const fetchSubtipos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/subTipoItens`);
        setSubtipos(response.data || []);
      } catch (error) {
        console.error('Erro ao buscar subtipos de item:', error);
      }
    };

    fetchSubtipos();
  }, []);


  const handleAddTipo = async (e) => {
    e.preventDefault();

    try {
      // Verifica se o subtipoSelecionado não está vazio
      if (!subtipoSelecionado) {
        console.error('Por favor, selecione um subtipo de item.');
        return;
      }

      // Envia o nome do tipo e o ID do subtipoItem
      const response = await axios.post(`${BASE_URL}/tipoItens`, {
        nome: novoTipo, // Inclui o nome do tipo
        idSubTipoItem: subtipoSelecionado, // Envia o ID do subtipo diretamente como idSubTipoItem
      });

      // Redireciona para a página de itens após o cadastro
      navigate('/itensAdmin');
    } catch (error) {
      console.error('Erro ao adicionar tipo:', error.response ? error.response.data : error.message);
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

        <label htmlFor="subtipoItem">Subtipo de Item:</label>
        <div className="subtipo-item-container">
          <select
            id="subtipoItem"
            value={subtipoSelecionado}
            onChange={(e) => setSubtipoSelecionado(e.target.value)}
            required
          >
            <option value="">Selecione um subtipo de Item</option>
            {subtipos.map((subtipo) => (
              <option key={subtipo.id} value={subtipo.id}>
                {subtipo.nome}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="add-type-button"
            onClick={() => navigate('/subTipoItensAdmin')}
          >
            Adicionar SubTipo
          </button>
        </div>

        <button type="submit">Adicionar Tipo</button>
      </form>
    </div>
  );
}

export default CadastroTipoItem;

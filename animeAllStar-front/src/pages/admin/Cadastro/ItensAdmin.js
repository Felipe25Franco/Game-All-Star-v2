import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importando Axios para requisições HTTP
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../config/axios'; // Importa a constante BASE_URL
import '../../../styles/pages/admin/Cadastro/ItensAdmin.css'; // Adapte conforme necessário

function ItensAdmin() {
  const [itens, setItens] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [mundos, setMundos] = useState([]);
  const [newItem, setNewItem] = useState({ nome: '', tipoItem: '', mundo: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  // Função para buscar itens do backend
  useEffect(() => {
    const fetchItens = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/itens`);
        setItens(response.data || []); // Garantir que response.data seja um array
      } catch (error) {
        console.error('Erro ao buscar itens:', error);
      }
    };
    fetchItens();
  }, []);

  // Função para buscar tipos de item
  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tipos`);
        setTipos(response.data || []); // Garantir que response.data seja um array
      } catch (error) {
        console.error('Erro ao buscar tipos de item:', error);
      }
    };
    fetchTipos();
  }, []);

  // Função para buscar mundos
  useEffect(() => {
    const fetchMundos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/mundos`);
        console.log('Mundos recebidos:', response.data);
        setMundos(response.data || []); // Garantir que response.data seja um array
      } catch (error) {
        console.error('Erro ao buscar mundos:', error);
      }
    };
    fetchMundos();
  }, []);

  // Função para cadastrar um novo item no backend
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/itens`, newItem);
      setItens([...itens, response.data]); // Atualiza a lista de itens com o novo item
      handleClearForm(); // Limpa o formulário após adicionar
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  };

  // Função para limpar os dados do formulário
  const handleClearForm = () => {
    setNewItem({ nome: '', tipoItem: '', mundo: '' });
    setIsEditing(false);
    setEditItemId(null);
  };

  // Função para editar um item existente
  const handleEditItem = (id) => {
    const itemToEdit = itens.find((item) => item.id === id);
    if (itemToEdit) {
      setNewItem({
        nome: itemToEdit.nome,
        tipoItem: itemToEdit.tipoItem ? itemToEdit.tipoItem.id : '', // Verificação adicional
        mundo: itemToEdit.mundo ? itemToEdit.mundo.id : '' // Verificação adicional
      });
      setIsEditing(true);
      setEditItemId(id);
    }
  };

  // Função para salvar o item editado no backend
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/itens/${editItemId}`, newItem);
      setItens(
        itens.map((item) =>
          item.id === editItemId ? { id: editItemId, ...newItem } : item
        )
      );
      handleClearForm();
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  // Função para excluir um item no backend
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/itens/${id}`);
      setItens(itens.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  };

  return (
    <div className="itens-admin-container">
      <h1>Cadastro de Itens</h1>
      <div className="admin-layout">
        {/* Formulário para cadastrar ou editar itens */}
        <div className="form-container">
          <form onSubmit={isEditing ? handleSaveEdit : handleAddItem}>
            <label htmlFor="nome">Nome do Item:</label>
            <input
              type="text"
              id="nome"
              value={newItem.nome}
              onChange={(e) => setNewItem({ ...newItem, nome: e.target.value })}
              required
            />

            <label htmlFor="tipoItem">Tipo do Item:</label>
            <select
              id="tipoItem"
              value={newItem.tipoItem}
              onChange={(e) => setNewItem({ ...newItem, tipoItem: e.target.value })}
              required
            >
              <option value="">Selecione um tipo de item</option>
              {tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nome}
                </option>
              ))}
            </select>

            <label htmlFor="mundo">Mundo:</label>
            <select
              id="mundo"
              value={newItem.mundo}
              onChange={(e) => setNewItem({ ...newItem, mundo: e.target.value })}
              required
            >
              <option value="">Selecione um mundo</option>
              {mundos.map((mundo) => (
                <option key={mundo.id} value={mundo.id}>
                  {mundo.nome}
                </option>
              ))}
            </select>

            <div className="buttons-container">
              <button type="submit">{isEditing ? 'Salvar Alterações' : 'Cadastrar Item'}</button>
              <button type="button" onClick={handleClearForm}>Limpar Dados</button>
            </div>
          </form>
        </div>

        {/* Lista de itens cadastrados */}
        <div className="itens-list-container">
          <h2>Itens Cadastrados</h2>
          <div className="itens-list">
            {itens.slice(0 ,3).map((item) => (
              <div key={item.id} className="item-item">
                <h3>{item.nome || 'Nome não disponível'}</h3>
                <p>Tipo: {item.tipoItem ? item.tipoItem.nome : 'Tipo não disponível'}</p>
                <p>Mundo: {item.mundo ? item.mundo.name : 'Mundo não disponível'}</p>
                <div className="action-buttons">
                  <button onClick={() => handleEditItem(item.id)}>Editar</button>
                  <button onClick={() => handleDeleteItem(item.id)}>Excluir</button>
                </div>
              </div>
            ))}
            {/* Botão para ver todos os itens */}
            {itens.length > 3 && (
                <div className="view-all-button">
                    <Link to="/admin/itens">Ver Todos os Itens</Link>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItensAdmin;

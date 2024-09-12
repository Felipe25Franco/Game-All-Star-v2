import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link ,useNavigate  } from 'react-router-dom';
import { BASE_URL } from '../../../config/axios';
import '../../../styles/pages/admin/Cadastro/ItensAdmin.css';

function ItensAdmin() {
  const [itens, setItens] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [mundos, setMundos] = useState([]);

  const [newItem, setNewItem] = useState({ nome: '', urlImage: '', tipoItem: '', mundo: '', subtipoItem: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);


    const navigate = useNavigate();


  useEffect(() => {
    const fetchItens = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/itens`);
        setItens(response.data || []);
      } catch (error) {
        console.error('Erro ao buscar itens:', error);
      }
    };
    fetchItens();
  }, []);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tipos`);
        setTipos(response.data || []);
      } catch (error) {
        console.error('Erro ao buscar tipos de item:', error);
      }
    };
    fetchTipos();
  }, []);

  useEffect(() => {
    const fetchMundos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/mundos`);
        setMundos(response.data || []);
      } catch (error) {
        console.error('Erro ao buscar mundos:', error);
      }
    };
    fetchMundos();
  }, []);



  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/itens`, newItem);
      setItens([...itens, response.data]);
      handleClearForm();
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  };

  const handleClearForm = () => {
    setNewItem({ nome: '', urlImage: '', tipoItem: '', mundo: '', subtipoItem: '' });
    setIsEditing(false);
    setEditItemId(null);
  };

  const handleEditItem = (id) => {
    const itemToEdit = itens.find((item) => item.id === id);
    if (itemToEdit) {
      setNewItem({
        nome: itemToEdit.nome,
        urlImage: itemToEdit.urlImage || '',
        tipoItem: itemToEdit.tipoItem ? itemToEdit.tipoItem.id : '',
        mundo: itemToEdit.mundo ? itemToEdit.mundo.id : '',
        subtipoItem: itemToEdit.subtipoItem ? itemToEdit.subtipoItem.id : ''
      });
      setIsEditing(true);
      setEditItemId(id);
    }
  };

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

            <label htmlFor="urlImage">URL da Imagem do Item:</label>
            <input
              type="text"
              id="urlImage"
              value={newItem.urlImage}
              onChange={(e) => setNewItem({ ...newItem, urlImage: e.target.value })}
              required
            />

            <label htmlFor="tipoItem">Tipo do Item:</label>
            <div className="tipo-item-container">
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

            <button
                          type="button"
                          className="add-type-button"
                          onClick={() => navigate('/tipoItensAdmin')}
                        >
                          Adicionar Tipo
                        </button>
                      </div>



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

        <div className="itens-list-container">
          <h2>Itens Cadastrados</h2>
          <div className="itens-list">
            {itens.slice(0 ,3).map((item) => (
              <div key={item.id} className="item-item">
                <h3>{item.nome || 'Nome não disponível'}</h3>
                <p>Tipo: {item.tipoItem ? item.tipoItem.nome : 'Tipo não disponível'}</p>
                <p>Mundo: {item.mundo ? item.mundo.nome : 'Mundo não disponível'}</p>
                <div className="action-buttons">
                  <button onClick={() => handleEditItem(item.id)}>Editar</button>
                  <button onClick={() => handleDeleteItem(item.id)}>Excluir</button>
                </div>
              </div>
            ))}
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

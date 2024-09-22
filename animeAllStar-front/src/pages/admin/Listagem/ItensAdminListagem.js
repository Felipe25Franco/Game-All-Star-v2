import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../config/axios';
import '../../../styles/pages/admin/Listagem/ItensAdminListagem.css';

function ItensAdminListagem() {
  const [itens, setItens] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Valor da busca
  const [mundos, setMundos] = useState([]);
  const [tipoItens, setTipoItens] = useState([]);
  const [subTipoItens, setSubTipoItens] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/itens`);
        setItens(response.data);
      } catch (error) {
        console.error('Erro ao buscar Criaturas:', error);
      }
    };
    fetchItens();
  }, []);

  useEffect(() => {
    const fetchMundosETipos = async () => {
      try {
        const mundosResponse = await axios.get(`${BASE_URL}/mundos`);
        const mundosData = mundosResponse.data;
  
        const tipoItensResponse = await axios.get(`${BASE_URL}/tipoItens`);
        const tipoItensData = tipoItensResponse.data;
  
        // Buscar os subtipos
        const subTipoItensPromises = tipoItensData.map(async (tipo) => {
          const subtipoResponse = await axios.get(`${BASE_URL}/subTipoItens/${tipo.idSubTipoItem}`);
          return { ...tipo, subtipoItem: subtipoResponse.data };
        });
  
        const tipoItensWithSubTipos = await Promise.all(subTipoItensPromises);
        setTipoItens(tipoItensWithSubTipos);
      } catch (error) {
        console.error('Erro ao buscar Mundos ou Tipos de Itens:', error);
      }
    };
  
    fetchMundosETipos();
  }, []);

  // Função de busca em tempo real
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtrando as criaturas com base na busca
  const filteredItens = itens.filter((item) =>
    item.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/itens/${id}`);
      setItens(itens.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  };

  const handleEditItem = (item) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      // Adiciona o idTipoItem ao editItem, se ele estiver selecionado
      const updatedItem = {
        ...editItem,
        idTipoItem: editItem.tipoItem ? editItem.tipoItem.id : null, // Ou defina um valor padrão, se necessário
      };
      
      console.log('Editando item:', updatedItem);
      
      // Faz a requisição para atualizar o item no backend
      await axios.put(`${BASE_URL}/itens/${editItem.id}`, updatedItem);
      
      // Atualiza a lista de itens no estado local
      setItens(itens.map(item => (item.id === editItem.id ? updatedItem : item)));
      setIsModalOpen(false);
      setEditItem(null);
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditItem(null);
  };

  return (
    <div className="itens-admin-listagem-container">
      <h1>Lista de Todos os Itens</h1>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar item pelo nome"
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="view-all-button">
        <Link to="/itensAdmin">Cadastrar novo Item</Link>
        <Link to="/tipoItensAdmin">Cadastrar novo Tipo de Item</Link>
        <Link to="/subTipoItensAdmin">Cadastrar novo SubTipo de Item</Link>
      </div>

      <div className="itens-list">
        {filteredItens.length > 0 ? (
          filteredItens.map((item) => (
            <div key={item.id} className="item-item">
              <img src={item.urlImage} alt={item.nome} />
              <h3>{item.nome || 'Nome não disponível'}</h3>
              <p>Descrição: {item.descricao || 'Descrição não disponível'}</p>
              <div className="action-buttons">
                <button className="edit-button" onClick={() => handleEditItem(item)}>
                  Editar
                </button>
                <button className="delete-button" onClick={() => handleDeleteItem(item.id)}>
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum item encontrado.</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Editar item</h2>
      <label htmlFor="nome">Nome do item:</label>
      <input
        type="text"
        id="nome"
        value={editItem.nome}
        onChange={(e) => setEditItem({ ...editItem, nome: e.target.value })}
      />

      <label htmlFor="descricao">Descrição de Item:</label>
      <textarea
        id="descricao"
        value={editItem.descricao}
        onChange={(e) => setEditItem({ ...editItem, descricao: e.target.value })}
      />

      <label htmlFor="urlImage">URL da Imagem do Item:</label>
      <input
        type="text"
        id="urlImage"
        value={editItem.urlImage}
        onChange={(e) => setEditItem({ ...editItem, urlImage: e.target.value })}
      />

      <label htmlFor="mundo">Mundo:</label>
      <select
        id="mundo"
        value={editItem.mundo ? editItem.mundo.id : ''}
        onChange={(e) => {
          const selectedMundo = mundos.find(mundo => mundo.id === parseInt(e.target.value));
          setEditItem({ ...editItem, mundo: selectedMundo });
        }}
      >
        <option value="">Selecione um mundo</option>
        {mundos.map((mundo) => (
          <option key={mundo.id} value={mundo.id}>
            {mundo.nome}
          </option>
        ))}
      </select>

      <label htmlFor="tipoItem">Tipo de Item:</label>
      <select
            id="tipoItem"
            value={editItem.tipoItem ? editItem.tipoItem.id : ''}
            onChange={(e) => {
                const selectedId = parseInt(e.target.value);
                
                const selectedTipoItem = tipoItens.find(tipo => tipo.id === parseInt(e.target.value));
                console.log('Tipo selecionado:', selectedTipoItem);
                setEditItem({ ...editItem, tipoItem: selectedTipoItem });
            }}
            >
            <option value="">Selecione um tipo</option>
            {tipoItens.map((tipo) => {
            const subtipoNome = tipo.subtipoItem ? tipo.subtipoItem.nome : 'Nenhum subtipo';
            return (
                <option key={tipo.id} value={tipo.id}>
                {`${tipo.nome} | ${subtipoNome}`}
                </option>
            );
            })}
        </select>

      <div className="modal-buttons">
        <button onClick={handleSaveEdit}>Salvar</button>
        <button onClick={handleModalClose}>Cancelar</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default ItensAdminListagem;

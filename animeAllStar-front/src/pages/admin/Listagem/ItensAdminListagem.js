import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../config/axios';
import '../../../styles/pages/admin/Listagem/ItensAdminListagem.css';

function ItensAdminListagem() {
    const [itens, setItens] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
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
                console.error('Erro ao buscar Itens:', error);
            }
        };
        fetchItens();
    }, []);

    useEffect(() => {
        const fetchMundosTiposSub = async () => {
            try {
                const mundosResponse = await axios.get(`${BASE_URL}/mundos`);
                setMundos(mundosResponse.data);

                const tipoItensResponse = await axios.get(`${BASE_URL}/tipoItens`);
                setTipoItens(tipoItensResponse.data);

                const subTipoItensResponse = await axios.get(`${BASE_URL}/subTipoItens`);
                setSubTipoItens(subTipoItensResponse.data);
            } catch (error) {
                console.error('Erro ao buscar Mundos ou Tipos de Itens ou SubTipo de Itens:', error);
            }
        };

        fetchMundosTiposSub();
    }, []);


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

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
         await axios.put(`${BASE_URL}/itens/${editItem.id}`, editItem);
         setItens(
           itens.map((item) =>
             item.id === editItem.id ? editItem : item
           )
         );
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
            <Link to="/tipoItensAdminListagem">Listagem de Tipo de Item</Link>
            <Link to="/dashBoardCadastro">Voltar</Link>
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

          <label htmlFor="descricao">Descrição do item:</label>
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

          <label htmlFor="item">Mundo:</label>
          <select
            id="item"
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

          <label htmlFor="tipoItens">Tipo de Item:</label>
          <select
            id="tipoItens"
            value={editItem.tipoItens ? editItem.tipoItens.id : ''}
            onChange={(e) => {
              const selectedTipoItens = tipoItens.find(tipo => tipo.id === parseInt(e.target.value));
              setEditItem({ ...editItem, tipoItens: selectedTipoItens });
            }}
          >
            <option value="">Selecione um tipo</option>
            {tipoItens.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nome}
              </option>
            ))}
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

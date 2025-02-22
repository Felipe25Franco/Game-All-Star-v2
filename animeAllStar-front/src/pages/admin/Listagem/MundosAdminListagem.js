import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../config/axios';
import '../../../styles/pages/admin/Listagem/MundosAdminListagem.css';

function MundosAdminListagem() {
  const [mundos, setMundos] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Valor da busca
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMundo, setEditMundo] = useState(null);

  useEffect(() => {
    const fetchMundos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/mundos`);
        setMundos(response.data);
      } catch (error) {
        console.error('Erro ao buscar mundos:', error);
      }
    };
    fetchMundos();
  }, []);

   // Função de busca em tempo real
   const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtrando as criaturas com base na busca
  const filteredMundos = mundos.filter((mundo) =>
    (mundo.nome ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteMundo = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/mundos/${id}`);
      setMundos(mundos.filter((mundo) => mundo.id !== id));
    } catch (error) {
      console.error('Erro ao excluir mundo:', error);
    }
  };

  const handleEditMundo = (mundo) => {
    setEditMundo(mundo);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${BASE_URL}/mundos/${editMundo.id}`, editMundo);
      setMundos(
        mundos.map((mundo) =>
          mundo.id === editMundo.id ? editMundo : mundo
        )
      );
      setIsModalOpen(false);
      setEditMundo(null);
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditMundo(null);
  };

  return (
    <div className="mundos-admin-listagem-container">
      <h1>Lista de Todos os Mundos</h1>

       {/* Campo de busca */}
       <input
        type="text"
        placeholder="Buscar Mundo pelo nome"
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="view-all-button">
        <Link to="/mundosAdmin">Cadastrar novo Mundo</Link>
      </div>
      <div className="mundos-list">
        {filteredMundos.length > 0 ? (
        filteredMundos.map((mundo) => (
          <div key={mundo.id} className="mundo-item">
            <img src={mundo.urlImage} alt={mundo.nome} />
            <h3>{mundo.nome || 'Nome não disponível'}</h3>
            <p>Descrição: {mundo.descricao || 'Descrição não disponível'}</p>
            <div className="action-buttons">
               <button className="edit-button" onClick={() => handleEditMundo(mundo)}>Editar</button>
               <button className="delete-button" onClick={() => handleDeleteMundo(mundo.id)}>Excluir</button>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhum Mundo Encontrado</p>
      )}
       
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Mundo</h2>
            <label htmlFor="nome">Nome do Mundo:</label>
            <input
              type="text"
              id="nome"
              value={editMundo.nome}
              onChange={(e) => setEditMundo({ ...editMundo, nome: e.target.value })}
            />

            <label htmlFor="descricao">Descrição do Mundo:</label>
            <textarea
              id="descricao"
              value={editMundo.descricao}
              onChange={(e) => setEditMundo({ ...editMundo, descricao: e.target.value })}
            />

            <label htmlFor="urlImage">URL da Imagem do Mundo:</label>
            <input
              type="text"
              id="urlImage"
              value={editMundo.urlImage}
              onChange={(e) => setEditMundo({ ...editMundo, urlImage: e.target.value })}
            />

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

export default MundosAdminListagem;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../config/axios';
import '../../../styles/pages/admin/Listagem/ClassesAdminListagem.css';

function ClasseAdminListagem() {
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Valor da busca
  const [mundos, setMundos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editClasse, setEditClasse] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/classes`);
        setClasses(response.data);
      } catch (error) {
        console.error('Erro ao buscar Classes:', error);
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchMundos = async () => {
      try {
        const mundosResponse = await axios.get(`${BASE_URL}/mundos`);
        setMundos(mundosResponse.data);
      } catch (error) {
        console.error('Erro ao buscar Mundos:', error);
      }
    };

    fetchMundos();
  }, []);

  // Função de busca em tempo real
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtrando as criaturas com base na busca
  const filteredClasses = classes.filter((classe) =>
    classe.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClasse = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/classes/${id}`);
      setClasses(classes.filter((classe) => classe.id !== id));
    } catch (error) {
      console.error('Erro ao excluir classe:', error);
    }
  };

  const handleEditClasse = (classe) => {
    setEditClasse(classe);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${BASE_URL}/classes/${editClasse.id}`, editClasse);
      setClasses(
        classes.map((classe) =>
          classe.id === editClasse.id ? editClasse : classe
        )
      );
      setIsModalOpen(false);
      setEditClasse(null);
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditClasse(null);
  };

  return (
    <div className="classes-admin-listagem-container">
      <h1>Lista de Todas as Classes</h1>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar classe pelo nome"
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="view-all-button">
        <Link to="/classesAdmin">Cadastrar nova Classe</Link>
      </div>

      <div className="classes-list">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((classe) => (
            <div key={classe.id} className="classe-item">
              <img src={classe.urlImage} alt={classe.nome} />
              <h3>{classe.nome || 'Nome não disponível'}</h3>
              <p>Descrição: {classe.descricao || 'Descrição não disponível'}</p>
              <div className="action-buttons">
                <button className="edit-button" onClick={() => handleEditClasse(classe)}>
                  Editar
                </button>
                <button className="delete-button" onClick={() => handleDeleteClasse(classe.id)}>
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma Classe encontrada.</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Editar classe</h2>
      <label htmlFor="nome">Nome da classe:</label>
      <input
        type="text"
        id="nome"
        value={editClasse.nome}
        onChange={(e) => setEditClasse({ ...editClasse, nome: e.target.value })}
      />

      <label htmlFor="descricao">Descrição da classe:</label>
      <textarea
        id="descricao"
        value={editClasse.descricao}
        onChange={(e) => setEditClasse({ ...editClasse, descricao: e.target.value })}
      />

      <label htmlFor="urlImage">URL da Imagem do Mundo:</label>
      <input
        type="text"
        id="urlImage"
        value={editClasse.urlImage}
        onChange={(e) => setEditClasse({ ...editClasse, urlImage: e.target.value })}
      />

      <label htmlFor="mundo">Mundo:</label>
      <select
        id="mundo"
        value={editClasse.mundo ? editClasse.mundo.id : ''}
        onChange={(e) => {
          const selectedMundo = mundos.find(mundo => mundo.id === parseInt(e.target.value));
          setEditClasse({ ...editClasse, mundo: selectedMundo });
        }}
      >
        <option value="">Selecione um mundo</option>
        {mundos.map((mundo) => (
          <option key={mundo.id} value={mundo.id}>
            {mundo.nome}
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

export default ClasseAdminListagem;

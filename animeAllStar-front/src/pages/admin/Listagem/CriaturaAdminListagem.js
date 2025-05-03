import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../config/axios';
import '../../../styles/pages/admin/Listagem/CriaturasAdminListagem.css';

function CriaturaAdminListagem() {
  const [criaturas, setCriaturas] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Valor da busca
  const [mundos, setMundos] = useState([]);
  const [selectedMundoId, setSelectedMundoId] = useState('');
  const [tipoCriaturas, setTipoCriaturas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCriatura, setEditCriatura] = useState(null);

  useEffect(() => {
    const fetchCriaturas = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/criaturas`);
        setCriaturas(response.data);
      } catch (error) {
        console.error('Erro ao buscar Criaturas:', error);
      }
    };
    fetchCriaturas();
  }, []);

  useEffect(() => {
    const fetchMundosETipos = async () => {
      try {
        const mundosResponse = await axios.get(`${BASE_URL}/mundos`);
        setMundos(mundosResponse.data);

        const tiposCriaturaResponse = await axios.get(`${BASE_URL}/tiposCriaturas`);
        setTipoCriaturas(tiposCriaturaResponse.data);
      } catch (error) {
        console.error('Erro ao buscar Mundos ou Tipos de Criatura:', error);
      }
    };

    fetchMundosETipos();
  }, []);

  // Função de busca em tempo real
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtrando as criaturas com base na busca
  const filteredCriaturas = criaturas.filter((criatura) => {
    const matchesName = criatura.nome.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMundo = selectedMundoId === '' || (criatura.mundo && criatura.mundo.id === parseInt(selectedMundoId));
    return matchesName && matchesMundo;
  });

  const handleDeleteCriatura = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/criaturas/${id}`);
      setCriaturas(criaturas.filter((criatura) => criatura.id !== id));
    } catch (error) {
      console.error('Erro ao excluir criatura:', error);
    }
  };

  const handleEditCriatura = (criatura) => {
    setEditCriatura(criatura);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${BASE_URL}/criaturas/${editCriatura.id}`, editCriatura);
      setCriaturas(
        criaturas.map((criatura) =>
          criatura.id === editCriatura.id ? editCriatura : criatura
        )
      );
      setIsModalOpen(false);
      setEditCriatura(null);
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditCriatura(null);
  };

  return (
    <div className="criaturas-admin-listagem-container">
      <h1>Lista de Todas as Criaturas</h1>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar criatura pelo nome"
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

      <select
        className="mundo-filter"
        value={selectedMundoId}
        onChange={(e) => setSelectedMundoId(e.target.value)}
      >
        <option value="">Filtrar por Mundo</option>
        {mundos.map((mundo) => (
          <option key={mundo.id} value={mundo.id}>
            {mundo.nome}
          </option>
        ))}
      </select>

      <div className="view-all-button">
        <Link to="/criaturasAdmin">Cadastrar nova Criatura</Link>
        <Link to="/tipoCriaturasAdminListagem">Listagem de Tipo de Criaturas</Link>
        <Link to="/dashBoardCadastro">Voltar</Link>
      </div>

      <div className="criaturas-list">
        {filteredCriaturas.length > 0 ? (
          filteredCriaturas.map((criatura) => (
            <div key={criatura.id} className="criatura-item">
              <img src={criatura.urlImage} alt={criatura.nome} />
              <h3>{criatura.nome || 'Nome não disponível'}</h3>
              <p>Descrição: {criatura.descricao || 'Descrição não disponível'}</p>
              <div className="action-buttons">
                <button className="edit-button" onClick={() => handleEditCriatura(criatura)}>
                  Editar
                </button>
                <button className="delete-button" onClick={() => handleDeleteCriatura(criatura.id)}>
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma criatura encontrada.</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Editar criatura</h2>
      <label htmlFor="nome">Nome da criatura:</label>
      <input
        type="text"
        id="nome"
        value={editCriatura.nome}
        onChange={(e) => setEditCriatura({ ...editCriatura, nome: e.target.value })}
      />

      <label htmlFor="descricao">Descrição da criatura:</label>
      <textarea
        id="descricao"
        value={editCriatura.descricao}
        onChange={(e) => setEditCriatura({ ...editCriatura, descricao: e.target.value })}
      />

      <label htmlFor="urlImage">URL da Imagem do Mundo:</label>
      <input
        type="text"
        id="urlImage"
        value={editCriatura.urlImage}
        onChange={(e) => setEditCriatura({ ...editCriatura, urlImage: e.target.value })}
      />

      <label htmlFor="mundo">Mundo:</label>
      <select
        id="mundo"
        value={editCriatura.mundo ? editCriatura.mundo.id : ''}
        onChange={(e) => {
          const selectedMundo = mundos.find(mundo => mundo.id === parseInt(e.target.value));
          setEditCriatura({ ...editCriatura, mundo: selectedMundo });
        }}
      >
        <option value="">Selecione um mundo</option>
        {mundos.map((mundo) => (
          <option key={mundo.id} value={mundo.id}>
            {mundo.nome}
          </option>
        ))}
      </select>

      <label htmlFor="tipoCriatura">Tipo de Criatura:</label>
      <select
        id="tipoCriatura"
        value={editCriatura.tipoCriatura ? editCriatura.tipoCriatura.id : ''}
        onChange={(e) => {
          const selectedTipoCriatura = tipoCriaturas.find(tipo => tipo.id === parseInt(e.target.value));
          setEditCriatura({ ...editCriatura, tipoCriatura: selectedTipoCriatura });
        }}
      >
        <option value="">Selecione um tipo</option>
        {tipoCriaturas.map((tipo) => (
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

export default CriaturaAdminListagem;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../config/axios';
import '../../../styles/pages/admin/Listagem/CriaturasAdminListagem.css';

function CriaturaAdminListagem() {
  const [criaturas, setCriaturas] = useState([]);
  const [mundos, setMundos] = useState([]);
  const [tiposCriatura, setTiposCriatura] = useState([]);
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
        // Buscar mundos da API
        const mundosResponse = await axios.get(`${BASE_URL}/mundos`);
        setMundos(mundosResponse.data);

        // Buscar tipos de criatura da API
        const tiposCriaturaResponse = await axios.get(`${BASE_URL}/tiposCriaturas`);
        setTiposCriatura(tiposCriaturaResponse.data);
      } catch (error) {
        console.error('Erro ao buscar Mundos ou Tipos de Criatura:', error);
      }
    };

    fetchMundosETipos();
  }, []);

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
      <div className="view-all-button">
            <Link to="/criaturasAdmin">Cadastrar nova Criatura</Link>
            <Link to="/criaturasAdmin">Cadastrar novo Tipo de Criatura</Link>
      </div>
      <div className="criaturas-list">
        {criaturas.map((criatura) => (
          <div key={criatura.id} className="criatura-item">
            <img src={criatura.urlImage} alt={criatura.nome} />
            <h3>{criatura.nome || 'Nome não disponível'}</h3>
            <p>Descrição: {criatura.descricao || 'Descrição não disponível'}</p>
            <div className="action-buttons">
               <button className="edit-button" onClick={() => handleEditCriatura(criatura)}>Editar</button>
               <button className="delete-button" onClick={() => handleDeleteCriatura(criatura.id)}>Excluir</button>
            </div>
          </div>
        ))}
       
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
              value={editCriatura.mundo || ''}
              onChange={(e) => setEditCriatura({ ...editCriatura, mundo: e.target.value })}
            >
              <option value="">Selecione um mundo</option>
              {mundos.map((mundo) => (
                <option key={mundo.id} value={mundo.nome}>
                  {mundo.nome}
                </option>
              ))}
            </select>

            {/* Select para o Tipo de Criatura */}
            <label htmlFor="tipoCriatura">Tipo de Criatura:</label>
            <select
              id="tipoCriatura"
              value={editCriatura.tipoCriatura || ''}
              onChange={(e) => setEditCriatura({ ...editCriatura, tipoCriatura: e.target.value })}
            >
              <option value="">Selecione um tipo</option>
              {tiposCriatura.map((tipo) => (
                <option key={tipo.id} value={tipo.nome}>
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

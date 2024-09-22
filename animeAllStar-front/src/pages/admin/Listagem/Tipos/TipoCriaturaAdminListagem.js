import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../config/axios';
import '../../../../styles/pages/admin/Listagem/Tipos/TipoCriaturasAdminListagem.css';

function TipoCriaturaAdminListagem() {
  const [tipoCriaturas, setTipoCriaturas] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Valor da busca
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTipoCriatura, setEditTipoCriatura] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTipoCriaturas = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tipoCriaturas`);
        setTipoCriaturas(response.data);
      } catch (error) {
        console.error('Erro ao buscar Tipo de Criaturas:', error);
      }
    };
    fetchTipoCriaturas();
  }, []);

  

  // Função de busca em tempo real
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtrando as criaturas com base na busca
  const filteredTipoCriaturas = tipoCriaturas.filter((tipoCriatura) =>
    tipoCriatura.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteTipoCriatura = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tipoCriaturas/${id}`);
      setTipoCriaturas(tipoCriaturas.filter((tipoCriatura) => tipoCriatura.id !== id));
    } catch (error) {
      console.error('Erro ao excluir Tipo deCriatura:', error);
    }
  };

  const handleEditTipoCriatura = (tipoCriatura) => {
    setEditTipoCriatura(tipoCriatura);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${BASE_URL}/tipoCriaturas/${editTipoCriatura.id}`, editTipoCriatura);
      setTipoCriaturas(
        tipoCriaturas.map((tipoCriatura) =>
            tipoCriatura.id === editTipoCriatura.id ? editTipoCriatura : tipoCriatura
        )
      );
      setIsModalOpen(false);
      setEditTipoCriatura(null);
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditTipoCriatura(null);
  };

  return (
    <div className="tipoCriaturas-admin-listagem-container">
      <h1>Lista de Todos os Tipos de Criaturas</h1>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar tipo de criatura pelo nome"
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="view-all-button">
        <Link to="/tipoCriaturasAdmin">Cadastrar novo Tipo de Criatura</Link>
        <Link to="/criaturasAdminListagem">Voltar</Link>
        
      </div>

      <div className="tipoCriaturas-list">
        {filteredTipoCriaturas.length > 0 ? (
          filteredTipoCriaturas.map((tipoCriatura) => (
            <div key={tipoCriatura.id} className="tipoCriatura-item">
              
              <h3>{tipoCriatura.nome || 'Nome não disponível'}</h3>
              <p>Descrição: {tipoCriatura.descricao || 'Descrição não disponível'}</p>
              <div className="action-buttons">
                <button className="edit-button" onClick={() => handleEditTipoCriatura(tipoCriatura)}>
                  Editar
                </button>
                <button className="delete-button" onClick={() => handleDeleteTipoCriatura(tipoCriatura.id)}>
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum tipo de criatura encontrado.</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Editar tipo de criatura</h2>
      <label htmlFor="nome">Nome do tipo de criatura:</label>
      <input
        type="text"
        id="nome"
        value={editTipoCriatura.nome}
        onChange={(e) => setEditTipoCriatura({ ...editTipoCriatura, nome: e.target.value })}
      />

      <label htmlFor="descricao">Descrição de Tipo de Criatura:</label>
      <textarea
        id="descricao"
        value={editTipoCriatura.descricao}
        onChange={(e) => setEditTipoCriatura({ ...editTipoCriatura, descricao: e.target.value })}
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

export default TipoCriaturaAdminListagem;

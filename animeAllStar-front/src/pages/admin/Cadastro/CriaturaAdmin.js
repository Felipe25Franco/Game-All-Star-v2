import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../config/axios';
//import '../../../styles/pages/admin/Cadastro/CriaturasAdmin.css';

function CriaturasAdmin() {
  const [criaturas, setCriaturas] = useState([]);
  const [tiposCriatura, setTiposCriatura] = useState([]);
  const [mundos, setMundos] = useState([]);

  const [newCriatura, setNewCriatura] = useState({ nome: '', descricao: '', invocacao: false, tipoCriatura: '', mundo: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editCriaturaId, setEditCriaturaId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCriaturas = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/criaturas`);
        setCriaturas(response.data || []);
      } catch (error) {
        console.error('Erro ao buscar criaturas:', error);
      }
    };
    fetchCriaturas();
  }, []);

  useEffect(() => {
    const fetchTiposCriatura = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tipoCriaturas`);
        setTiposCriatura(response.data || []);
      } catch (error) {
        console.error('Erro ao buscar tipos de criatura:', error);
      }
    };
    fetchTiposCriatura();
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

  const handleAddCriatura = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/criaturas`, newCriatura);
      setCriaturas([...criaturas, response.data]);
      handleClearForm();
    } catch (error) {
      console.error('Erro ao adicionar criatura:', error);
    }
  };

  const handleClearForm = () => {
    setNewCriatura({ nome: '', descricao: '', invocacao: false, tipoCriatura: '', mundo: '' });
    setIsEditing(false);
    setEditCriaturaId(null);
  };

  const handleEditCriatura = (id) => {
    const criaturaToEdit = criaturas.find((criatura) => criatura.id === id);
    if (criaturaToEdit) {
      setNewCriatura({
        nome: criaturaToEdit.nome,
        descricao: criaturaToEdit.descricao || '',
        invocacao: criaturaToEdit.invocacao || false,
        tipoCriatura: criaturaToEdit.tipoCriatura ? criaturaToEdit.tipoCriatura.id : '',
        mundo: criaturaToEdit.mundo ? criaturaToEdit.mundo.id : '',
      });
      setIsEditing(true);
      setEditCriaturaId(id);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/criaturas/${editCriaturaId}`, newCriatura);
      setCriaturas(
        criaturas.map((criatura) =>
          criatura.id === editCriaturaId ? { id: editCriaturaId, ...newCriatura } : criatura
        )
      );
      handleClearForm();
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  const handleDeleteCriatura = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/criaturas/${id}`);
      setCriaturas(criaturas.filter((criatura) => criatura.id !== id));
    } catch (error) {
      console.error('Erro ao excluir criatura:', error);
    }
  };

  return (
    <div className="criaturas-admin-container">
      <h1>Cadastro de Criaturas</h1>
      <div className="admin-layout">
        <div className="form-container">
          <form onSubmit={isEditing ? handleSaveEdit : handleAddCriatura}>
            <label htmlFor="nome">Nome da Criatura:</label>
            <input
              type="text"
              id="nome"
              value={newCriatura.nome}
              onChange={(e) => setNewCriatura({ ...newCriatura, nome: e.target.value })}
              required
            />

            <label htmlFor="descricao">Descrição da Criatura:</label>
            <input
              type="text"
              id="descricao"
              value={newCriatura.descricao}
              onChange={(e) => setNewCriatura({ ...newCriatura, descricao: e.target.value })}
            />

            <label htmlFor="invocacao">Pode ser invocada?</label>
            <input
              type="checkbox"
              id="invocacao"
              checked={newCriatura.invocacao}
              onChange={(e) => setNewCriatura({ ...newCriatura, invocacao: e.target.checked })}
            />

            <label htmlFor="tipoCriatura">Tipo de Criatura:</label>
            <select
              id="tipoCriatura"
              value={newCriatura.tipoCriatura}
              onChange={(e) => setNewCriatura({ ...newCriatura, tipoCriatura: e.target.value })}
              required
            >
              <option value="">Selecione um tipo de criatura</option>
              {tiposCriatura.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nome}
                </option>
              ))}
            </select>

            <label htmlFor="mundo">Mundo:</label>
            <select
              id="mundo"
              value={newCriatura.mundo}
              onChange={(e) => setNewCriatura({ ...newCriatura, mundo: e.target.value })}
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
              <button type="submit">{isEditing ? 'Salvar Alterações' : 'Cadastrar Criatura'}</button>
              <button type="button" onClick={handleClearForm}>Limpar Dados</button>
            </div>
          </form>
        </div>

        <div className="criaturas-list-container">
          <h2>Criaturas Cadastradas</h2>
          <div className="criaturas-list">
            {criaturas.slice(0, 3).map((criatura) => (
              <div key={criatura.id} className="criatura-item">
                <div className="criatura-details">
                  <h3>{criatura.nome || 'Nome não disponível'}</h3>
                  <p>Descrição: {criatura.descricao || 'Descrição não disponível'}</p>
                  <p>Invocação: {criatura.invocacao ? 'Sim' : 'Não'}</p>
                  <p>Tipo: {criatura.tipoCriatura ? criatura.tipoCriatura.nome : 'Tipo não disponível'}</p>
                  <p>Mundo: {criatura.mundo ? criatura.mundo.nome : 'Mundo não disponível'}</p>
                </div>

                <div className="action-buttons">
                  <button onClick={() => handleEditCriatura(criatura.id)}>Editar</button>
                  <button onClick={() => handleDeleteCriatura(criatura.id)}>Excluir</button>
                </div>
              </div>
            ))}
            {criaturas.length > 3 && (
              <div className="view-all-button">
                <Link to="/admin/criaturas">Ver Todas as Criaturas</Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default CriaturasAdmin;

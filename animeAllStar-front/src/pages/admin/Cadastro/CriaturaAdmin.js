import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../config/axios';
import '../../../styles/pages/admin/Cadastro/CriaturasAdmin.css';

function CriaturasAdmin() {
  const [criaturas, setCriaturas] = useState([]);
  const [tiposCriatura, setTiposCriatura] = useState([]);
  const [mundos, setMundos] = useState([]);

  const [newCriatura, setNewCriatura] = useState({
    nome: '',
    urlImage: '',
    descricao: '',
    invocacao: false,
    tipoCriatura: '',
    mundo: ''
  });

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

    const criaturaParaEnviar = {
      nome: newCriatura.nome,
      urlImage: newCriatura.urlImage,
      descricao: newCriatura.descricao,
      invocacao: newCriatura.invocacao,
      idTipoCriatura: parseInt(newCriatura.tipoCriatura),
      idMundo: parseInt(newCriatura.mundo)
    };

    try {
      const response = await axios.post(`${BASE_URL}/criaturas`, criaturaParaEnviar);
      setCriaturas([...criaturas, response.data]);
      setNewCriatura({
        nome: '',
        urlImage: '',
        descricao: '',
        invocacao: false,
        tipoCriatura: '',
        mundo: ''
      });
      navigate('/criaturasAdminListagem');
    } catch (error) {
      console.error('Erro ao adicionar criatura:', error);
    }
  };

  const handleClearForm = () => {
    setNewCriatura({
      nome: '',
      urlImage: '',
      descricao: '',
      invocacao: false,
      tipoCriatura: '',
      mundo: ''
    });
    setIsEditing(false);
    setEditCriaturaId(null);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    const criaturaParaEnviar = {
      nome: newCriatura.nome,
      urlImage: newCriatura.urlImage,
      descricao: newCriatura.descricao,
      invocacao: newCriatura.invocacao,
      idTipoCriatura: parseInt(newCriatura.tipoCriatura),
      idMundo: parseInt(newCriatura.mundo)
    };

    try {
      await axios.put(`${BASE_URL}/criaturas/${editCriaturaId}`, criaturaParaEnviar);
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

            <label htmlFor="urlImage">URL da Imagem da Criatura:</label>
            <input
              type="text"
              id="urlImage"
              value={newCriatura.urlImage}
              onChange={(e) => setNewCriatura({ ...newCriatura, urlImage: e.target.value })}
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
      </div>
    </div>
  );
}

export default CriaturasAdmin;

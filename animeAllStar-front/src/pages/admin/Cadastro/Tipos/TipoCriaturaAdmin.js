import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../config/axios';
import '../../../../styles/pages/admin/Cadastro/CriaturasAdmin.css';

function TipoCriaturasAdmin() {
  const [tipoCriaturas, setTipoCriaturas] = useState([]); 
  const [newTipoCriatura, setNewTipoCriatura] = useState({ nome: '', descricao: '',});
  const [isEditing, setIsEditing] = useState(false);
  const [editTipoCriaturaId, setEditTipoCriaturaId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTipoCriaturas = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tipoCriaturas`);
        setTipoCriaturas(response.data || []);
      } catch (error) {
        console.error('Erro ao buscar criaturas:', error);
      }
    };
    fetchTipoCriaturas();
  }, []);

 

 

  const handleAddTipoCriatura = async (e) => {
    e.preventDefault();
    

  
    try {
      const response = await axios.post(`${BASE_URL}/tipoCriaturas`, newTipoCriatura);
      setTipoCriaturas([...tipoCriaturas, response.data]);
      setNewTipoCriatura({nome: '', descricao: '',});
      navigate('/criaturasAdminListagem');
    } catch (error) {
      console.error('Erro ao adicionar criatura:', error);
    }
  };

  const handleClearForm = () => {
    setNewTipoCriatura({ nome: '', descricao: ''});
    setIsEditing(false);
    setEditTipoCriaturaId(null);
  };

  

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/tipoCriaturas/${editTipoCriaturaId}`, newTipoCriatura);
      setTipoCriaturas(
        tipoCriaturas.map((tipoCriatura) =>
            tipoCriatura.id === editTipoCriaturaId ? { id: editTipoCriaturaId, ...newTipoCriatura } : tipoCriatura
        )
      );
      handleClearForm();
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  

  return (
    <div className="criaturas-admin-container">
      <h1>Cadastro de Tipo de Criatura</h1>
      <div className="admin-layout">
        <div className="form-container">
          <form onSubmit={isEditing ? handleSaveEdit : handleAddTipoCriatura}>
            <label htmlFor="nome">Nome do Tipo de Criatura:</label>
            <input
              type="text"
              id="nome"
              value={newTipoCriatura.nome}
              onChange={(e) => setNewTipoCriatura({ ...newTipoCriatura, nome: e.target.value })}
              required
            />
            

            <label htmlFor="descricao">Descrição do Tipo de Criatura:</label>
            <input
              type="text"
              id="descricao"
              value={newTipoCriatura.descricao}
              onChange={(e) => setNewTipoCriatura({ ...newTipoCriatura, descricao: e.target.value })}
            />

            
              

              

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

export default TipoCriaturasAdmin;

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importando Axios para requisições HTTP
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../config/axios'; // Importa a constante BASE_URL
import '../../../styles/pages/admin/Cadastro/MundosAdmin.css';

function MundosAdmin() {
  const [mundos, setMundos] = useState([]);
  const [newMundo, setNewMundo] = useState({ nome: '', descricao: '', urlImage: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editMundoId, setEditMundoId] = useState(null);

  // Função para buscar mundos do backend
  useEffect(() => {
    const fetchMundos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/mundos`);
        setMundos(response.data); // Supondo que o backend retorne um array de mundos
      } catch (error) {
        console.error('Erro ao buscar mundos:', error);
      }
    };
    fetchMundos();
  }, []);

  // Função para cadastrar um novo mundo no backend
  const handleAddMundo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/mundos`, newMundo);
      setMundos([...mundos, response.data]); // Atualiza a lista de mundos com o novo mundo
      setNewMundo({ nome: '', descricao: '', urlImage: '' });
    } catch (error) {
      console.error('Erro ao adicionar mundo:', error);
    }
  };

  // Função para limpar os dados do formulário
  const handleClearForm = () => {
    setNewMundo({ nome: '', descricao: '', urlImage: '' });
    setIsEditing(false);
    setEditMundoId(null);
  };

  // Função para editar um mundo existente
  const handleEditMundo = (id) => {
    const mundoToEdit = mundos.find((mundo) => mundo.id === id);
    setNewMundo({ nome: mundoToEdit.nome, descricao: mundoToEdit.descricao, urlImage: mundoToEdit.urlImage });
    setIsEditing(true);
    setEditMundoId(id);
  };

  // Função para salvar o mundo editado no backend
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/mundos/${editMundoId}`, newMundo);
      setMundos(
        mundos.map((mundo) =>
          mundo.id === editMundoId ? { id: editMundoId, ...newMundo } : mundo
        )
      );
      setNewMundo({ nome: '', descricao: '', urlImage: '' });
      setIsEditing(false);
      setEditMundoId(null);
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  // Função para excluir um mundo no backend
  const handleDeleteMundo = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/mundos/${id}`);
      setMundos(mundos.filter((mundo) => mundo.id !== id));
    } catch (error) {
      console.error('Erro ao excluir mundo:', error);
    }
  };

  return (
    <div className="mundos-admin-container">
      <h1>Administração de Mundos</h1>
      <div className="admin-layout">
        {/* Formulário para cadastrar ou editar mundos */}
        <div className="form-container">
          <form onSubmit={isEditing ? handleSaveEdit : handleAddMundo}>
            <label htmlFor="nome">Nome do Mundo:</label>
            <input
              type="text"
              id="nome"
              value={newMundo.nome}
              onChange={(e) => setNewMundo({ ...newMundo, nome: e.target.value })}
              required
            />

            <label htmlFor="descricao">Descrição do Mundo:</label>
            <textarea
              id="descricao"
              value={newMundo.descricao}
              onChange={(e) => setNewMundo({ ...newMundo, descricao: e.target.value })}
              required
            />

            <label htmlFor="urlImage">URL da Imagem do Mundo:</label>
            <input
              type="text"
              id="urlImage"
              value={newMundo.urlImage}
              onChange={(e) => setNewMundo({ ...newMundo, urlImage: e.target.value })}
              required
            />

            <div className="buttons-container">
              <button type="submit">{isEditing ? 'Salvar Alterações' : 'Cadastrar Mundo'}</button>
              <button type="button" onClick={handleClearForm}>Limpar Dados</button>
            </div>
          </form>
        </div>

        {/* Lista de mundos cadastrados */}
        <div className="mundos-list-container">
          <h2>Mundos Cadastrados</h2>
          <div className="mundos-list">
            {mundos.slice(0, 4).map((mundo) => (
              <div key={mundo.id} className="mundo-item">
                <img src={mundo.urlImage} alt={mundo.nome} />
                <h3>{mundo.nome}</h3>

                <div className="action-buttons">
                  <button onClick={() => handleEditMundo(mundo.id)}>Editar</button>
                  <button onClick={() => handleDeleteMundo(mundo.id)}>Excluir</button>
                </div>
              </div>
            ))}
            {/* Botão para ver todos os itens */}
                        {mundos.length > 4 && (
                            <div className="view-all-button">
                                <Link to="/mundosAdminListagem">Ver Todos os Mundos</Link>
                            </div>
                        )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MundosAdmin;

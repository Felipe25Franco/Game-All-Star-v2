import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../config/axios';
import '../../../styles/pages/admin/Cadastro/MundosAdmin.css';

function MundosAdmin() {
    const [mundos, setMundos] = useState([]);
    const [newMundo, setNewMundo] = useState({ nome: '', descricao: '', urlImage: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editMundoId, setEditMundoId] = useState(null);


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


    const handleAddMundo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/mundos`, newMundo);
            setMundos([...mundos, response.data]);
            setNewMundo({ nome: '', descricao: '', urlImage: '' });
        } catch (error) {
            console.error('Erro ao adicionar mundo:', error);
        }
    };


    const handleClearForm = () => {
        setNewMundo({ nome: '', descricao: '', urlImage: '' });
        setIsEditing(false);
        setEditMundoId(null);
    };


    const handleEditMundo = (id) => {
        const mundoToEdit = mundos.find((mundo) => mundo.id === id);
        setNewMundo({ nome: mundoToEdit.nome, descricao: mundoToEdit.descricao, urlImage: mundoToEdit.urlImage });
        setIsEditing(true);
        setEditMundoId(id);
    };


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


            
      </div>
    </div>
  );
}

export default MundosAdmin;

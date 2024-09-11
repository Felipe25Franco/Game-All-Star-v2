import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importando Axios para requisições HTTP
import { BASE_URL } from '../../../config/axios'; // Importa a constante BASE_URL
import '../../../styles/pages/admin/Listagem/MundosAdminListagem.css'; // Adapte conforme necessário

function MundosAdminListagem() {
  const [mundos, setMundos] = useState([]);

  // Função para buscar todos os mundos do backend
  useEffect(() => {
    const fetchMundos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/mundos`);
        setMundos(response.data || []); // Garantir que response.data seja um array
      } catch (error) {
        console.error('Erro ao buscar mundos:', error);
      }
    };
    fetchMundos();
  }, []);

  // Função para excluir um mundo no backend
  const handleDeleteMundo = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/mundos/${id}`);
      setMundos(mundos.filter((mundo) => mundo.id !== id)); // Remove o mundo excluído da lista
    } catch (error) {
      console.error('Erro ao excluir mundo:', error);
    }
  };

  return (
    <div className="mundos-admin-listagem-container">
      <h1>Lista de Todos os Mundos</h1>
      <div className="mundos-list">
        {mundos.map((mundo) => (
          <div key={mundo.id} className="mundo-item">
            <h3>{mundo.nome || 'Nome não disponível'}</h3>
            <p>Descrição: {mundo.descricao || 'Descrição não disponível'}</p>
            <div className="action-buttons">
              <button onClick={() => handleDeleteMundo(mundo.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MundosAdminListagem;

import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

    useEffect(() => {
      api.get('repositories').then(response => {
        setRepositories(response.data);
      });
    }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Novo Repositorio',
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(index) {
    const response = Array.from(repositories);

    response.splice(index, 1);

    setRepositories(response);
     
  }

  return (
    <>
      <ul data-testid="repository-list">
        
          {repositories.map(repository => <li key={repository.id}>{repository.title}</li>)}
          
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    
      <button onClick={handleRemoveRepository}>Remover</button>
    </>
  );
}

export default App;

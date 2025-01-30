import React, { useState, useEffect } from 'react';
import fetchData from '../services/Api';
import Form from '../components/Form';

const ScorePage = () => {
  const [features, setFeatures] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    // Obtener las características desde el backend
    fetchData.get('/features')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setFeatures(response.data);
        } else {
          console.error('Error: La respuesta de la API no es un array');
        }
      })
      .catch((error) => console.error('Error fetching features:', error));
  }, []);

  const handleFormSubmit = (formData) => {
    // Enviar datos al backend para calcular el score
    fetchData.post('/score', { features: formData })
      .then((response) => {
        setScore(response.data.score);
      })
      .catch((error) => console.error('Error calculating score:', error));
  };

  return (
    <div>
      <h1>Calculadora de Score</h1>
      <Form features={features} onSubmit={handleFormSubmit} />
      {score !== null && <p>Score: {score}</p>}
    </div>
  );
};

export default ScorePage;
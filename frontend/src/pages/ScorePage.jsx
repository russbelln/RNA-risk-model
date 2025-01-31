import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import fetchData from '../services/Api';
import StepForm from '../components/StepForm';
import ScoreGauge from '../components/ScoreGauge';
import './ScorePage.css'; // Importa el archivo CSS

const ScorePage = () => {
  const [features, setFeatures] = useState([]);
  const [score, setScore] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        setIsModalVisible(true); // Mostrar el modal cuando se reciba el score
      })
      .catch((error) => console.error('Error calculating score:', error));
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h1 className="score-page-header">Loan Risk calculator</h1>
      <StepForm features={features} onSubmit={handleFormSubmit} />
      <Modal
        title="Score Result"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
        width={600} // Ajusta el ancho del modal
      >
        {score !== null && <ScoreGauge score={score} width={500} height={500} />} {/* Ajusta el tamaño del gráfico */}
      </Modal>
    </div>
  );
};

export default ScorePage;
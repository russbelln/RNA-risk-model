import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import iconHome from '../assets/radar.png';
import './HomeButton.css';

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      type="primary"
      ghost
      onClick={() => navigate('/')}
      className="custom-home-button"
    >
      <img src={iconHome} alt="Home Icon" />
      RiskRadar
    </Button>
  );
};

export default HomeButton;

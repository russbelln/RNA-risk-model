import React from 'react';
import './Home.css';
import { Button } from 'antd';

const githubUsers = [
  { username: 'russbelln', profileUrl: 'https://github.com/russbelln' },
  { username: 'fmunoze', profileUrl: 'https://github.com/fmunoze' },
  { username: 'Rypsor', profileUrl: 'https://github.com/Rypsor' },
  { username: 'psga', profileUrl: 'https://github.com/psga' },
];

const Home = () => {
  return (
    <div className="video-background">
      {/* Video de fondo */}
      <video autoPlay muted loop>
        <source src="./src/assets/tmoney.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Contenido principal */}
      <div className="content">
        <h1>Welcome to RiskRadar</h1>
        <p>Evalúa y visualiza tus datos fácilmente.</p>
      </div>

      {/* Botón centrado */}
      <div className="test-button-container">
        <Button
          shape='round'
          className="test-button"
          onClick={() => alert('Button Clicked')}
        >
          Watch video
        </Button>
      </div>

      {/* Avatares centrados abajo */}
      <div className="avatar-container">
        <p className="creators-text">Maintainers:</p>
        <div className="avatar-row">
          {githubUsers.map((user) => (
            <a
              href={user.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              key={user.username}
              className="avatar-link"
            >
              <img
                src={`https://github.com/${user.username}.png`}
                alt={user.username}
                className="avatar-img"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

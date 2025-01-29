import React, { useState } from 'react';
import './Home.css';
import { Button } from 'antd';
import ReactPlayer from 'react-player';

const githubUsers = [
  { username: 'russbelln', profileUrl: 'https://github.com/russbelln' },
  { username: 'fmunoze', profileUrl: 'https://github.com/fmunoze' },
  { username: 'Rypsor', profileUrl: 'https://github.com/Rypsor' },
  { username: 'psga', profileUrl: 'https://github.com/psga' },
];

const Home = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="video-background">
      {/* Video de fondo */}
      <video autoPlay muted loop>
        <source src="/tmoney.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Contenido principal */}
      <div className="content">
        <h1>Welcome to RiskRadar</h1>
        <p>Evalúa y visualiza tus datos .</p>
      </div>

      {/* Botón para mostrar video */}
      <div className="watch-video-button-container">
        <Button
          shape="round"
          className="watch-video-button"
          onClick={() => setShowVideo(true)}
        >
          Watch Video
        </Button>
      </div>

      {/* Avatares */}
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

      {/* Modal del video */}
      {showVideo && (
        <div className="overlay">
          <div className="video-container">
            <button className="close-button" onClick={() => setShowVideo(false)}>
              ✖
            </button>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
              controls
              playing
              width="100%"
              height="100%"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

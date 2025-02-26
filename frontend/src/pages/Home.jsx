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
  const aboutButtonClick = () => {
    window.location.href = 'https://hackmd.io/SGWzmLKLRFeSHm3HpL-1VA'; // Cambia este enlace al que desees
  };
  const codeButtonClick = () => {
    window.location.href = 'https://github.com/russbelln/RNA-risk-model'; // Cambia este enlace al que desees
  };
  return (
    <div className="video-background">
      {/* Video de fondo */}
      <video autoPlay muted loop>
        <source src="/tmoney.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className='home-container'>
      {/* Contenido principal */}
        <div className="content">
          <h1>Unleash the power of risk modeling</h1>
          <p>Assess, predict, and manage risks with precision—powered by data.</p>
          {/* Botón para mostrar video */}
          <div className="watch-video-button-container">
            <Button
              shape="round"
              className="watch-video-button"
              onClick={() => setShowVideo(true)}
            >
              Watch Video
            </Button>
              <Button 
              className='about-button'
              shape="round"
              onClick={aboutButtonClick} style={{ marginLeft: '10px' }}>
                About project
              </Button>
              <Button 
              className='code-button'
              shape="round"
              onClick={codeButtonClick} style={{ marginLeft: '10px' }}>
                Source code
              </Button>
            
              


          </div>
        </div>
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
              url="https://www.youtube.com/watch?v=HrhpWuHZNfY"
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

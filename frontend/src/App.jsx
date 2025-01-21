import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Page2 from './pages/Page2';
import ScorePage from './pages/ScorePage';
import HomeButton from './components/HomeButton'; // Botón reutilizable

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar */}
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

        {/* Contenedor principal */}
        <div style={{ flex: 1, position: 'relative' }}>
          {/* Botón al lado de la sidebar */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: collapsed ? '90px' : '260px',
              zIndex: 3,
              transition: 'left 0.3s ease',
            }}
          >
            <HomeButton />
          </div>

          {/* Rutas */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/score" element={<ScorePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // Certifique-se de criar o arquivo App.css para os estilos
import ndImage from './assets/iconND.png';
import futbol from './assets/futbol.png';
import basketball from './assets/basketball.png';
import f1 from './assets/path8.png';
import mais from './assets/mais.png';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const appRef = useRef(null); // Referência para o elemento raiz da aplicação

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (appRef.current && !appRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    // Adiciona um listener de clique global para fechar o menu
    document.addEventListener('click', handleClickOutside);
    return () => {
      // Remove o listener ao desmontar o componente
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="appi" ref={appRef}>
      <button className="menu-button" onClick={toggleMenu}>
        Abrir Menu
      </button>
      {menuOpen && (
        <div className="menu">
          <button className="menu-item">
            <img src={ndImage} alt="" />
          </button>
          <button className="menu-item">
            <img src={futbol} alt="" />
          </button>
          <button className="menu-item">
            <img src={basketball} alt="" />
          </button>
          <button className="menu-item">
            <img src={f1} alt="" />
          </button>
          <button className="menu-item">
            <img src={mais} alt="" />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

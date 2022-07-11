import React, { useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import ReactAstronault, {
  getAllAstronauts,
  getAstronauts,
} from 'react-astronaut';
import { IoCopyOutline } from 'react-icons/io5';
import { FaUserAstronaut } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [astronauts, setAstronauts] = useState(getAllAstronauts());
  const [search, setSearch] = useState('');

  const copyImport = () => {
    navigator.clipboard.writeText(
      `import ReactAstronault from 'react-astronaut';`
    );
    toast.success(`Copiado com sucesso!`, {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const copyAstronaut = (code) => {
    navigator.clipboard.writeText(`<ReactAstronaut astronaut="${code}" />`);
    toast.success(`Astronauta ${code} copiado!`, {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="App">
      <ToastContainer />

      <div className="header">
        <h1 className="title">
          <FaUserAstronaut style={{ marginRight: 8 }} size={24} />
          React Astronaut
        </h1>
        <div>
          <img
            src="https://img.shields.io/npm/v/react-astronaut.svg?style=flat-square"
            alt="NPM version"
          />
        </div>
        <p>
          A React Astronaut é uma biblioteca que oferece mais de 200 opções de
          avatares de astronautas para você usar em seu projeto.
        </p>

        <div style={{ marginTop: 20 }}>
          <code className="code">
            <span className="codePink">import</span> ReactAstronaut{' '}
            <span className="codePink">from</span>{' '}
            <span className="codeYellow">'react-astronaut'</span>;
            <button
              onClick={copyImport}
              className="iconButton"
              style={{ margin: 5, color: '#fff' }}>
              <IoCopyOutline size={14} />
            </button>
          </code>
        </div>
      </div>

      <div className="body">
        <div className="searchArea">
          <input
            className="input"
            placeholder="🔎 Digite para procurar..."
            value={search}
            onChange={(e) => {
              const nlist = getAstronauts(1, 250, e.target.value);
              console.log(nlist);
              setSearch(e.target.value);
              setAstronauts(nlist.astronauts);
            }}
          />
        </div>
        <div className="imagesArea">
          {astronauts?.map((astronaut) => (
            <div
              key={astronaut.code}
              className="astronautItem"
              onClick={() => copyAstronaut(astronaut.code)}>
              <ReactAstronault
                astronaut={astronaut.code}
                style={{ heigh: 120, width: 120, margin: 5 }}
              />
              <p className="astronautCode">{astronaut.code}</p>
            </div>
          ))}

          {astronauts?.length < 1 && (
            <p className="empty">Nenhum astronauta encontrado...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

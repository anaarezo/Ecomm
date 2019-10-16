import React from 'react';
import logo from './logo.svg';
import './styles/css/App.css';
import SearchBar from './components/searchBar';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <div className="container text-center">
        <h1>Bem-vindo(a) ao Mercado Livre!</h1>
      </div>
    </div>
  );
}

export default App;

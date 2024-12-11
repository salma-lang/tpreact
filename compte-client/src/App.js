import React from "react";
import CompteForm from "./components/CompteForm";
import CompteList from "./components/CompteList";
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Gestion des Comptes</h1>
      <div className="compte-list">
        <CompteList />
      </div>
      <div className="compte-form">
        <CompteForm />
      </div>
    </div>
  );
}

export default App;
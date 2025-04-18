import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import Alert from './components/Alert';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 2000);
  };

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#1e1e1e';
      showAlert("Dark mode activated!", "info");
    } else {
      setMode('light');
      document.body.style.backgroundColor = '#f8f9fa';
      showAlert("Light mode activated!", "info");
    }
  };

  return (
    <Router>
      <Navbar title="TextUtilities" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <div className="container my-4">
        <Routes>
          <Route path="/about" element={<About mode={mode} />} />
          <Route path="/" element={<TextForm showAlert={showAlert} heading="Enhance Your Text Easily!" mode={mode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

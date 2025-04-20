import { Link } from 'react-router-dom';
import React from 'react';

export default function Home(props) {
  const darkStyle = {
    backgroundColor: props.mode === 'dark' ? '#121212' : '#ffffff',
    color: props.mode === 'dark' ? '#fdfdfd' : '#212529',
    minHeight: '70vh',
    padding: '40px',
    borderRadius: '10px',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  };

  return (
    <div className="container text-center mt-5">
        <h1 className={`display-4 fw-bold text-center text-${props.mode === 'dark' ? 'light' : 'dark'}`}>
            Welcome to your AI Assistant
        </h1>
        <p className="lead mt-3"
        style={{ color: props.mode === 'dark' ? '#ced4da' : '#212529' }}>Upload PDFs, get instant summaries, and interact with an AI chatbot!</p>
        <Link to="/analyze" className="btn btn-primary btn-lg mt-3">Get Started</Link>
    </div>
);
}

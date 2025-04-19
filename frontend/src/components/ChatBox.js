import React, { useState } from 'react';
import { useEffect } from 'react';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Display the greeting message when the chatbox is opened
    setMessages([
        { text: '    ...    ', sender: 'bot' }
      ]);
    setTimeout(() => {
      setMessages([
        { text: 'Hello! How can I help you today?', sender: 'bot' }
      ]);
    }, 300);
  }, []); 
  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, from: 'user' }]);
    setInput('');

    // Simulated bot reply
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Hi! I'm a bot here to help ✨", from: 'bot' }]);
    }, 500);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '90px',
      right: '20px',
      width: '300px',
      height: '400px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 999
    }}>
      <div style={{
        flex: 1,
        padding: '10px',
        overflowY: 'auto'
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.from === 'user' ? 'right' : 'left' }}>
            <p style={{
              display: 'inline-block',
              padding: '8px 12px',
              borderRadius: '12px',
              backgroundColor: msg.from === 'user' ? '#0d6efd' : '#e9ecef',
              color: msg.from === 'user' ? '#fff' : '#000',
              marginBottom: '8px',
              maxWidth: '75%'
            }}>
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            marginRight: '8px'
          }}
        />
        <button onClick={sendMessage} style={{
          padding: '8px 12px',
          backgroundColor: '#0d6efd',
          border: 'none',
          color: 'white',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

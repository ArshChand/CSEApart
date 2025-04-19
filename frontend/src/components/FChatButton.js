import React, { useState } from 'react';
import ChatBox from './ChatBox';

const FloatingChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChatBox = () => setIsChatOpen(!isChatOpen);

  return (
    <>
      <button
        onClick={toggleChatBox}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#0d6efd',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        💬
      </button>
      {isChatOpen && <ChatBox />}
    </>
  );
};

export default FloatingChatButton;

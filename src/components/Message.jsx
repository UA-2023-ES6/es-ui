import React from 'react';

const Message = ({ username, content, timestamp }) => {
  return (
    <div style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <strong>{username}</strong>
        <small style={{ fontSize: '10px' }}>{timestamp.toLocaleString()}</small>
      </div>
      <p>{content}</p>
    </div>
  );
};

export {Message};

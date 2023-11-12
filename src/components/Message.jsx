import React from 'react';

const Message = ({ content, createDate, username }) => {
  //console.log("createDate inside Message:",createDate)
  return (
    <div style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <strong>{username}</strong>
        <small style={{ marginLeft: '4px', fontSize: '10px' }}>{createDate.toLocaleString()}</small>
      </div>
      <p style={{ wordWrap: 'break-word' }}>{content}</p>
    </div>
  );
};

export { Message };

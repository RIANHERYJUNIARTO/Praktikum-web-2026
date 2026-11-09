import React from 'react';

function ProyekCard({ judul, deskripsi, teknologi }) {
  return (
    <div style={{
      border: '1px solid #E1E4E8',
      borderRadius: '8px',
      padding: '18px',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <h3 style={{ margin: '0 0 8px 0', color: '#1B365D', fontSize: '16px' }}>{judul}</h3>
        <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#555', lineHeight: '1.5' }}>
          {deskripsi}
        </p>
      </div>

      {/* Render tagar teknologi */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {teknologi.map((tech, index) => (
          <span key={index} style={{
            backgroundColor: '#EEF2F6',
            color: '#1B365D',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '600'
          }}>
            #{tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProyekCard;
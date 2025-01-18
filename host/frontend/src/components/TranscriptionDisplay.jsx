function ASRInterface() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f0f9ff',
      padding: '2rem' 
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '2rem',
          background: 'linear-gradient(to right, #2563eb, #0891b2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Whosper
        </h1>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <button style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}>
            <span>Start Recording</span>
          </button>

          <button style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'white',
            color: '#2563eb',
            borderRadius: '8px',
            border: '2px solid #2563eb',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}>
            <span>Upload Audio</span>
          </button>
        </div>

        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          padding: '1.5rem',
          minHeight: '200px'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            Transcription
          </h2>
          <div style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid #e2e8f0',
            minHeight: '150px'
          }}>
            Transcription will appear here...
          </div>
        </div>
      </div>
    </div>
  );
}

export { ASRInterface };
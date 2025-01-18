import React, { useState, useRef } from 'react';
import { Mic, Upload, Square, Loader2 } from 'lucide-react';

export default function ASRInterface() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      setError('Failed to access microphone');
    }
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        await handleAudioSubmit(audioBlob);
      };
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleAudioSubmit(file);
    }
  };

  const handleAudioSubmit = async (audioBlob) => {
    setIsProcessing(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', audioBlob);
      const response = await fetch('http://localhost:8000/api/v1/transcribe', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Transcription failed');
      }
      const data = await response.json();
      setTranscription(data.transcription);
    } catch (err) {
      setError('Failed to transcribe audio');
    } finally {
      setIsProcessing(false);
    }
  };

  const mainContainerStyle = {
    minHeight: '100vh',
    padding: '2rem',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start'
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden'
  };

  const headerStyle = {
    padding: '2rem',
    borderBottom: '1px solid #e5e7eb',
    background: 'linear-gradient(to right, #f0f9ff, #e0f2fe)',
    textAlign: 'center'
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '2rem'
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: 'none'
  };

  return (
    <div style={mainContainerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #2563eb, #0284c7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Whosper
          </h1>
          <p style={{ color: '#64748b' }}>Advanced Audio Transcription</p>
        </div>

        <div style={{ padding: '2rem' }}>
          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              {error}
            </div>
          )}

          <div style={buttonContainerStyle}>
            <button 
              onClick={isRecording ? stopRecording : startRecording}
              style={{
                ...buttonStyle,
                backgroundColor: isRecording ? '#ef4444' : '#2563eb',
                color: 'white',
                boxShadow: '0 2px 4px rgba(37, 99, 235, 0.1)'
              }}
            >
              {isRecording ? (
                <Square style={{ width: '16px', height: '16px' }} />
              ) : (
                <Mic style={{ width: '16px', height: '16px' }} />
              )}
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>

            <button 
              onClick={() => fileInputRef.current?.click()}
              style={{
                ...buttonStyle,
                backgroundColor: '#f8fafc',
                color: '#2563eb',
                border: '2px solid #2563eb'
              }}
            >
              <Upload style={{ width: '16px', height: '16px' }} />
              Upload Audio
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="audio/*"
              style={{ display: 'none' }}
            />
          </div>

          {isProcessing && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '2rem'
            }}>
              <Loader2 style={{ 
                width: '24px', 
                height: '24px',
                animation: 'spin 1s linear infinite'
              }} />
            </div>
          )}

          <div style={{
            marginTop: '2rem',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '1rem'
            }}>
              Transcription
            </h2>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '1.5rem',
              minHeight: '200px',
              border: '1px solid #e2e8f0',
              color: transcription ? '#1e293b' : '#94a3b8'
            }}>
              {transcription || "Transcription will appear here..."}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
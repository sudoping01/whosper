// frontend/src/components/AudioRecorder.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square } from 'lucide-react';

export const AudioRecorder = ({ isRecording, onStartRecording, onStopRecording }) => {
  return (
    <div className="flex justify-center">
      {!isRecording ? (
        <Button
          onClick={onStartRecording}
          className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          size="lg"
        >
          <Mic className="mr-2 h-4 w-4" />
          Start Recording
        </Button>
      ) : (
        <Button
          onClick={onStopRecording}
          variant="destructive"
          size="lg"
          className="shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Square className="mr-2 h-4 w-4" />
          Stop Recording
        </Button>
      )}
    </div>
  );
};
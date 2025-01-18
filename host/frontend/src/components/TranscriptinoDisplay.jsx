// frontend/src/components/TranscriptionDisplay.jsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

export const TranscriptionDisplay = ({ transcription, isLoading }) => {
  const copyToClipboard = () => {
    if (transcription) {
      navigator.clipboard.writeText(transcription);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Transcription</h3>
        {transcription && (
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="hover:bg-blue-50"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        )}
      </div>
      <div className="bg-white border rounded-lg p-4 min-h-32 text-left">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : transcription ? (
          transcription
        ) : (
          <span className="text-gray-400">Transcription will appear here...</span>
        )}
      </div>
    </Card>
  );
};
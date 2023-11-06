import React from 'react';

interface TranscriptAndChatProps {
  onFetchTranscript: () => void;
  loading: boolean;
  transcript: string;
  error: string;
}

const TranscriptAndChat: React.FC<TranscriptAndChatProps> = ({
  onFetchTranscript,
  loading,
  transcript,
  error,
}) => {
  return (
    <div className="flex flex-row gap-8 flex-1 min-h-0">
      <div className="bg-white shadow overflow-hidden rounded-lg flex-1 min-h-0 flex flex-col">
        <div className="p-4 flex-1">
          <h2 className="font-header text-lg text-center">Video&apos;s Transcript</h2>
          {/* Scrollable container for transcript */}
          <div className="mt-2 overflow-auto text-body scrollbar-thin scrollbar-thumb-primary scrollbar-track-background" style={{ maxHeight: '70vh' }}>
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="whitespace-pre-wrap">{transcript}</div>
            )}
            {error && <div className="text-red-600">{error}</div>}
          </div>
        </div>
        <div className="flex justify-center items-center p-4">
          <button
            onClick={onFetchTranscript}
            className={`p-2 text-white rounded ${loading ? 'bg-gray-500' : 'bg-primary'} ${loading ? 'cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Transcript'}
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg flex-1 min-h-0">
        <div className="p-4 flex flex-col">
          <h2 className="font-header text-lg text-center">Chat</h2>
          <div className="mt-2 overflow-auto text-body scrollbar-thin scrollbar-thumb-primary scrollbar-track-background" style={{ maxHeight: '70vh' }}>
            {/* Chat content */}
          </div>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Ask a question..."
              className="p-2 border rounded w-full"
              // Event handlers and state updates for the chat input will be required
            />
          </div>
        </div>
      </div>
    </div>
  );
};



export default TranscriptAndChat;

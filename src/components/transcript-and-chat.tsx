import React from 'react'

interface TranscriptAndChatProps {
  onFetchTranscript: () => void
  loading: boolean
  transcript: string
  error: string
  onSendChat: () => void
  onChatInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChatInputKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  chatInput: string
  chatLoading: boolean
  chatResponse: string
}

const TranscriptAndChat: React.FC<TranscriptAndChatProps> = ({
  onFetchTranscript,
  loading,
  transcript,
  error,
  onSendChat,
  onChatInputChange,
  onChatInputKeyPress,
  chatInput,
  chatLoading,
  chatResponse,
}) => {
  return (
    <div className='flex flex-row gap-8 flex-1 min-h-0'>
      {/* Transcript Section */}
      <div className='bg-white shadow overflow-hidden rounded-lg flex-1 min-h-0 flex flex-col'>
        <div className='p-4 flex-1'>
          <h2 className='font-header text-lg text-center'>
            Video&apos;s Transcript
          </h2>
          <div
            className='mt-2 overflow-auto text-body scrollbar-thin scrollbar-thumb-primary scrollbar-track-background'
            style={{ maxHeight: '70vh' }}
          >
            {loading ? (
              <div className='flex justify-center items-center h-full'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
              </div>
            ) : (
              <div className='whitespace-pre-wrap'>{transcript}</div>
            )}
            
          </div>
          {error && <div className='text-red-600 mt-4'>{error}</div>}
        </div>
        <div className='flex justify-center items-center p-4'>
          <button
            onClick={onFetchTranscript}
            className={`p-2 text-white rounded ${
              loading ? 'bg-gray-500' : 'bg-primary'
            } ${loading ? 'cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Transcript'}
          </button>
        </div>
      </div>

      {/* Chat Section */}
      <div className='bg-white shadow overflow-hidden rounded-lg flex-1 min-h-0'>
        <div className='p-4 flex flex-col'>
          <h2 className='font-header text-lg text-center'>Chat</h2>
          <div
            className='mt-2 overflow-auto text-body scrollbar-thin scrollbar-thumb-primary scrollbar-track-background'
            style={{ maxHeight: '70vh' }}
          >
            {chatResponse}
          </div>
          <div className='mt-2 flex'>
            <input
              type='text'
              value={chatInput}
              onChange={onChatInputChange}
              onKeyPress={onChatInputKeyPress}
              placeholder='Ask a question...'
              className='p-2 border rounded flex-grow'
            />
            <button
              onClick={onSendChat}
              className='ml-2 bg-primary text-white p-2 rounded inline-flex items-center justify-center disabled:bg-primary-light'
              disabled={chatLoading}
            >
              {chatLoading ? (
                <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white'></div>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.293 15.707a1 1 0 0 1-1.414-1.414L12.586 11H3a1 1 0 1 1 0-2h9.586l-3.707-3.707a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TranscriptAndChat

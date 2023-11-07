import { useState } from 'react'
import TranscriptAndChat from '@/components/transcript-and-chat'
import '../src/styles/globals.css'
import { FaissStore } from 'langchain/vectorstores/faiss'

const App = () => {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('')
  const [apiKey, setApiKey] = useState<string>('')
  const [OpenAIError, setOpenAIError] = useState<string>('')
  const [transcriptError, setTranscriptError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [transcript, setTranscript] = useState<string>('')
  const [chatInput, setChatInput] = useState<string>('')
  const [chatLoading, setChatLoading] = useState<boolean>(false)
  const [chatResponse, setChatResponse] = useState<string>('')
  const [db, setDb] = useState<FaissStore | null>(null)

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setYoutubeUrl(url)
    // Check if the API key is not set when YouTube URL is entered
    if (url && !apiKey) {
      setOpenAIError('Please add your OpenAI API key to continue.')
    } else {
      setOpenAIError('')
    }
  }

  const fetchTranscript = async () => {
    setLoading(true)
    setTranscriptError('')
    try {
      const response = await fetch('/api/createDbFromYoutubeVideoUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl: youtubeUrl }),
      })
      if (response.ok) {
        const data = await response.json()
        console.log("data: ", data)
        const {db: dbData, info} = data
        console.log("dbData: ", dbData)
        setDb(dbData)
        setTranscript(info[0].pageContent)
      } else {
        // Handle errors
        setTranscriptError('Failed to fetch transcript. Please try again.')
      }
    } catch (error) {
      setTranscriptError(`Failed to fetch transcript. ${error}`)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value)
  }

  const sendChat = async () => {
    console.log("entered in sendChat 1")
    console.log("db in sendChat: ", db)
    if (!db) {
      setTranscriptError('Please fetch the transcript first.')
      return
    }
    setChatLoading(true)
    try {
      console.log("entered in sendChat 2")
      // This is where you would call your new API route
      const response = await fetch('/api/getResponseFromQuery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: chatInput,
          db: db,
          k: 4,
          openAIApiKey: apiKey,
        }),
      })

      console.log("response: ", response)

      if (response.ok) {
        const { responseText } = await response.json()
        setChatResponse(responseText)
      } else {
        setOpenAIError('Failed to send chat. Please try again.')
      }
    } catch (error) {
      setOpenAIError(`Failed to send chat. ${error}`)
      console.error(error)
    } finally {
      setChatLoading(false)
    }
  }

  const handleChatInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      console.log("send chat")
      sendChat()
    }
  }

  return (
    <div className='flex flex-col h-screen bg-background text-text'>
      <header className='px-4 py-2 bg-primary text-white'>
        <h1 className='font-header text-2xl text-center'>YouTube Summarizer</h1>
      </header>

      <div className='flex flex-col flex-1 overflow-hidden gap-8 p-4'>
        <main className='flex flex-col flex-1 p-4 overflow-hidden'>
          <div className='flex flex-col md:flex-row gap-20 mb-4'>
            <input
              type='text'
              value={youtubeUrl}
              onChange={handleUrlChange}
              placeholder='Enter YouTube URL'
              className='p-2 border rounded flex-1'
            />
            <input
              type='text'
              value={apiKey}
              onChange={(e) => {
                if (e.target.value) { 
                  setOpenAIError('')
                }
                setApiKey(e.target.value)
              }}
              placeholder='Enter OpenAI API Key'
              className='p-2 border rounded flex-1'
            />
          </div>
          {OpenAIError && <div className='text-red-600'>{OpenAIError}</div>}
          <TranscriptAndChat
            onFetchTranscript={fetchTranscript}
            loading={loading}
            transcript={transcript}
            error={transcriptError}
            onSendChat={sendChat}
            onChatInputChange={handleChatInputChange}
            onChatInputKeyPress={handleChatInputKeyPress}
            chatInput={chatInput}
            chatLoading={chatLoading}
            chatResponse={chatResponse}
          />
        </main>
      </div>
    </div>
  )
}

export default App

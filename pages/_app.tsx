import { useState } from 'react'
import TranscriptAndChat from '@/components/transcript-and-chat'
import '../src/styles/globals.css' // Tailwind CSS

const App = () => {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('')
  const [apiKey, setApiKey] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [transcript, setTranscript] = useState<string>('')

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setYoutubeUrl(url)
    // Check if the API key is not set when YouTube URL is entered
    if (url && !apiKey) {
      setError('Please add your OpenAI API key to continue.')
    } else {
      setError('')
    }
  }

  const fetchTranscript = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/createDbFromYoutubeVideoUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl: youtubeUrl }),
      })
      if (response.ok) {
        const { data } = await response.json()
        const [, info] = data
        console.log('data', info)
        setTranscript(info[0].pageContent)
      } else {
        // Handle errors
        setError('Failed to fetch transcript. Please try again.')
      }
    } catch (error) {
      setError('Failed to fetch transcript. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background text-text">
      <header className="px-4 py-2 bg-primary text-white">
        <h1 className="font-header text-2xl text-center">YouTube Summarizer</h1>
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
              onChange={(e) => setApiKey(e.target.value)}
              placeholder='Enter OpenAI API Key'
              className='p-2 border rounded flex-1'
            />
          </div>
          {error && <div className='text-red-600'>{error}</div>}
          <TranscriptAndChat
            onFetchTranscript={fetchTranscript}
            loading={loading}
            transcript={transcript}
            error={error}
          />
        </main>
      </div>
    </div>
  )
}

export default App

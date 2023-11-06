import { useState } from 'react';
import TranscriptAndChat from '@/components/transcript-and-chat';

const App = () => {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setYoutubeUrl(url);
    // Check if the API key is not set when YouTube URL is entered
    if (url && !apiKey) {
      setError('Please add your OpenAI API key to continue.');
    } else {
      setError('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-text">
      <header className="px-4 py-2 bg-primary text-white">
        <h1 className="font-header text-2xl">YouTube Summarizer</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:block lg:w-60 xl:w-80 p-4 overflow-auto">
          {/* Sidebar Content */}
        </aside>

        <main className="flex flex-col flex-1 p-4 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              value={youtubeUrl}
              onChange={handleUrlChange}
              placeholder="Enter YouTube URL"
              className="p-2 border rounded flex-1"
            />
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter OpenAI API Key"
              className="p-2 border rounded flex-1"
            />
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <TranscriptAndChat />
        </main>
      </div>
    </div>
  );
};

export default App;

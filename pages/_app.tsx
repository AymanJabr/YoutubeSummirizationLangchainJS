import { useState } from 'react';
import TranscriptAndChat from '@/components/transcript-and-chat';

const App = () => {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');

  return (
    <div className="flex flex-col h-screen bg-background text-text">
      <header className="px-4 py-2 bg-primary text-white">
        <h1 className="font-header text-2xl">YouTube Summarizer</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for additional functionality or navigation */}
        <aside className="hidden lg:block lg:w-60 xl:w-80 p-4 overflow-auto">
          {/* Navigation or additional controls can go here */}
        </aside>

        <main className="flex flex-col flex-1 p-4 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
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

          <TranscriptAndChat />
        </main>
      </div>
    </div>
  );
};

export default App;

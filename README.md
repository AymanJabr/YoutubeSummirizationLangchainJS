# YouTube Summarization with Langchain.js

This open-source project leverages Langchain.js to provide a tool for summarizing YouTube videos and an interactive chat feature. It's designed to create concise summaries from YouTube content and allow users to ask questions about the summarized information, making it easier for users to consume and engage with information.

## Features

- Automatically generate summaries from YouTube video transcripts.
- Interactive chat feature to answer questions using the summarized content.
- Use advanced NLP provided by Langchain.js for accurate summarization and information retrieval.
- Open-source for community-driven enhancements and collaborations.

## Getting Started

Clone the repository and install the dependencies to set up your local development environment:

```bash
git clone [https://github.com/AymanJabr/YoutubeSummirizationLangchainJS]
cd ./youtube-assistant-langchain
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```
## Run the development serve

```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Visit [TO be added] to view the application in action.

## Interactive Chat

- In addition to summarization, the application provides an interactive chat interface. This allows you to converse with the application, asking specific questions about the YouTube video's content. The application uses the information it has processed from the video transcript to answer your questions in a conversational manner.

## Testing the Application
- To test the createDbFromYoutubeVideoUrl function without affecting the tsconfig.json, run: `TS_NODE_COMPILER_OPTIONS='{"module":"commonjs"}' ts-node ./src/test-utils.ts`
- Make sure ts-node is installed globally for this to work: `npm i -g ts-node`

## Contributing
- Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1) Fork the Project
2) Create your Feature Branch (git checkout -b feature/AmazingFeature)
3) Commit your Changes (git commit -m 'Add some AmazingFeature')
4) Push to the Branch (git push origin feature/AmazingFeature)
5) Open a Pull Request

## License
Distributed under the MIT License. See [LICENSE](https://opensource.org/license/mit/) for more information.

## Acknowledgements
Special thanks to [rishabkumar7](https://github.com/rishabkumar7) for the project inspiration.
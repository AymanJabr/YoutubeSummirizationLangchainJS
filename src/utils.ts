import { YoutubeLoader } from 'langchain/document_loaders/web/youtube'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { FaissStore } from 'langchain/vectorstores/faiss'
import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import { LLMChain } from 'langchain/chains'

const embeddings = new OpenAIEmbeddings()

export const createDbFromYoutubeVideoUrl = async (
  videoUrl: string
): Promise<any> => {
  const loader = YoutubeLoader.createFromUrl(videoUrl, {
    language: 'en',
    addVideoInfo: true,
  })

  const youtubeInfo = await loader.load()

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
  })
  const docs = await textSplitter.splitDocuments(youtubeInfo)

  const db = FaissStore.fromDocuments(docs, embeddings)
  return [db, youtubeInfo]
}

export const getResponseFromQuery = async (
  db: FaissStore,
  query: string,
  k: number = 4,
  openAIApiKey: string
): Promise<[string, any[]]> => {
  const docs = await db.similaritySearch(query, k)
  const docsPageContent = docs
    .map((d: { pageContent: any }) => d.pageContent)
    .join(' ')

  const llm = new OpenAI({
    modelName: 'text-davinci-003',
    temperature: 0.9,
    openAIApiKey,
  })

  const prompt = new PromptTemplate({
    inputVariables: ['question', 'docs'],
    template: `
    You are a helpful assistant that can answer questions about YouTube videos 
    based on the video's transcript.
    
    Answer the following question: {question}
    By searching the following video transcript: {docs}
    
    Only use the factual information from the transcript to answer the question.
    
    Don't make up any information that isn't in the transcript.
    
    Your answers should be verbose and detailed.
    `,
  })

  const chain = new LLMChain({ llm, prompt })

  console.log('arrived here')

  const response = await chain.call({ question: query, docs: docsPageContent })
  const responseText = response.text.replace('\n', '')
  return [responseText, docs]
}

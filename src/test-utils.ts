// Import the createDbFromYoutubeVideoUrl function from your utils.ts file
import { createDbFromYoutubeVideoUrl, getResponseFromQuery } from './utils'

// Define an async function to test your createDbFromYoutubeVideoUrl
async function testCreateDbFromYoutubeVideoUrl() {
  try {
    // Replace 'video url' with the actual YouTube video URL you want to test
    const db = await createDbFromYoutubeVideoUrl(
      'https://www.youtube.com/watch?v=yIQ4vtTrR7E&ab_channel=DrWaku'
    )
    return db
  } catch (error) {
    console.error('Error creating database from YouTube video:', error)
  }
}

// Define an async function to test your getResponseFromQuery
async function testGetResponseFromQuery(
  dbPromise: any,
  query: string,
  k: number | undefined,
  openAIApiKey: string
) {
  try {
    const db = await dbPromise
    const response = await getResponseFromQuery(db, query, k, openAIApiKey)
    console.log('Response from query:', response)
  } catch (error) {
    console.error('Error getting response from query:', error)
  }
}

// Call the test function
const db = testCreateDbFromYoutubeVideoUrl()

const query = 'What are the disadvantages of going through a singulariy.'

testGetResponseFromQuery(db, query, 4, 'Your OpenAI API key goes here')

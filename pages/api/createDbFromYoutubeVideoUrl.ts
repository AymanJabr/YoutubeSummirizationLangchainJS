import { NextApiRequest, NextApiResponse } from 'next'
import {
  createDbFromYoutubeVideoUrl,
  getResponseFromQuery,
} from '../../src/utils'

// You might need to define the expected structure of the body if it's complex
// For example, if `videoUrl` is always a string, you can define an interface like this:
interface RequestBody {
  videoUrl: string
  query: string
  k: number
  openAIApiKey: string
  queryResponseNeeded: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method === 'POST') {
    try {
      console.log('Received POST request with body:', req.body)
      const {
        videoUrl,
        query,
        k,
        openAIApiKey,
        queryResponseNeeded = false,
      } = req.body as RequestBody

      console.log(
        'Calling createDbFromYoutubeVideoUrl with videoUrl:',
        videoUrl
      )
      const [dbPromise, transcript] = await createDbFromYoutubeVideoUrl(
        videoUrl
      )
      console.log('Database promise and transcript received')

      const db = await dbPromise
      console.log('Database promise resolved')

      if (queryResponseNeeded) {
        console.log('Query response is needed, executing getResponseFromQuery')
        const [responseText] = await getResponseFromQuery(
          db,
          query,
          k,
          openAIApiKey
        )
        console.log('Query response received')
        res.status(200).json({ responseText, transcript })
      }

      res.status(200).json({ responseText: '', transcript })
    } catch (error: any) {
      console.error('Error in API handler:', error)
      res
        .status(500)
        .json({ error: 'Error processing request', details: error.message })
    }
  // } else {
  //   res.setHeader('Allow', ['POST'])
  //   res.status(405).end(`Method ${req.method} Not Allowed`)
  // }
}

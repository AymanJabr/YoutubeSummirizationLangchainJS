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
  if (req.method === 'POST') {
    try {
      const {
        videoUrl,
        query,
        k,
        openAIApiKey,
        queryResponseNeeded = false,
      } = req.body as RequestBody
      const [dbPromise, transcript] = await createDbFromYoutubeVideoUrl(
        videoUrl
      )
      const db = await dbPromise

      if (queryResponseNeeded) {
        const [responseText] = await getResponseFromQuery(
          db,
          query,
          k,
          openAIApiKey
        )
        res.status(200).json({ responseText, transcript })
      }

      res.status(200).json({ responseText: '', transcript })
    } catch (error: any) {
      console.error(error)
      res.status(500).json({ error: 'Error processing request' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

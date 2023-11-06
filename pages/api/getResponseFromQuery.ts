import { getResponseFromQuery } from '../../src/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { query, db, k, openAIApiKey } = req.body
      const [responseText, docs] = await getResponseFromQuery(
        db,
        query,
        k,
        openAIApiKey
      )
      res.status(200).json({ responseText, docs })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error processing request' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import { createDbFromYoutubeVideoUrl } from '../../src/utils';

// You might need to define the expected structure of the body if it's complex
// For example, if `videoUrl` is always a string, you can define an interface like this:
interface RequestBody {
  videoUrl: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { videoUrl } = req.body as RequestBody;
      const [dbPromise, info] = await createDbFromYoutubeVideoUrl(videoUrl);
      const db = await dbPromise
      console.log('db:', db);
      res.status(200).json({ db, info });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Error processing request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

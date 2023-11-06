import { createDbFromYoutubeVideoUrl } from '../../src/utils';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { videoUrl } = req.body;
      const data = await createDbFromYoutubeVideoUrl(videoUrl);
      res.status(200).json({ data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error processing request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

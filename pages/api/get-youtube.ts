import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const channelFetchUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CbrandingSettings%2Cstatistics&id=${id}&key=${process.env.YOUTUBE_API_KEY}`;
  const videoFetchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${id}&maxResults=10&order=date&key=${process.env.YOUTUBE_API_KEY}`;
  const channelData = await axios.get(channelFetchUrl);
  const videoData = await axios.get(videoFetchUrl);

  const requiredData = {
    id: channelData.data.items[0].id,
    title: channelData.data.items[0].snippet.title,
    description: channelData.data.items[0].snippet.description,
    avatar: channelData.data.items[0].snippet.thumbnails.default.url,
    banner: channelData.data.items[0].brandingSettings.image.bannerExternalUrl,
    subscriberCount: channelData.data.items[0].statistics.subscriberCount,
    videoCount: channelData.data.items[0].statistics.videoCount,
    viewCount: channelData.data.items[0].statistics.viewCount,
    videos: videoData.data.items,
  };
  res.json({
    data: requiredData,
  });
}

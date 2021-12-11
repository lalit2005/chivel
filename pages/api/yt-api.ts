import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'libs/prisma';
import { getUser } from '@/utils/getUser';
import { User } from '@supabase/gotrue-js';
import withApiAuthRequired from '@/utils/withApiAuthRequired';
import axios from 'axios';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User | null
) {
  const { id } = req.query;
  const channelFetchUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=${process.env.YOUTUBE_API_KEY}`;
  const channelData = await axios.get(channelFetchUrl);
  console.log(channelData);
  if (channelData.data.pageInfo.totalResults > 0) {
    const requiredData = {
      title: channelData.data.items[0].snippet.title,
      description: channelData.data.items[0].snippet.description,
    };
    res.json(requiredData);
  } else {
    res.status(404).json({ message: 'Channel not found' });
  }
}

export default withApiAuthRequired(handler);

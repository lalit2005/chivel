import { NextApiRequest, NextApiResponse } from 'next';
import withApiAuthRequired from '@/utils/withApiAuthRequired';
import prisma from 'libs/prisma';
import { getUser } from 'utils/getUser';
import { User } from '@supabase/gotrue-js';

async function handler(req: NextApiRequest, res: NextApiResponse, user: User) {
  const { siteName, ytChannelUrl, ogImageUrl } = req.body;
  const newSite = await prisma.ytSites.create({
    data: {
      createdBy: user.id,
      ogImageUrl: ogImageUrl,
      siteName: siteName,
      ytChannelUrl: ytChannelUrl,
    },
  });
  res.json(newSite);
}

export default withApiAuthRequired(handler);

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'libs/prisma';
import { getUser } from '@/utils/getUser';
import { User } from '@supabase/gotrue-js';
import withApiAuthRequired from '@/utils/withApiAuthRequired';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User | null
) {
  const id = user?.id;
  const allSites = await prisma.ytSites.findMany({
    where: {
      createdBy: id,
    },
  });
  res.json(allSites);
}

export default withApiAuthRequired(handler);

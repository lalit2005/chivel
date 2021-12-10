import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'libs/prisma';
import { getUser } from '@/utils/getUser';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await getUser(req);
    if (!data) {
      res.status(401).json({
        message: 'Unauthorized',
      });
    }
    const id = data?.id;
    const allSites = await prisma.ytSites.findMany({
      where: {
        createdBy: id,
      },
    });
    res.json(allSites);
  } catch (e) {
    res.json({
      success: false,
    });
  }
}

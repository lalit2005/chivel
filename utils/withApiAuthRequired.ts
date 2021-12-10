import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getUser } from './getUser';

export type WithApiAuthRequired = (apiRoute: NextApiHandler) => NextApiHandler;

export default function withApiAuthRequired(apiRoute: WithApiAuthRequired) {
  return (apiRoute: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
      const { data: user, error } = await getUser(req);
      if (!user) {
        res.status(401).json({
          error: 'Unauthorized',
          description: { error },
        });
        return;
      }

      await apiRoute(req, res);
    };
}

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getUser } from './getUser';

export type WithApiAuthRequired = (apiRoute: NextApiHandler) => NextApiHandler;
// This doesn't work now, but it's a good idea to have it here in case we want to use it later.
export default function withApiAuthRequired(apiRoute: NextApiHandler) {
  return () =>
    async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
      const { data: user, error } = await getUser(req);
      if (!user) {
        res.status(401).json({
          error: 'Unauthorized',
          description: { error },
        });
      }

      await apiRoute(req, res);
    };
}

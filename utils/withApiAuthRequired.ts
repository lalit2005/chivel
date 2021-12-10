import { User } from '@supabase/gotrue-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from './getUser';

type ApiRoute = (
  req: NextApiRequest,
  res: NextApiResponse,
  data: User
) => Promise<void>;
export default function withApiAuthRequired(apiRoute: ApiRoute) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { data, error } = await getUser(req);
    if (!data) {
      res.status(401).json({
        error: 'Unauthorized',
        description: { error },
      });
    } else {
      return apiRoute(req, res, data);
    }
  };
}

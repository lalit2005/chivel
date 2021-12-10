import supabase from "libs/supabase";
import { NextApiRequest } from "next";

export const getUser = async (req: NextApiRequest) => {
  const { data, error } = await supabase.auth.api.getUserByCookie(req);

  return { data, error };
};

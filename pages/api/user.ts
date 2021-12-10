import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "@/utils/getUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, error } = await getUser(req);
  if (error) {
    res.json({ error: "Not Authenticated" });
  }

  res.json({ user: data });
}

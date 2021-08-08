// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserByUsername } from "../../lib/Database";

type Data = {
  result: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await getUserByUsername(req.body.username);
  if (response) {
    res.status(200).json({ result: response });
  } else {
    res.status(400).json({ result: response });
  }
}

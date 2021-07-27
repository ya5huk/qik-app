// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { registerUser, findUser } from "../../lib/Auth";

type Data = {
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user = await findUser({username: req.body.username, password: req.body.password});
  if(user !== undefined) {
    // User already exists
    res.status(400).json({result: 'failure'});
    return;
  }
  const registerResult = await registerUser(req.body);
  if (registerResult !== undefined) {
    if (registerResult.acknowledged) {
      res.status(200).json({result: 'success'});
    }
    else {
      res.status(400).json({result: 'failure'})
    }
  }
}

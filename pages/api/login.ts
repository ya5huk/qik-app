// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { findUser } from "../../lib/Auth";
import { loginUser, User } from "../../lib/Interfaces";

type Data = {
  user?: User;
};

type Document = {
  id: ObjectId;
  email: string;
  username: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const loginResult: any = await findUser(req.body);

  if (loginResult !== undefined) {
    const returnedUser = {
      id: loginResult._id.toString(),
      username: loginResult.username,
      email: loginResult.email
    };
    res.status(200).json({ user: returnedUser });
  } else {
    res.status(400).json({});
  }
}

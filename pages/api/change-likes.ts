// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as PostsLib from "../../lib/Posts";

type Data = {
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await PostsLib.changeLikesForPost(req.body.post, req.body.amount)
  if(response?.ok) {
    res.status(200).json({ result: "success" });
  }
  else {
    res.status(400).json({ result: "fail" });
  }
  
}

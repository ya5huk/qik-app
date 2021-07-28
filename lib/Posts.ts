import * as Database from "./Database";
import * as Interfaces from "./Interfaces";

export const addPostToDatabase = async (content: string, userId: string) => {
  const client = await Database.connectMongoDB();
  if (client === undefined) {
    return;
  }

  const authorUser = await Database.findUserById(client, userId);
  const post: Interfaces.Post = {
    author: authorUser?.username,
    content: content,
    creationTime: new Date(),
    likesAmount: 0
  };

  const res = await Database.addToCollection(client, "Posts", post);
  client.close();
  return res;
};

export const getPostsFromDatabase = async (bundleNum: number) => {
  const client = await Database.connectMongoDB();
  if (client === undefined) {
    return;
  }
  // 10 posts will be in each bundle
  // bundle 0 1 - 10
  // bundle 1 10 - 20
  // bundle 2 20 - 30
  const res = await Database.getPosts(client, bundleNum);
  
  return res.toArray();
  // Close client !!!!IMPORTANT!!!!
};

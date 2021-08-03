import * as Database from "./Database";
import * as Interfaces from "./Interfaces";

export const addPostToDatabase = async (content: string, userId: string) => {
  const authorUser = await Database.findUserById(userId);
  const post: Interfaces.Post = {
    author: authorUser?.username,
    content: content,
    creationTime: new Date(),
    likesAmount: 0,
    likedList: []
  };

  const res = await Database.addToCollection("Posts", post);
  return res;
};

export const getPostsFromDatabase = async (bundleNum: number) => {
  // 10 posts will be in each bundle
  // bundle 0 1 - 10
  // bundle 1 10 - 20
  // bundle 2 20 - 30
  const res = await Database.getPosts(bundleNum);
  
  const arr = await res.toArray();
  return arr;
  // Close client !!!!IMPORTANT!!!!
};

export const changeLikesForPost = async (post: Interfaces.Post, amount: number, userId: string) => {
  const res = await Database.changePostLikeAmount(post, amount, userId);
  return res;
}

export const getAllPostsId = async () => {
  const postsId = await Database.getAllPostsId();
  return postsId;
}

export const getPostWithId = async (id: any) => {
  const res = await Database.getPostById(id);
  return res;
} 

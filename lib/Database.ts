import { MongoClient, Db, ObjectId } from "mongodb";
import PostsHome from "../pages/posts";
import { Post } from "./Interfaces";

const clientPromise: Promise<MongoClient> | null = MongoClient.connect(
  process.env.DB_URI as string
);
let client: MongoClient | null = null;

export const connectDatabase = async () => {
  if (!client) {
    client = await clientPromise;
  }
  return client.db();
};

export const addToCollection = async (collection: string, addedData: any) => {
  const db = await connectDatabase();
  const usersCollection = db.collection(collection);
  return await usersCollection.insertOne(addedData);
};

export const findInCollection = async (
  collection: string,
  searchedData: any
) => {
  const db = await connectDatabase();
  const usersCollection = db.collection(collection);
  return usersCollection.findOne(searchedData);
};

export const findUserById = async (id: string) => {
  const db = await connectDatabase();
  const usersCollection = db.collection("Users");
  return await usersCollection.findOne({ _id: new ObjectId(id) });
};

export const getPosts = async (bundleNum: number) => {
  const db = await connectDatabase();
  const postsCollection = db.collection("Posts");
  return postsCollection
    .find()
    .skip(10 * bundleNum)
    .limit(10);
};

export const changePostLikeAmount = async (
  post: Post,
  amount: number,
  userId: string
) => {
  const db = await connectDatabase();
  const postsCollection = db.collection("Posts");
  const postToChange: any = (await postsCollection.findOne({
    _id: new ObjectId(post.id),
  })) as Document; // A database post is returned
  // I declare as any to prevent typescript errors

  const query = { _id: new ObjectId(post.id) };
  const updateDocument = {
    $set: {
      likesAmount: postToChange.likesAmount + amount,
      likedList:
        amount > 0
          ? [...postToChange.likedList, userId]
          : postToChange.likedList.filter((id: string) => id !== userId),
    },
  };

  const res = await postsCollection.updateOne(query, updateDocument);
  console.log(res);
  return res;
};

export const getAllPostsId = async () => {
  const db = await connectDatabase();
  const usersCollection = db.collection("Posts");
  const res = await usersCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();
  const userId = res.map((u) => u._id.toString());
  return userId;
};

export const getPostById = async (id: string) => {
  const db = await connectDatabase();
  const usersCollection = db.collection("Posts");
  const res = await usersCollection.findOne({ _id: new ObjectId(id) });
  return res;
};

import { Db, FindOptions, MongoClient, ObjectId } from "mongodb";
import { Post } from "./Interfaces";

// Creating global database:
let client = new MongoClient(process.env.DB_URI as string)
const clientPromise = client.connect();

export const connectMongoDB = async () => {
  try {
    const client = await clientPromise;
    return client;
  } catch (error) {
    console.log("Error while logging in the database ", error);
  }
};

export const addToCollection = async (
  collection: string,
  addedData: any
) => {
  const client = await clientPromise;
  // Add the user to database!
  const db = client.db();
  const usersCollection = db.collection(collection);
  return await usersCollection.insertOne(addedData);
};

export const findInCollection = async (
  collection: string,
  searchedData: any
) => {
  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection(collection);
  return usersCollection.findOne(searchedData);
};

export const findUserById = async (id: string) => {
  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection("Users");
  return await usersCollection.findOne({_id: new ObjectId(id)});
}

export const getPosts = async (bundleNum: number) => {
  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection("Posts");
  return usersCollection.find().skip(10 * bundleNum).limit(10);
}

export const changePostLikeAmount = async (post: Post, amount: number) => {
  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection("Posts");
  const newPost: Post = {...post, likesAmount: post.likesAmount + amount}; // Changing likes here
  const res = await usersCollection.findOneAndReplace({_id: new ObjectId(post.id)}, newPost);
  return res;
} 

export const getAllPostsId = async () => {
  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection("Posts");
  const res = await usersCollection.find({}, {projection: {_id: 1}}).toArray();
  const userId = res.map(u => u._id.toString())
  return userId;
}

export const getPostById = async( id: string) => {
  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection("Posts");
  const res = await usersCollection.findOne({_id: new ObjectId(id)});
  return res;
}
import { Db, FindOptions, MongoClient, ObjectId } from "mongodb";
import { DB_URL, Post } from "./Interfaces";

export const connectMongoDB = async () => {
  try {
    const client = await MongoClient.connect(DB_URL);
    return client;
  } catch (error) {
    console.log("Error while logging in the database ", error);
  }
};

export const addToCollection = async (
  client: MongoClient,
  collection: string,
  addedData: any
) => {
  // Add the user to database!
  const db = client.db();
  const usersCollection = db.collection(collection);
  return await usersCollection.insertOne(addedData);
};

export const findInCollection = async (
  client: MongoClient,
  collection: string,
  searchedData: any
) => {
  const db = client.db();
  const usersCollection = db.collection(collection);
  return usersCollection.findOne(searchedData);
};

export const findUserById = async (client: MongoClient, id: string) => {
  const db = client.db();
  const usersCollection = db.collection("Users");
  return await usersCollection.findOne({_id: new ObjectId(id)});
}

export const getPosts = async (client: MongoClient, bundleNum: number) => {
  const db = client.db();
  const usersCollection = db.collection("Posts");
  return usersCollection.find().skip(10 * bundleNum).limit(10);
}

export const changePostLikeAmount = async (client: MongoClient, post: Post, amount: number) => {
  const db = client.db();
  const usersCollection = db.collection("Posts");
  const newPost: Post = {...post, likesAmount: post.likesAmount + amount}; // Changing likes here
  const res = await usersCollection.findOneAndReplace({_id: new ObjectId(post.id)}, newPost);
  return res;
} 

export const getAllPostsId = async (client: MongoClient) => {
  const db = client.db();
  const usersCollection = db.collection("Posts");
  const res = await usersCollection.find({}, {projection: {_id: 1}}).toArray();
  const userId = res.map(u => u._id.toString())
  return userId;
}

export const getPostById = async(client: MongoClient, id: string) => {
  const db = client.db();
  const usersCollection = db.collection("Posts");
  const res = await usersCollection.findOne({_id: new ObjectId(id)});
  return res;
}
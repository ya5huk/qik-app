import { MongoClient, ObjectId } from "mongodb";
import { DB_URL } from "./Interfaces";

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
  return await usersCollection.findOne(searchedData);
};

export const findUserById = async (client: MongoClient, id: string) => {
  const db = client.db();
  const usersCollection = db.collection("Users");
  return await usersCollection.findOne({_id: new ObjectId(id)});
}
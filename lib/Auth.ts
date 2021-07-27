import { Db, MongoClient } from "mongodb";
import * as Interfaces from "./Interfaces";

const md5 = require("md5");
const URL = "mongodb+srv://ilan:147963258@cluster0.xgbq2.mongodb.net/wavy?";

const connectMongoDB = async () => {
  try {
    const client = await MongoClient.connect(URL);
    return client;
  } catch (error) {
    console.log("Error while logging in the database ", error);
  }
};

export const registerUser = async (user: Interfaces.registerUser) => {
  const client = await connectMongoDB();
  const insertUser = {
    email: user.email,
    username: user.username,
    password: md5(user.password),
  };
  if (client === undefined) {
    console.log("error!");
    return;
  } else {
    // Add the user to database!
    const db = client.db();
    const usersCollection = db.collection("Users");
    const res = await usersCollection.insertOne(insertUser);
    client.close();

    return res;
  }
};

export const findUser = async (user: Interfaces.loginUser) => {
  const client = await connectMongoDB();
  const insertUser = {
    username: user.username,
    password: md5(user.password),
  };
  if (client === undefined) {
    console.log("error!");
    return;
  } else {
    // Add the user to database!
    const db = client.db();
    const usersCollection = db.collection("Users");
    const res = await usersCollection.findOne(insertUser);
    client.close();

    return res;
  }
};

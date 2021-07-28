import * as Interfaces from "./Interfaces";
import { connectMongoDB, addToCollection, findInCollection } from "./Database";
const md5 = require("md5");



export const registerUser = async (user: Interfaces.registerUser) => {
  const client = await connectMongoDB();
  const insertUser = {
    description: "",
    email: user.email,
    username: user.username,
    password: md5(user.password),
  };
  if (client === undefined) {
    console.log("error!");
    return;
  } else {
    const res = await addToCollection(client, "Users", insertUser)
    client.close();

    return res;
  }
};

export const findUser = async (user: Interfaces.loginUser) => {
  const client = await connectMongoDB();
  if (client === undefined) {
    console.log("error!");
    return;
  } else {
    // Add the user to database!
    const res = await findInCollection(client, "Users", {username: user.username});
    client.close();

    return res;
  }
};

import * as Interfaces from "./Interfaces";
import { addToCollection, findInCollection } from "./Database";
const md5 = require("md5");

export const registerUser = async (user: Interfaces.registerUser) => {
  const insertUser = {
    description: "",
    email: user.email,
    username: user.username,
    password: md5(user.password),
  };
  const res = await addToCollection("Users", insertUser);

  return res;
};

export const findUser = async (user: Interfaces.loginUser) => {
  // Add the user to database!
  const res = await findInCollection("Users", { username: user.username });

  return res;
};

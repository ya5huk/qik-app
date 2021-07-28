export interface registerUser { 
  description: string,
  email: string,
  username: string,
  password: string
}

export interface loginUser {
  username: string,
  password: string
} 

export interface User {
  id: string,
  username: string,
  email: string
}

export interface Post {
  id: string,
  author: string,
  creationTime: string,
  content: string,
  likesAmount: number
}

export const DB_URL = "mongodb+srv://ilan:147963258@cluster0.xgbq2.mongodb.net/wavy?";

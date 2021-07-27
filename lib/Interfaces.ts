export interface registerUser { 
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
  author: string,
  creationTime: string,
  content: string,
  likesAmount: number
}
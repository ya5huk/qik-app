export const maxPostsPerPage = 10 ; 

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
  id?: string,
  author: string,
  creationTime: Date,
  content: string,
  likesAmount: number,
  likedList: string[] | string
}



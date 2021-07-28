import * as Database from './Database';
import * as Interfaces from './Interfaces'; 

export const addPostToDatabase = async (content: string, userId: string) => {
  const client = await Database.connectMongoDB();
  if(client === undefined) {
    return;
  }

  const authorUser = await Database.findUserById(client, userId);
  const post: Interfaces.Post = {
    author: authorUser?.username,
    content: content,
    creationTime: new Date(),
    likesAmount: 0
  }
  if(client !== undefined) {
    return await Database.addToCollection(client, "Posts", post);
  }
  
  
}
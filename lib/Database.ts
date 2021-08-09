import { MongoClient, Db, ObjectId } from "mongodb";
import PostsHome from "../pages/posts";
import { Post, maxPostsPerPage } from "./Interfaces";

const clientPromise: Promise<MongoClient> | null = MongoClient.connect(
  process.env.DB_URI as string
);
let client: MongoClient | null = null;

export const connectDatabase = async () => {
	try {
		if (!client) {
    client = await clientPromise;
  	}
	}
  catch (err) {
		throw new Error(`ERROR!!!! CHECK YOUR DB CONNECTION (COULD BE URI STRING)\n\n\nError: ${err} Your URI STRING ${process.env.DB_URI}`);
  }
  return client.db();
};

export const addToCollection = async (
  collectionString: string,
  addedData: any
) => {
  const db = await connectDatabase();
  const collection = db.collection(collectionString);
  return await collection.insertOne(addedData);
};

export const addPostToDB = async (post: Post) => {
  const db = await connectDatabase();
  const postCollection = db.collection("Posts");
  const count = await postCollection.countDocuments();
  const diff = count - maxPostsPerPage + 1;
  if (diff >= 0) {
    const lastPostsArr = await postCollection.find().limit(diff).toArray();
    for (const post of lastPostsArr) {
      // delete last posts
      const deleteResponse = await postCollection.deleteOne({ _id: post._id });
      if (deleteResponse?.acknowledged) {
        console.log(
          "More than 10 posts on page, deleting last ones: ",
          post._id
        );
      }
    }
  }
  return await addToCollection("Posts", post);
};

export const findInCollection = async (
  collection: string,
  searchedData: any
) => {
  const db = await connectDatabase();
  const usersCollection = db.collection(collection);
  return usersCollection.findOne(searchedData);
};

export const findUserById = async (id: string) => {
  const db = await connectDatabase();
  const usersCollection = db.collection("Users");
  return await usersCollection.findOne({ _id: new ObjectId(id) });
};

export const getPosts = async () => {
  const db = await connectDatabase();
  const postsCollection = db.collection("Posts");
  return postsCollection.find().limit(10);
};

export const changePostLikeAmount = async (
  post: Post,
  amount: number,
  userId: string
) => {
  const db = await connectDatabase();
  const postsCollection = db.collection("Posts");
  const postToChange: any = (await postsCollection.findOne({
    _id: new ObjectId(post.id),
  })) as Document; // A database post is returned
  // I declare as any to prevent typescript errors

  const query = { _id: new ObjectId(post.id) };
  const updateDocument = {
    $set: {
      likesAmount: postToChange.likesAmount + amount,
      likedList:
        amount > 0
          ? [...postToChange.likedList, userId]
          : postToChange.likedList.filter((id: string) => id !== userId),
    },
  };

  const res = await postsCollection.updateOne(query, updateDocument);
  console.log(res);
  return res;
};

export const getAllPostsId = async () => {
  const db = await connectDatabase();
  const usersCollection = db.collection("Posts");
  const res = await usersCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();
  const userId = res.map((u) => u._id.toString());
  return userId;
};

export const getPostById = async (id: string) => {
  const db = await connectDatabase();
  const postsCollection = db.collection("Posts");
  const res = await postsCollection.findOne({ _id: new ObjectId(id) });
  return res;
};

export const getAllUsersId = async () => {
  const db = await connectDatabase();
  const usersCollection = db.collection("Users");
  const res = usersCollection.find({}, { projection: { _id: 1 } });
  const arr = await res.toArray();
  return arr.map((obj) => obj._id.toString());
};

export const getUserById = async (id: string) => {
  const db = await connectDatabase();
  const usersCollection = db.collection("Users");
  const res = await usersCollection.findOne(
    { _id: new ObjectId(id) },
    { projection: { '_id': 0, 'email': 1, 'username': 1, 'description': 1 } }
  );
  return res as Document;
};

export const getUserByUsername = async (usr: string) => {
  const db = await connectDatabase();
  const usersCollection = db.collection("Users");
  const res = await usersCollection.findOne(
    { username: usr },
    { projection: { '_id': 1, 'email': 1, 'description': 1 } }
  );
  return res as Document;
} 

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import FormWrapper from "../../components/PostsPage/FormWrapper";
import PostForm from "../../components/PostsPage/PostForm";
import PostsList from "../../components/PostsPage/PostsList";
import { Post } from "../../lib/Interfaces";
import axios from "axios";
import { getPostsFromDatabase } from "../../lib/Posts";
import {getUserByUsername} from '../../lib/Database'
import { GetStaticProps } from "next";
import Navbar from "../../components/UI/Navbar";

interface Props {
  posts: Post[];
}

const PostsHome: React.FC<Props> = ({ posts }) => {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false); // Loading when uploading a post, can be used for graphical purposes later
  const router = useRouter();
  useEffect(() => {
    const id = localStorage.getItem("?");
    setUserId(localStorage.getItem("?") as string);
    console.log("Logged in", id);
    if (id === null) {
      router.push("/login");
    }
  }, [router]);
  // So people who enter can't get to posts without user

  const addPost = (content: string) => {
    setLoading(true);
    axios
      .post("/api/add-post", {
        content: content,
        userId: localStorage.getItem("?"),
      })
      .then((res) => {
        console.log("Added post", res);
      })
      .catch((err) => {
        console.log("Didnt add post", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <div
        className="d-flex flex-column justify-content-center pt-5"
        style={{ backgroundColor: "var(--primColor)" }}
      >
        <FormWrapper>
          <PostForm addPost={addPost} />
        </FormWrapper>
        <PostsList userId={userId} posts={posts} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await getPostsFromDatabase(0);
  let updatedPosts: Post[] = [];
  // Just to get the id's to string form and date string to Date
  posts?.forEach(async (post) => {
    const newPost: Post = {
      author: post.author,
      content: post.content,
      creationTime: post.creationTime.toString(),
      likesAmount: post.likesAmount,
      id: post._id.toString(),
      likedList: post.likedList,
    };
    updatedPosts.push(newPost);
  });
  // Sort by time created
  updatedPosts = updatedPosts.sort((pos1, pos2) => {
    const date1 = new Date(pos1.creationTime);
    const date2 = new Date(pos2.creationTime);
    return date2.getTime() - date1.getTime();
  });
  return {
    props: {
      posts: updatedPosts,
    },
    revalidate: 4,
  };
};

export default PostsHome;

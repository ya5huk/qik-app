import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import FormWrapper from "../../components/PostsPage/FormWrapper";
import PostForm from "../../components/PostsPage/PostForm";
import PostsList from "../../components/PostsPage/PostsList";
import { Post } from "../../lib/Interfaces";
import axios from "axios";
import { getPostsFromDatabase } from "../../lib/Posts";
import { GetStaticProps } from "next";

interface Props {
  posts: Post[];
}

const postsHome: React.FC<Props> = ({ posts }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const id = localStorage.getItem("?");
    console.log(id);
    if (id === null) {
      router.push("/login");
    }
  }, []);
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
    <div
      className="d-flex flex-column justify-content-center mt-5"
      style={{ backgroundColor: "var(--primColor)" }}
    >
      <FormWrapper>
        <PostForm addPost={addPost} />
      </FormWrapper>
      <PostsList posts={posts} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await getPostsFromDatabase(0);
  const updatedPosts: Post[] = [];
  // Just to get the id's to string form and date string to Date
  posts?.forEach((post) => {
    const newPost: Post = {
      author: post.author,
      content: post.content,
      creationTime: post.creationTime.toString(),
      likesAmount: post.likesAmount,
      id: post._id.toString(),
    };
    updatedPosts.push(newPost);

  });
  console.log(posts);
  return {
    props: {
      posts: updatedPosts
    },
    revalidate: 4,
  };
};

export default postsHome;

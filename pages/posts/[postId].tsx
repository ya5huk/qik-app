import { GetStaticPaths, GetStaticProps } from "next";
import React, { useState, useEffect } from "react";
import FullPost from "../../components/PostsPage/FullPost";
import Navbar from "../../components/UI/Navbar";
import { Post } from "../../lib/Interfaces";
import { getAllPostsId, getPostWithId } from "../../lib/Posts";

interface Props {
  post: Post;
  liked: boolean;
}

const FullPostPage: React.FC<Props> = ({ post }) => {
  const [userId, setUserId] = useState("");
  const [likedInitialValue, setLikedInitialValue] = useState(false);
  useEffect(() => {
    setUserId(localStorage.getItem("?") as string);
    setLikedInitialValue(post.likedList.toString().split(",").includes(userId));
  }, [post, userId, likedInitialValue]);
  return (
    <>
      <Navbar />
      <FullPost
        likedInitialValue={likedInitialValue}
        post={post}
        userId={userId}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getAllPostsId();
  let paths = res?.map((postId) => ({
    params: { postId: postId },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postId = context.params?.postId;
  const gottenPost = await getPostWithId(postId);
  const post: Post = {
    likedList: gottenPost?.likedList.toString(),
    author: gottenPost?.author,
    content: gottenPost?.content,
    creationTime: gottenPost?.creationTime.toString(),
    likesAmount: gottenPost?.likesAmount,
    id: gottenPost?._id.toString(),
  };
  return {
    props: {
      post: post,
    },
  };
};
export default FullPostPage;

import React from "react";
import { Post } from "../../lib/Interfaces";
import PostBox from "./PostBox";
import PostsWrapper from "./PostsWrapper";

interface Props {
  posts: Post[];
}

const PostsList: React.FC<Props> = ({ posts }) => {
  // Date comes here as a string
  // Fixing that:
  posts.map(post => {
    post.creationTime = new Date(post.creationTime)
  })
  console.log('p', posts);
  return (
    <PostsWrapper>
      {posts.map((post) => (
        <PostBox key={post.id} post={post} />
      ))}
    </PostsWrapper>
  );
};

export default PostsList;

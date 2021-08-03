import React from "react";
import { Post } from "../../lib/Interfaces";
import PostBox from "./PostBox";
import PostsWrapper from "./PostsWrapper";

interface Props {
  posts: Post[];
  userId: string
}

const PostsList: React.FC<Props> = ({ posts, userId }) => {
  // Date comes here as a string
  // Fixing that:
  posts.map(post => {
    post.creationTime = new Date(post.creationTime)
  })
  return (
    <PostsWrapper>
      {posts.map((post) => (
        <PostBox key={post.id} userId={userId} post={post} />
      ))}
    </PostsWrapper>
  );
};

export default PostsList;

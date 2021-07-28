import React from "react";
import classes from "./PostBox.module.css";
import { Post } from "../../lib/Interfaces";
import { getDateDifferenceString } from "../../lib/Date";

interface Props {
  post: Post;
}

const PostBox: React.FC<Props> = ({ post }) => {
  const postCreatedTimeAgo = getDateDifferenceString(post.creationTime);
  return (
    <div className={`card text-white border-white mb-5 ${classes.cardStyles}`}>
      <div className="card-header bg-transparent border-none d-flex flex-inline align-items-center justify-content-between">
        <p className="m-0 fw-bold">{post.author}</p>
        <p className={`m-0 ${classes.dateStyles}`}>{postCreatedTimeAgo}</p>
      </div>

      <div className="card-body pb-0">
        <p className="card-text">{post.content}</p>
      </div>
      <div
        className="
        d-flex
        flex-inline
        justify-content-end
        card-footer
        align-items-center
        bg-transparent
      "
      >
        <a className={`pe-1 mb-1 ${classes.heartStyle}`}>🤍</a>
        {/* <a className="m-0">❤️</a> */}
        <p className={`font-weight-light mb-0 ${classes.likeFont}`}>
          {post.likesAmount} likes
        </p>
      </div>
    </div>
  );
  //    End of Post
};

export default PostBox;

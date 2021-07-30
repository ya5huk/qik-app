import React from "react";
import classes from "./FullPost.module.css";
import { Post } from "../../lib/Interfaces";
import { getDateDifferenceString } from "../../lib/Date";
import Link from 'next/link';

interface Props {
  post: Post;
  liked: boolean;
}

const FullPost: React.FC<Props> = ({ post, liked }) => {
  const date = new Date(post.creationTime);
  const createdTimeAgo = getDateDifferenceString(date);

  const handleLikeSubmit = () => {
    console.log("Like");
  };

  return (
    <div
      className={`d-flex justify-content-center text-white ${classes.bgColor}`}
    >
      <div className={`card w-50 text-white mt-5 ${classes.mainCard}`}>
        <div
          className="
          card-header
          d-flex
          justify-content-between
          align-content-center
        "
        >
          <h2 className={`${classes.cardHeader} my-auto`}>{post.author}</h2>
          <p className={`my-auto ${classes.myFont} ${classes.dateStyles} fs-6`}>
            {createdTimeAgo}
          </p>
        </div>
        <div className="card-body pt-0">
          <p className="card-text">{post.content}</p>
        </div>
        <div className="card-footer d-flex justify-content-between">
        <Link href="/posts">
        <a className={`my-auto pb-1 ${classes.heartStyle}`}>🔙</a>
        </Link>
        
        <div id="likesSection" className="d-flex flex-inline">
          <a
            onClick={handleLikeSubmit}
            className={`my-auto me-1 pb-1 just ${classes.heartStyle}`}
          >
            {liked ? "❤️" : "🤍"}
          </a>
          {post.likesAmount > 0 ? ( // Show likes only when there are likes
            <p className={`font-weight-light my-auto ${classes.likeFont}`}>
              {post.likesAmount} likes
            </p>
          ) : (
            ""
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPost;
import React, { useEffect, useState } from "react";
import classes from "./FullPost.module.css";
import { Post } from "../../lib/Interfaces";
import { getDateDifferenceString } from "../../lib/Date";
import Link from "next/link";
import axios from "axios";

interface Props {
  post: Post,
  userId: string
  likedInitialValue: boolean
}

const FullPost: React.FC<Props> = ({ post, userId, likedInitialValue }) => {
  const date = new Date(post.creationTime);
  const createdTimeAgo = getDateDifferenceString(date);
  const [liked, setLiked] = useState(likedInitialValue);
  useEffect(() => {
    setLiked(likedInitialValue);
  }, [likedInitialValue]) // Change like if it changed in parent components
  const handleLikeSubmit = () => {
    
    axios.post('/api/change-likes', {post: post, amount: liked ? -1 : 1, userId: userId}).then(res => {
      setLiked(!liked);
      console.log('Removed like')
    }).catch(err => {
      console.log(err)
      setLiked(!liked)
    })
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

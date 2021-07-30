import React, { useState } from "react";
import classes from "./PostBox.module.css";
import { Post } from "../../lib/Interfaces";
import { getDateDifferenceString } from "../../lib/Date";
import axios from "axios";
import { useEffect } from "react";

interface Props {
  post: Post;
}

const PostBox: React.FC<Props> = ({ post }) => {
  const postCreatedTimeAgo = getDateDifferenceString(post.creationTime);
  const [liked, setLiked] = useState(false);

  // Show post as liked if its in liked list in first load:
  useEffect(() => {
    if (post.id) {
      localStorage.getItem("l")?.includes(post.id)
        ? setLiked(true)
        : setLiked(false);
    }
  }, [post.id]);

  const handleLikeAdd = (e: any) => {
    e.preventDefault();
    if (liked) {
      // Removing a like
      setLiked(false);
      axios
        .post("/api/change-likes", { post: post, amount: -1 })
        .then((res) => {
          console.log("Removed like", res);
        })
        .catch((err) => {
          setLiked(true);
          console.log("Error removing like", err);
        });

      // Removing from liked list
      if (post.id) {
        let newLikedList = localStorage
          .getItem("l")
          ?.split(",")
          .filter((postId) => postId !== post.id);
        if (newLikedList) localStorage.setItem("l", newLikedList.toString());
      }
    } else {
      // Adding a like because post is not in liked list
      setLiked(true);
      axios
        .post("/api/change-likes", { post: post, amount: 1 })
        .then((res) => {
          console.log("Added like", res);
        })
        .catch((err) => {
          console.log("Error adding like", err);
          setLiked(false);
        });

      // Add to likedList of users
      if (!localStorage.getItem("l")) {
        // If list does not exist, we add it
        localStorage.setItem("l", [post.id].toString());
      } else {
        if (
          post.id &&
          localStorage.getItem("l")?.split(",").includes(post.id)
        ) {
          return; // No like in case we already liked (in like list)
        }
        // In case we liking a new post, just add to list
        const currList = localStorage.getItem("l")?.split(",");
        if (currList) {
          localStorage.setItem("l", [...currList, post.id].toString());
        }
      }
    }
  };
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
        <a
          onClick={handleLikeAdd}
          className={`pe-1 mb-1 ${classes.heartStyle}`}
        >
          {liked ? "❤️" : "🤍"}
        </a>
        {post.likesAmount > 0 ? ( // Show likes only when there are likes
          <p className={`font-weight-light mb-0 ${classes.likeFont}`}>
            {post.likesAmount} likes
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
  //    End of Post
};

export default PostBox;

import React, { useState, useEffect } from "react";
import classes from "./PostBox.module.css";
import { Post } from "../../lib/Interfaces";
import { getDateDifferenceString } from "../../lib/Date";
import { getUserByUsername } from "../../lib/Database";
import axios from "axios";
import Link from "next/link";
import { GetStaticProps } from "next";

interface Props {
  post: Post;
  userId: string;
}

const PostBox: React.FC<Props> = ({ post, userId }) => {
  const postCreatedTimeAgo = getDateDifferenceString(post.creationTime);
  const [liked, setLiked] = useState(false);
  const [authorId, setAuthorId] = useState("");
  useEffect(() => {
    // Figure out why it don't show how much likes
    setLiked(post.likedList.toString().split(",").includes(userId)); // Searhing in likedList for current user
    axios.post('/api/find-user-by-username', {username: post.author}).then(res => {
      setAuthorId(res.data.result._id.toString());
    }).catch(err => {
      console.log('ERROR: ', err)
    })
  }, [post, userId]);
  const handleLikeAdd = (e: any) => {
    e.preventDefault();
    if (liked) {
      // Removing a like
      setLiked(false);
      axios
        .post("/api/change-likes", { post: post, amount: -1, userId: userId })
        .then((res) => {
          console.log("Removed like", res);
        })
        .catch((err) => {
          setLiked(true);
          console.log("Error removing like", err);
        });
    } else {
      // Adding a like because post is not in liked list
      setLiked(true);
      axios
        .post("/api/change-likes", { post: post, amount: 1, userId: userId })
        .then((res) => {
          console.log("Added like", res);
        })
        .catch((err) => {
          console.log("Error adding like", err);
          setLiked(false);
        });
    }
  };
  return (
    <div className={`card text-white border-white mb-5 ${classes.cardStyles}`}>
      <div className="card-header bg-transparent border-none d-flex flex-inline align-items-center justify-content-between">
        <Link href={`/accounts/${authorId}`} passHref>
          <p className={`m-0 fw-bold ${classes.postAuthor}`}>{post.author}</p>
        </Link>
        <p className={`m-0 ${classes.dateStyles}`}>{postCreatedTimeAgo}</p>
      </div>

      <div className="card-body pb-0">
        <p className="card-text">{post.content}</p>
      </div>
      <div
        className="
        d-flex
        flex-inline
        justify-content-between
        card-footer
        align-items-center
        bg-transparent
      "
      >
        <Link href={`/posts/${post.id}`}>
          <a className={`my-auto pb-1 ${classes.heartStyle}`}>🗒️</a>
        </Link>

        <div id="likesSection" className="d-flex flex-inline">
          <a
            onClick={handleLikeAdd}
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
  );
  //    End of Post
};

export default PostBox;

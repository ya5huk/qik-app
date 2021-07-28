import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import FormWrapper from "../../components/PostsPage/FormWrapper";
import PostForm from "../../components/PostsPage/PostForm";
import PostsList from "../../components/PostsPage/PostsList";
import { Post } from "../../lib/Interfaces";
import axios from 'axios';

const DUMMY_POSTS: Post[] = [
  {
    id: "7445a6dsdfa8ef4",
    author: "Ilan Yashuk",
    creationTime: new Date("2021-07-28T18:53:00"),
    content: "Hey my name is Ilan Yashuk",
    likesAmount: 10,
  }, {
    id: "daf654weaf23awe1f",
    author: "Ron Kaufman",
    creationTime: new Date("2021-07-28T03:24:00"),
    content: "Hey my name is Ron Kaufman",
    likesAmount: 642,
  }
];

const postsHome: React.FC = () => {
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
    axios.post('/api/add-post', {content: content, userId: localStorage.getItem('?')}).then(res => {
      console.log('Added post', res);
    }).catch(err => {
      console.log('Didnt add post', err);
    }).finally(() => {
      setLoading(false);
    })  
  }

  return (
    <div
      className="d-flex flex-column justify-content-center mt-5"
      style={{ backgroundColor: "var(--primColor)" }}
    >
      <FormWrapper>
        <PostForm addPost={addPost}/>
      </FormWrapper>
      <PostsList posts={DUMMY_POSTS} />
    </div>
  );
};

export default postsHome;

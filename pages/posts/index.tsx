import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import FormWrapper from "../../components/PostsPage/FormWrapper";
import PostForm from "../../components/PostsPage/PostForm";
import PostsList from "../../components/PostsPage/PostsList";
import { Post } from "../../lib/Interfaces";

const DUMMY_POSTS: Post[] = [
  {
    author: "Ilan Yashuk",
    creationTime: "2hr ago",
    content: "Hey my name is Ilan Yashuk",
    likesAmount: 10,
  }, {
    author: "Ron Kaufman",
    creationTime: "5d ago",
    content: "Hey my name is Ron Kaufman",
    likesAmount: 642,
  }
];

const postsHome: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    const id = localStorage.getItem("?");
    console.log(id);
    if (id === null) {
      router.push("/login");
    }
  }, []);
  // So people who enter can't get to posts without user

  return (
    <div
      className="d-flex flex-column justify-content-center mt-5"
      style={{ backgroundColor: "var(--primColor)" }}
    >
      <FormWrapper>
        <PostForm />
      </FormWrapper>
      <PostsList posts={DUMMY_POSTS} />
    </div>
  );
};

export default postsHome;

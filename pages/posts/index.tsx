import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";

const postsHome: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    const id = localStorage.getItem("?");
    console.log(id);
    if(id === null) {
      router.push('/login');
    }
  }, [])
  // So people who enter can't get to posts without user
  
  return <div>POSTS PAGE</div>;
};

export default postsHome;

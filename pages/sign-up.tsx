import { GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import SignupForm from "../components/UI/SignupForm";
import axios from "axios";
import { useRouter } from "next/dist/client/router";

interface Props {}

const Signup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const router = useRouter();

  const submitHandler = (email: string, username: string, password: string) => {
    setLoading(true);
    axios
      .post("/api/signup", {
        email: email,
        username: username,
        password: password,
      })
      .then((res) => {
        if(res.data.result === 'success') {
          setLoading(false);
          router.push('/login');
        } 
        
      }).catch(err => {
        // Signup failed
        setFailed(true);
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <SignupForm submitHandler={submitHandler} isFailed={failed} loadingState={loading} />
    </>
  );
};

const getServerSideProps = async (context: GetServerSidePropsContext) => {
  console.log("hey");
  return {
    props: {
      result: "yayyy",
    },
  };
};

export default Signup;

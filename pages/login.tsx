import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useState } from "react";
import LoginForm from "../components/UI/LoginForm";
import { User } from "../lib/Interfaces";

interface Props {}


const Login: React.FC = () => {
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitHandler = (username: string, password: string) => {
    setLoading(true);
    axios
      .post("/api/login", { username: username, password: password })
      .then((res) => {
        const user: User = res.data.user;
        localStorage.setItem("?", user.id);
        router.push("/posts");
      })
      .catch((error) => {
        console.log("Login failed");
        setFailed(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <LoginForm
        submitHandler={submitHandler}
        loginStatus={failed}
        loadingStatus={loading}
      />
    </>
  );
};

export default Login;

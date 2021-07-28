import { useRef, FormEvent } from "react";
import classes from "./SignupForm.module.css";
import Link from "next/link";

interface Props {
  submitHandler: (username: string, password: string, email: string) => void;
  loadingState: boolean;
  isFailed: boolean;
}

const SignupForm: React.FC<Props> = ({
  submitHandler,
  loadingState,
  isFailed,
}) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;

    if (
      username !== undefined &&
      password !== undefined &&
      email !== undefined &&
      username !== "" &&
      password !== "" &&
      email !== ""
    ) {
      submitHandler(email, username, password);
    } else {
      console.log("Nothing entered !");
    }
  };

  return (
    <div
      className={`row justify-content-md-center h-100 ${classes.loginContainer}`}
    >
      <div className="container col-md-6 mx-auto p-5 ">
        <form onSubmit={formSubmitHandler} className="form-column">
          <div className="form-floating mb-3">
            <input
              ref={emailRef}
              type="email"
              className={`form-control ${classes.inputStyles}`}
              id="emailInput"
              placeholder="Email address"
              autoComplete="off"
            />
            <label htmlFor="emailInput" className="text-white">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              ref={usernameRef}
              type="text"
              className={`form-control ${classes.inputStyles}`}
              name="inputUsername"
              id="inputUsername"
              placeholder="Username"
            />
            <label htmlFor="inputUsername" className="text-white">Username</label>
          </div>
          <div className="form-floating">
            <input
              ref={passwordRef}
              type="password"
              className={`form-control ${classes.inputStyles}`}
              name="inputPassword"
              id="inputPassword"
              placeholder="Password"
              minLength={6}
            />
            <label htmlFor="inputPassword" className="text-white">Password</label>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button
              type="submit"
              className={`position-relative btn btn-danger ${classes.buttonText}`}
            >
              {loadingState ? "Loading..." : "Sign up"}
            </button>

            <p className={`fw-light text-white mt-auto mb-auto ${classes.pText}`}>
              Already have an account? Try to{" "}
              <Link href="/login">
                <a className={classes.linkText}>login</a>
              </Link>
            </p>
          </div>
          {isFailed ? (
            <div className="d-flex mt-3 justify-content-center">
              <p className="fs-6 fw-bold text-danger">Account already exists.</p>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

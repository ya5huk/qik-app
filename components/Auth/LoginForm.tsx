import { useRef, FormEvent } from "react";
import classes from "./LoginForm.module.css";
import Link from "next/link";

interface Props {
  submitHandler: (username: string, password: string) => void;
  loginStatus: boolean;
  loadingStatus: boolean;
}

const LoginForm: React.FC<Props> = ({
  submitHandler,
  loginStatus,
  loadingStatus,
}) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    if (
      username !== undefined &&
      password !== undefined &&
      username !== "" &&
      password !== ""
    ) {
      submitHandler(username, password);
    } else {
      console.log("Empty entered ", username, " ", password);
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
            />
            <label htmlFor="inputPassword" className="text-white">Password</label>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <div>
              <button
                type="submit"
                className={`btn btn-danger ${classes.buttonText}`}
              >
                {loadingStatus ? "Loading..." : "Login"}
              </button>
            </div>
            <div className="d-flex justify-content-between">
              
              <p className={`fw-light text-white m-auto ${classes.pText}`}>
                No account? no worries fam, jus'{" "}
                <Link href="/sign-up">
                  <a className={classes.linkText}>signup</a>
                </Link>
              </p>
            </div>
            
          </div>
          <div className="d-flex align-items-center mt-3">
                {loginStatus ? (
                  <label className="col text-danger fw-bold fs-6 text-center">
                    Please re-enter your details
                  </label>
                ) : (
                  ""
                )}
              </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

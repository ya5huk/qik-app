import classes from "../PostsPage/FullPost.module.css";
import Link from "next/link";

interface Props {
  description: string;
  username: string;
  email: string;
}

const Account: React.FC<Props> = ({ description, email, username }) => {
  return (
    <div
      className={`d-flex justify-content-center ${classes.bgColor} text-white`}
    >
      <div
        className={`card text-white mt-5  ${classes.mainCard}`}
        style={{ minWidth: "30rem" }}
      >
        <div
          className="
          card-header
          d-flex
          justify-content-between
          align-content-center
        "
        >
          <h2 className={`${classes.cardHeader} my-auto`}>{username}</h2>
        </div>
        <div className="card-body">
          contact me: <span className={`${classes.emailText}`}>{email}</span>{" "}
        </div>
        <div className="card-footer d-flex justify-content-end me-3">
          <Link href="/posts">
            <p className={`${classes.myFont} ${classes.backButton} fw-bold`}>&#8592;</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Account;

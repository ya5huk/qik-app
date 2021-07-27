import React from "react";
import classes from "./HomePageImage.module.css";
import wavyLogo from "../styles/images/wavy-logo-small-black.png";
import Image from "next/image";
import Link from "next/link";

const HomePageImage: React.FC = () => {
  return (
    <div
      className={`row align-items-center mt-5 justify-content-center ${classes.bg}`}
    >
      <div className="d-flex container-fluid justify-content-center">
        <Link href="/login">
          <a>
            <Image src={wavyLogo} alt="logo" className={` ${classes.img}`} />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HomePageImage;

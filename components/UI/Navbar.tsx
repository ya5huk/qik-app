import classes from "./Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <>
      <ul className={classes.ul}>
        <li className={classes.li}>Home</li>
        <li className={classes.li}>About</li>
        <li className={classes.li}>Gallery</li>
        <li className={classes.li}>Contact us</li>
      </ul>

    </>
  );
};

export default Navbar;

import React from "react";
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className={styles.landingContainer}>
      <h1>E-commerce</h1>
      <Link to={"/home"}>
        <button>Ingresar</button>
      </Link>
    </div>
  );
}

export default Landing;

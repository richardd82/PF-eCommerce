import React from "react";
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";
import descuento1 from "../../assets/imageOne.jpg"
import descuento2 from "../../assets/imageTwo.jpg"
import descuento3 from "../../assets/imageThree.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';

function Landing() {
  return (
    <div className={styles.landingContainer}>
     <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={descuento1} class="d-block w-100" alt="300px"/>
    </div>
    <div class="carousel-item">
      <img src={descuento2} class="d-block w-100" alt="300px"/>
    </div>
    <div class="carousel-item">
      <img src={descuento3} class="d-block w-100" alt="300"/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </div>
  );
}

export default Landing;

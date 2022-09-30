import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";
import descuento1 from "../../assets/imageOne.jpg";
import descuento2 from "../../assets/imageTwo.jpg";
import descuento3 from "../../assets/imageThree.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

function Landing() {
	return (
    <div className="virtualBody">
		<div className="containerLanding">
			<div
				id="carouselExampleIndicators"
				className="carousel slide"
				data-bs-ride="true"
			>
				<div className="carousel-indicators">
					<button
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide-to="0"
						className="active"
						aria-current="true"
						aria-label="Slide 1"
					></button>
					<button
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide-to="1"
						aria-label="Slide 2"
					></button>
					<button
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide-to="2"
						aria-label="Slide 3"
					></button>
				</div>
				<div className="carousel-inner">
					<div className="carousel-item active">
						<img src={descuento1} className="d-block w-100" alt="300px" />
					</div>
					<div className="carousel-item">
						<img src={descuento2} className="d-block w-100" alt="300px" />
					</div>
					<div className="carousel-item">
						<img src={descuento3} className="d-block w-100" alt="300" />
					</div>
				</div>
				<button
					className="carousel-control-prev"
					type="button"
					data-bs-target="#carouselExampleIndicators"
					data-bs-slide="prev"
				>
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button
					className="carousel-control-next"
					type="button"
					data-bs-target="#carouselExampleIndicators"
					data-bs-slide="next"
				>
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
		</div>
    </div>
	);
}

export default Landing;

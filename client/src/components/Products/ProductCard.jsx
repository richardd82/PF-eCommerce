import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ img, name, brand, price, id,styleCard }) {
  return (
    <div className={styleCard.productContainer}>
      <div className={styleCard.photoContainer}>
        <div>
        <img src={`https://${img}`} alt="No Found"  width="140" height="150" /></div>
      </div>
      <h3>{name}</h3>
      <p>{brand}</p>
      <div className={styleCard.priceCartContainer}>
        <div>{`$/${Number2Decimals(price)}`}</div>
        <Link to={`/details/${id}`}>
          <button>Details</button>
        </Link>
      </div>
    </div>
  );
}

function Number2Decimals(x) {
  return Number.parseFloat(x).toFixed(2);
}

export default ProductCard;

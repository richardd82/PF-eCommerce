import React from "react";
import styles from "./ProfileCard.module.css";
import { Link } from "react-router-dom";
import  EditProfileFormulary  from "./editProfileFormulary";
/** Debemos agregar Componente para poder modificar El perfil de la persona usando el boton de 
  abajo 
 */

function ProfileCard({ email, name, lastName, image, address, typeUser }) {
  return (
    <div className={styles.productContainer}>
      <button>Editar</button>
      <h2 className={styles.titulo}>Your Profile</h2>

      <section className={styles.informacionContainer}>
        <div className={styles.photoContainer}>
          <img src={`${image}`} alt="No Found" />
        </div>
        <div className={styles.InforContainerText}>
          <p><b>Nombre:</b>  {name}</p>
          <p><b>Apellido:</b>  {lastName}</p>
          {/* <p><b>Apellido:</b>  {email}</p> */}
          <p><b>Direccion:</b>   {address}</p>
        </div>
      </section>

      <div className={styles.buttonModify}>
        <Link to={"./editProfileFormulary"}>
          <button className= {styles.buttonChangePass}> <span></span></button>
          {/* se debe de agregar el componente para configurar el usuario */}
        </Link>
      </div>

    </div>
  );
}

function Number2Decimals(x) {
  return Number.parseFloat(x).toFixed(2);
}

export default ProfileCard;

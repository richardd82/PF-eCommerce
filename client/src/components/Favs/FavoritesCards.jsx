import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { style as s} from "@mui/system" ;

export default function FavoritesCards ({id, name, image, user_login}) {


    const handleClickRemoveFav = async () => {
        if(user_login.id!==undefined && user_login.id !== false) {
            
            await axios.delete(`${process.env.REACT_APP_URL_BACK}/favorites`, { data: {
                userId: user_login.id,
                productId: id
            }}
              )
              .then(swal({
                title: "Success",
                icon: "success",
                button: "Ok",
            }))
            .then(res => {
                if(res) {
                    window.location.reload()
            }})
            .catch((err)=>console.log(err))
        }
    };


    return(
        <div >
            <div >
            <Link to={`/details/${id}`}>
                <img src={`${image}`} alt="Image Not Found" width="140" height="150"/> 
                <span>{name}</span>
            </Link>
            </div>
            <div >
            <button onClick={handleClickRemoveFav}>Delete</button>
            </div>
        </div>
    )
};

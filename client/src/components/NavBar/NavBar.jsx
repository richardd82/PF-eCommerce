import React from "react";
import { Link } from "react-router-dom";
import logo_wooly from "../../assets/logo_wooly.png";
// import Style from "./NavBar.module.css";
// import logo from "../image/logo.png";
import { useState } from "react";
// import Login from "../Login/Login";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IconContext } from "react-icons";
import { Badge } from '@mui/material';
import { useSelector } from "react-redux";
// import NavUser from "../NavUser/NavUser";


export default function NavBar(props) {
  const carryProducts = useSelector((state) => state.carryProducts);
  const user_login = useSelector((state) => state.user_login);
  const [openModal, setOpenModal] = useState(false);

  function handleOpen() {
    setOpenModal(true);
  }

  function handleClose(value) {
    setOpenModal(value);
  }

  let Cantidad = 0
  for (let index = 0; index < carryProducts.length; index++) {
    var carry = carryProducts[index];
    Cantidad = Cantidad + carry.amount
  }

  return (
    <header>
      <nav >
        <div >
          <Link to={"/"}>
            {/* <img src={logo_wooly} alt="Not Found" width="85px" height="85px" className={Style.logo} /> */}
            {/* <img
              src=""
              alt="Not Found"
              width="85px"
              height="85px"
              className={Style.logo}
            /> */} <p>VA LOGO</p>
          </Link>
          <ul>
            <li>
              <Link to={"/products/Men"}>
                MEN
              </Link>
            </li>
            <li>
              <Link to={"/products/Women"}>
                WOMEN
              </Link>
            </li>
            <li>
              <Link to={"/favorites"}>
                FAVORITES
              </Link>
            </li>
          </ul>
        </div>
        <div >
          <ul>
            {/* <li>
                <Link to={"/products/Men"} className={Style.letra}>
                  MEN
                </Link>
              </li>
              <li>
                <Link to={"/products/Women"} className={Style.letra}>
                  WOMEN
                </Link>
              </li> */}
            {/* <li>
                  <Link to={"/about"} className={Style.letra}>
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link to={"/contact"} className={Style.letra}>
                    CONTACT
                  </Link>
                </li> */}
            {user_login.isAdmin !== true &&
              <li>
                <Link to={"/carry"} >
                  <Badge badgeContent={Cantidad} color="primary">
                    <IconContext.Provider value={{ size: "40px" }}>
                      <AiOutlineShoppingCart />
                    </IconContext.Provider>
                  </Badge>
                </Link>
              </li>
            }
            {/*<Link to={"/about"} className={Style.letra}>
                        LOGIN
                    </Link>
                    <Link to={"/register"} className={Style.letra}>
                        REGISTER
                    </Link>*/}
            {/* { user_login.id!==undefined && user_login.id !== false && user_login.isAdmin!==undefined && user_login.isAdmin==true &&
            <li className={Style.liFormat}>
              
            </li>
            } */}
          </ul>
          {/* {user_login.id !== undefined && user_login.id === false ?
            <button onClick={handleOpen} className={Style.buttonlogin}>
              Login/Register
            </button> : <NavUser />
          } */}
        </div>
        {/* <div className={Style.right}>
        
                <Link to={"/create"}>
                    ADD CLOTHES
                </Link>
            </div> */}
      </nav>

      {openModal && <div ></div>}
      {openModal && (
        <div >
          {/* <Login close={handleClose} /> */} <p>AQUI VA LOGIN</p>
        </div>
      )}
    </header>
  );
}

import React from "react";
// import Style from "./Footer.module.css";
import { Link } from "react-router-dom";
// import logo_wooly from "../../assets/logo_wooly.png";
// import logo from "../image/logo.png";

export default function Footer() {
  return (
    <footer >
      <div >
        <div >
          <Link to={"/contact"} >
            CONTACT
          </Link>
          {/* <Link to={"/"} >
                    <h4 className={Style.linkOne}>Home </h4>
                </Link>
  
                <Link to={"/products"} >
                    <h4>Products </h4>
                </Link>

                <Link to={"/contact"} >
                    <h4>Contact</h4>
                </Link> */}
        </div>
      </div>

      <div>
        <div >
          <Link to="/">
            {/* <img src={logo} alt="Img Not Found" className={Style.img} /> */}
            <p>VA IMAGEN</p>
          </Link>
        </div>
      </div>

      <div >
        <Link to={"/about"} >
          ABOUT
        </Link>
        {/* <p className={Style.footerCompanyAbout}> */}
        {/* <span>ABOUT OUR TEAM</span>
                    <br />
                    Aut ipsam autem sed velit assumenda ea magnam porro 
                    et laborum velit vel omnis alias ut neque eligendi 
                    ea voluptate eaque. Qui provident omnis ut quia 
                    voluptas ut rerum autem nam voluptate iste id modi. */}
        {/* contact us */}
        {/* </p> */}
      </div>
    </footer>
  );
}

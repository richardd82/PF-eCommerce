import React, { Component } from "react";
import { Link } from "react-router-dom" 
import "./Thanks.css"; 

export class Thanks extends Component {
    render() {
        return (
            <div >
                <h2 className="thanksTitle">
                    THANKS FOR BUY!!
                </h2>
                <img className="thanksImg" src="https://cdn.dribbble.com/users/3502921/screenshots/11467047/media/899b3e48a1a7cb78970b54b372db5349.gif" />
                <Link to="/" className="thanksLink">
                <button className="thanksBtn" >Return home </button> 
                </Link>
            </div>
        );
    }
}
//las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
export default (Thanks);

import React, { Component } from "react";
import "./Thanks.css"; 

export class Thanks extends Component {
    render() {
        return (
            <div >
                <label>
                    THANKS FOR BUY
                </label>
                <a href="/">
                    <button >Back to home</button>
                </a>
            </div>
        );
    }
}
//las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
export default (Thanks);

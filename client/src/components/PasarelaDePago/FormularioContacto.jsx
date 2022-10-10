import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./FormularioContacto.css";

export class FormularioContactoDelivery extends Component {

  componentDidMount() {
   // if(this.props.user_login != "Loading" && this.props.user_login!==false && this.props.user_login.admin==true)
    //this.props.history.push("/");
  }

  /*Comprobaciones() {
    this.props.history.push("/MethodPay");
  }*/

  render() {
    return (
      <div >
        <div>
          <label>An address reference: </label>
          <input
            type="text"
            id="Direccion"
            autoComplete="off"
            value={this.props.reference}
            onChange={(e) => this.props.handleChangeContact(e, "reference")}
          />
          <label>Your Phone </label>
          <input
            type="number"
            min={0}
            id="Phone"
            autoComplete="off"
            value={this.props.phone}
            onChange={(e) => this.props.handleChangeContact(e, "phone")}
          />
        </div>
      </div>
    );
  }
}
//las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
export default (FormularioContactoDelivery);

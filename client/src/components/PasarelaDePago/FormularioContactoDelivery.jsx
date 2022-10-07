import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styles from "./FormularioContacto.module.css";

export class FormularioContactoDelivery extends Component {
  constructor() {
    super();
    this.state = {
      adress: "",
      phone: "",
      reference: "",
    };
  }


  componentDidMount() {
    if(this.props.user_login != "Loading" && this.props.user_login!==false && this.props.user_login.admin==true)
    this.props.history.push("/");
  }

  

  handleChange(e, type) {
    this.setState({ ...this.state, [type]: e.target.value });
  }

  Comprobaciones() {
    //Buscar Id
    this.props.history.push("/MethodPay");
  }

  render() {
    return (
      <div className={styles.containerFormulario}>
        <p>ACA VA GOOGLE</p>
        <div className={styles.flexContainerInput}>
          <label>Your Adress: </label>
          <input
            type="text"
            id="Direccion"
            autoComplete="off"
            value={this.state.adress}
            onChange={(e) => this.handleChange(e, "adress")}
          />
          <label>Your Phone </label>
          <input
            type="text"
            id="Phone"
            autoComplete="off"
            value={this.state.phone}
            onChange={(e) => this.handleChange(e, "phone")}
          />
          <label>Your Reference: </label>
          <input
            type="text"
            id="Reference"
            autoComplete="off"
            value={this.state.reference}
            onChange={(e) => this.handleChange(e, "reference")}
          />
        </div>

        { this.state.phone !== "" &&
          this.state.reference !== "" &&
          this.state.adress !== "" && (
            <button
              className={styles.btnBuy}
              onClick={() => this.Comprobaciones()}
            >
              CONTINUE BUY
            </button>
          )}
      </div>
    );
  }
}

const FilterFormularioContactoDelivery = withRouter(FormularioContactoDelivery);

function mapStateToProps(state) {
  return {
    user_login: state.user_login,
  };
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getProducts
  return {
  };
}

//las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterFormularioContactoDelivery);

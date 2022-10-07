import React, { Component } from "react";
import { connect } from "react-redux";
import { ChangeCarryProducts, createOrder } from "../../redux/actions";
import { withRouter } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pay from "../Pago/Pay";
import axios from "axios";
import Swal from "sweetalert";
import styles from "./ResumenMetodoPago.module.css";

export class ResumenPago extends Component {

  componentDidMount() {
    if(this.props.user_login != "Loading" && this.props.user_login!==false && this.props.user_login.admin==true)
    this.props.history.push("/");
  }


  HistoryPushPaypal() {
    this.props.history.push("/payment");
  }

  CambiarPagina() {
    this.props.ChangeCarryProducts([]);
    this.props.history.push("/orders");
    window.location.reload();
  }

  async Compra() {
    const sendOrderPP = {
      stocks: this.props.carry.map((e) => {
        return {
          amount: e.amount,
          value: e.details.price,
          productId: e.id,
          image: e.details.image,
        };
      }),
      userId: this.props.user_login.id,
      estado:'Creada'
    };
    this.props.createOrder(sendOrderPP);

    let arregloObjetosIdQuantity = this.props.carry.map((e) => {
      return { size: e.state.size, stock: e.amount, id: e.id };
    });

    let stockProducts = { stockProducts: arregloObjetosIdQuantity };

    await axios({
      method: "put",
      url: `${process.env.REACT_APP_URL_BACK}/stock/drop`,
      data: stockProducts,
    })
      .then((e) => e.data, this.CambiarPagina())
      .catch((e) => console.log(e));
  }

  render() {
    var total = 0;
    let rows = this.props.carry.map((elemento) => {
      total += elemento.amount * elemento.details.price;
      return {
        name: elemento.details.name,
        size: elemento.state.size,
        amount: elemento.amount,
        price: elemento.details.price,
        priceTotal: elemento.amount * elemento.details.price,
      };
    });

    console.log(this.props.carry);
    return (
      <div className={styles.componentContainer}>
        <div className={styles.container}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Size</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.size}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">${row.price.toFixed(2)}</TableCell>
                    <TableCell align="right">
                      ${row.priceTotal.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <p>TOTAL : {total}</p>
          <p>Do you want to pay in cash or by PayPal/Credit Card?</p>
        </div>
        <button className={styles.btnPay} onClick={() => this.Compra()}>
          Pay in cash{" "}
        </button>
        <Pay />
      </div>
    );
  }
}

const ResumenPagoRouter = withRouter(ResumenPago);

function mapStateToProps(state) {
  return {
    carry: state.carryProducts,
    user_login: state.user_login,
  };
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getProducts
  return {
    ChangeCarryProducts: (elementos) =>dispatch(ChangeCarryProducts(elementos)),
    createOrder: (productos) => dispatch(createOrder(productos)),
  };
}

//las propiedades del estado que quiero conectar //las acciones que quiero poder dispatchar
export default connect(mapStateToProps, mapDispatchToProps)(ResumenPagoRouter);

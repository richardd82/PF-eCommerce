import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrders } from "../../redux/actions";
import { Link } from "react-router-dom";
import Orders2Cards from "./Orders2Cards.jsx";
import styles from "./Orders2.module.css";
//import { withRouter } from "react-router-dom";
import DataTable from "react-data-table-component";

class Orders2 extends Component {
  componentDidMount() {
    console.log(this.props.user)
    this.props.getOrders("UserID", this.props.user.id);
  }
  
  state = {
    Loading:false,
  }



  render() {
    
    if(this.props.user!="Loading" && this.state.Loading==false){
      this.props.getOrders("UserID", this.props.user.id);
      this.setState({
        Loading: true,
      })
    }

    const { orders } = this.props;
    console.log(orders);

    const columnas = [
      {
        name: "ID",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "CREATE",
        selector: (row) => (Date(row.createdAt)),
        sortable: true,
      },
      {
        name: "IDPAYPAL",
        selector: (row) => row.idPaypal,
        sortable: true,
      },
      {
        name: "PRICE",
        selector: (row) => row.price,
        sortable: true,
      },
      {
        name: "STATE ORDER",
        selector: (row) => row.stateOrder,
        sortable: true,
      },
      {
        name: "View Details",
        selector: (row) => (
          <Link to={`/OrderDetails/${row.id}`}>View Details</Link>
        ),
        sortable: true,
      },
    ];
    return (
      <div className={styles.cards}>
        {orders.length !== 0 ? (
          <DataTable
            columns={columnas}
            data={orders}
            title="Purchase order status"
          />
        ) : (
          /*  (
          orders.map((c) => (
            <Orders2Cards
              key={c.id}
              id={c.id}
              create={c.createdAt}
              idPaypal={c.idpurchase}
              price={c.price}
              stateOrder={c.stateOrder}
              stocks={c.stocks}
            />
          ))
        )  */
          <div className="cards">
            <h3 className={""}>
              You haven't made any purchases yet. Once you purchase an item, it
              will show up here.
            </h3>
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    orders: state.orders,
    user: state.user_login,
  };
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getcountries
  return {
    getOrders: (type, parameter) => dispatch(getOrders(type, parameter)),
    //changePaginatedPage: (page) => dispatch(changePaginatedPage(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders2);

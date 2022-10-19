import React, { Component } from "react";
import { connect } from "react-redux";
import { getStockbyID, searchNameProductID, CrearImagenCloudinary } from "../../redux/actions";
import { withRouter } from "react-router";
import axios from "axios";
import styles from "./ModifyItem.module.css";
import Swal from "sweetalert2";
import { async } from "@firebase/util";

const SizesArray = ["XS", "S", "M", "L", "XL"];

const putStocks = async (data) => {
  try {
    await axios.put(`${process.env.REACT_APP_URL_BACK}/stock/AddStocks`, data);
  } catch (error) {
    console.log(error);
  }
};

const changeProduct = async (id, type, data) => {
  try {
    await axios.put(`${process.env.REACT_APP_URL_BACK}/product/${id}?type=${type}`, data);
  } catch (error) {
    console.log(error);
  }
};

export class ModifyItem extends Component {
  constructor() {
    let objeto = SizesArray.reduce((a, v) => ({ ...a, [v]: false }), {});
    super();
    this.state = {
      checket: objeto,
      stocks: {},
      name: "",
      image: "",
      file: "",
      price: "",
    };
  }


  imageHandleChange(e) {
    if (e.target.files[0].type === "image/png") {
      
      const objectUrl = URL.createObjectURL(e.target.files[0])
      console.log(objectUrl);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = async () => {
         let objeto = {
          ...this.state,
          image: reader.result,
        };
        this.setState(objeto);
      }

      let objeto = {
        ...this.state,
        file: e.target.files[0],
      };

      this.setState(objeto);
    } else {
      Swal.fire({
        title: "Insert valid image",
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "Ok",
        icon: "error"
      })
    }
  };

  componentDidMount() {
    let Id = this.props.match.params.id;
    console.log(Id);
    this.props.searchNameProductID(Id);
  }

  componentWillUnmount() {
    this.props.searchNameProductID(0);
  }

  SelectSize(e) {
    let objeto = {
      ...this.state,
      checket: { ...this.state.checket, [e.target.value]: e.target.checked },
    };
    if (e.target.checked == false) {
      delete this.state.stocks[e.target.value];
    } else {
      if (this.props.products != undefined && this.props.products.length > 0) {
        let found = this.props.products[0].stocks.find(
          (element) => element.productSize == e.target.value
        );
        if (found !== undefined)
          objeto = {
            ...objeto,
            stocks: { ...this.state.stocks, [e.target.value]: found.stock },
          };
      }
    }
    this.setState(objeto);
  }

  ChangeStocks(e, elemento) {
    let objeto = {
      ...this.state,
      stocks: { ...this.state.stocks, [elemento]: e.target.value },
    };
    this.setState(objeto);
  }
  ChangeProp(valor, propiedad) {
    let objeto = { ...this.state, [propiedad]: valor };
    this.setState(objeto);
  }




  async Guardar() {

    if (this.props.products != undefined && this.props.products.length > 0) {
      Swal.fire({
        title: "Do you want to save these changes?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const foo = async () => {
            try {
              let objeto = {
                Sizes: this.state.stocks,
                idProduct: this.props.products[0].id,
              };
              await putStocks(objeto).then(console.log("cambio Stock Exitoso"));

              if (this.props.products[0].name != this.state.name)
                await changeProduct(this.props.products[0].id, "name", {
                  name: this.state.name,
                });
              if (this.props.products[0].price != this.state.price)
                await changeProduct(this.props.products[0].id, "price", {
                  price: this.state.price,
                });

              if (this.props.products[0].image !== this.state.image && this.state.file && this.state.file !== "") {
                const reader = new FileReader();
                reader.readAsDataURL(this.state.file);
                reader.onload = async () => {
                  await CrearImagenCloudinary(reader.result, this.props.products[0].name).then(e => {
                    console.log(e);
                    changeProduct(this.props.products[0].id, "image", {
                      image: e.data.url,
                    })
                  }
                  )
                }
              }
              Swal.fire({
                title: "successful change",
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: "Yes",
                denyButtonText: `No`,
                icon: "success"
              }).then((result) => {
                if (result.isConfirmed) {
                  this.props.history.push("/productsAdmin")
                }
              })
            } catch (error) {
              Swal.fire({
                title: error,
                icon: "error",
                button: "Ok",
              });
              console.log();
            }
          };
          foo();
        }
      });
    }
  }

  render() {
    console.log(this.props.products);
    console.log(this.state);

    var Sizes = [];
    for (const property in this.state.checket) {
      if (this.state.checket[property]) Sizes.push(property);
    }
    if (this.props.products != undefined && this.props.products.length > 0) {
      if (this.state.name == "")
        this.ChangeProp(this.props.products[0].name, "name");
      if (this.state.price == "")
        this.ChangeProp(this.props.products[0].price, "price");
      if (this.state.image == "")
        this.ChangeProp(this.props.products[0].image, "image");
    }

    return (
      <div className={styles.flexContainer}>
        {this.props.products != undefined && this.props.products.length > 0 ? (
          <div className={styles.container}>
            <div className={styles.imgContainer}>
              <img src={`${this.state.image}`} alt="Not found"></img>
            </div>

            <p>Name:</p>
            <label
              className={
                this.state.name !== this.props.products[0].name &&
                styles.ValueModify
              }
            ></label>
            <input
              id={"Name"}
              name={"Name"}
              value={this.state.name}
              onChange={(e) => this.ChangeProp(e.target.value, "name")}
            />

            <p>Image:</p>
            <label
              className={
                this.state.image !== this.props.products[0].image &&
                styles.ValueModify
              }
            ></label>
            <input
              id="Image"
              name="Image"
              type="file"
              onChange={(e) => this.imageHandleChange(e)}
            />

            <p>Price:</p>
            <label
              className={
                this.state.price !== this.props.products[0].price &&
                styles.ValueModify
              }
            ></label>
            <input
              type="number"
              id={"Price"}
              name={"Price"}
              value={this.state.price}
              onChange={(e) => this.ChangeProp(e.target.value, "price")}
            />

            <p className={styles.parrafo}>CHOOSE STOCKS AND ADD STOCKS</p>
            <nav>
              <label> Sizes</label>
              <ul className={styles.ulSizes}>
                {SizesArray.map((elemento) => {
                  return (
                    <li>
                      <p>
                        <input
                          type="checkbox"
                          id={elemento}
                          name={elemento}
                          value={elemento}
                          onChange={(e) => this.SelectSize(e)}
                        />
                        <label for={elemento}> {elemento}</label>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <nav>
              <ul className={styles.ulstock}>
                {Sizes.map((elemento) => {
                  console.log(this.state.stocks[elemento]);
                  return (
                    <li>
                      <p>
                        <label>Stocks {elemento}: </label>
                        <input
                          type="number"
                          min={0}
                          id={`Select${elemento}`}
                          name={elemento}
                          value={
                            this.state.stocks[elemento] == undefined
                              ? 0
                              : this.state.stocks[elemento]
                          }
                          onChange={(e) => this.ChangeStocks(e, elemento)}
                        />
                      </p>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <button className="btnGlobal" onClick={() => this.Guardar()}>
              Guardar Cambios
            </button>
          </div>
        ) : (
          "NO FOUND PRODUCT"
        )}
      </div>
    );
  }
}
const ModifyItemWithRouter = withRouter(ModifyItem);

function mapStateToProps(state) {
  return {
    products: state.productsId,
    stock_by_ID: state.stock_by_ID,
  };
}

function mapDispatchToProps(dispatch) {
  //pasandole al componente la posibilidad como props de hacer un dispatch de la function getProducts
  return {
    searchNameProductID: (id) => dispatch(searchNameProductID(id)),
    CrearImagenCloudinary: (image) => dispatch(CrearImagenCloudinary(image)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModifyItemWithRouter);

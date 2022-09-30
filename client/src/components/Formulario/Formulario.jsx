import React from "react";
import { useHistory } from "react-router-dom";
import style from "./Formulario.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CreateNewProduct } from "../../redux/actions";
import swal from "sweetalert";
import {
  getCategorys,
} from "../../redux/actions";

// instalar sweetalert y usarla, crear nuevos inputs: talle, y stock

// validacion de errores
function validate(input) {
  let errores = {};
  let priceValidate;
  function isNumeric(value) {
    return /^-?\d+$/.test(value);
  }
  // for (let i = 0; i < input.price.length; i++) {
  //     let index = input.price.charAt(i)
  //     if(index>='0' && index<='9'){
  //         priceValidate = true
  //     } else {
  //         priceValidate = false
  //     }
  // }
  /*      NAME      */

  if (!input.name) {
    errores.name = "Name Product is required";
  } else if (input.name.length < 3) {
    errores.name = "The name must contain at least 3 letters";
  } else if (/^\s+$/.test(input.name)) {
    errores.name = "The name cannot be a blank space";
  } else if (!/^[a-zA-Z ]*$/.test(input.name)) {
    errores.name = "The name must only contain letters";
  } else if (input.name.startsWith(" ")) {
    errores.name = "Dont input blank spaces";
  } else if (input.name.endsWith(" ")) {
    errores.name = "Dont input blank space";
  } else if (input.price === null) {
    /*      PRICE         */
    errores.price = "The Price is required";
  } else if (input.price < 0) {
    errores.price = "The price must be a positive number";
  } else if (input.price.length === 0) {
    errores.price = "The Price is required";
  } else if (!isNumeric(input.price)) {
    errores.price = "The price must be a positive number";
  } else if (!input.image) {
    /*    IMG    */
    errores.image = "URL Image is required";
  } else if (input.image.length < 5) {
    errores.image = "The URl must contain at least 5 letters";
  } else if (/^\s+$/.test(input.image)) {
    errores.image = "The URL cannot be a blank space";
  } else if (input.image.includes("https://")) {
    errores.image = "The URL must not contain the text 'https://'";
  } else if (input.image.includes("http://")) {
    errores.image = "The URL must not contain the text 'http://'";
  } else if (input.image.startsWith(" ")) {
    errores.image = "Dont input blank spaces";
  } else if (input.image.endsWith(" ")) {
    errores.image = "Dont input blank space";
  } else if (!input.brand) {
    /*    BRAND   */
    errores.brand = "Brand name is required";
  } else if (input.brand.length < 3) {
    errores.brand = "The Brand name must contain at least 3 letters";
  } else if (/^\s+$/.test(input.brand)) {
    errores.brand = "The Brand name cannot be a blank space";
  } else if (!/^[a-zA-Z ]*$/.test(input.brand)) {
    errores.brand = "The Brand name must only contain letters";
  } else if (input.brand.startsWith(" ")) {
    errores.brand = "Dont input blank spaces";
  } else if (input.brand.endsWith(" ")) {
    errores.brand = "Dont input blank space";
  }

  /*      DESCRIPTION      */

  else if (!input.description) {
    errores.description = "the description is required";
  } else if (input.description.length < 20) {
    errores.description = "The description must contain at least 20 letters";
  } else if (/^\s+$/.test(input.description)) {
    errores.description = "The description cannot be a blank space";
  } else if (input.description.startsWith(" ")) {
    errores.description = "Dont input blank spaces";
  } else if (input.description.endsWith(" ")) {
    errores.description = "Dont input blank space";
  }



  /*      SOTCK           */
  // else if (input.stock === 0) {
  //   errores.stock = "Stock is not 0";
  // }

  // else if (input.stock < 0) {
  //   errores.stock = "Stock is not less than 0";
  // }

  /*   GENDER     */
  // else if (input.gender === "Men" && input.categoryId === 8799 ||
  //     input.gender === "Men" && input.categoryId === 3630 ||
  //     input.gender === "Men" && input.categoryId === 9263 ||
  //     input.gender === "Men" && input.categoryId === 4169 ||
  //     input.gender === "Men" && input.categoryId === 2641) {
  //     errores.brand = "el genero elegido no tiene esa categoria, revisala de nuevo"
  // }

  // console.log(input.countries.length)
  return errores; // retornamos lo errores
}

function Formulario() {
  const dispatch = useDispatch();
  const categorys = useSelector((state) => state.categorys);
  const [error, SetErrors] = useState({});
  const history = useHistory();
  const initialState = {
    id: Math.floor(Math.random() * 1000),
    name: "",
    price: "",
    image: "",
    brand: "",
    gender: "",
    categoryId: undefined,
    NewCategory: "",
    description: "",
    nameCategory: "",
    categorysGender: [],
  };
  const [input, SetInput] = useState(initialState);

  function handleChange(e) {
    e.preventDefault();
    SetInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    SetErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    dispatch(getCategorys());
    let CategorysG = categorys.filter(element => element.gender === e.target.value);

    SetInput({
      ...input,
      categorysGender: CategorysG,
      gender: e.target.value,
      nameCategory: "Disable",
    });
  }

  function handleSelectCategory(e) {
    if (input.categoryId === "Create") {
      SetInput({
        ...input,
        categoryId: undefined,
      })
    } else {
      SetInput({
        ...input,
        nameCategory: e.target.value,
        NewCategory: e.target.value,
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      input.description &&
      input.name &&
      input.price &&
      input.image &&
      input.brand &&
      input.gender &&
      input.nameCategory
    ) {
      dispatch(CreateNewProduct({
        name: input.name,
        price: input.price,
        image: input.image,
        brand: input.brand,
        gender: input.gender,
        nameCategory: input.nameCategory,
        description: input.description,
      }));
      swal({
        title: "Product created successfully!",
        icon: "success",
        button: "Ok",
      });
      SetInput(initialState);
      history.push("/");
    } else alert(" missing data for the creation of a new product");
  }
  //comprobacion de INPUT

  function comprobacionInput(input) {
    console.log("entrar input comprobacion")
    if (
      input.name &&
      input.price &&
      input.image &&
      input.brand &&
      input.gender &&
      input.nameCategory
    ) {
      return true;
    } else {
      return false;
    }
  }

  // AUMENTAR STOCK

  function handleAumentar(e) {
    e.preventDefault();
    SetInput({
      ...input,
      stock: input.stock += 1
    });
    SetErrors(
      validate({
        ...input,
        stock: input.stock
      }));
  }

  // DISMINUIR STOCK

  function handleDecrementar(e) {
    e.preventDefault();
    SetInput({
      ...input,
      stock: input.stock -= 1
    });
    SetErrors(
      validate({
        ...input,
        stock: input.stock
      }))
  }

  //  TALLE 

  function handleSelectSize(e) {
    SetInput({
      ...input,
      size: e.target.value,
    });
  }

  //Create new categoria 

  function handleChangeCate(e) {
    e.preventDefault();
    SetInput({
      ...input,
      categoryId: e.target.value,
    });
    // SetErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  }

  function CreateNewCategory(e) {
    e.preventDefault();
    input.categorysGender.push({
      id: 2341, // cambiar id por numero random o en la base de datos 
      name: input.categoryId,
      gender: input.gender
    });
    SetInput({
      ...input,
      NewCategory: "undefined",
    })
  }

  useEffect(() => {
    dispatch(getCategorys());
    let CategorysG = categorys.filter(element => element.gender === input.gender);

    SetInput({
      ...input,
      categorysGender: CategorysG,
    });
  }, [dispatch]);


  console.log(input.categorysGender)
  return (
    < div className={style.containerMain} >
      {console.log(error)}
      <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
        <h2 className={style.titulo}>Product creation</h2>
        {console.log(input)}
        <div>
          <p>Name:</p>
          {error.name && ( // si hay un error hara un <p> nuevo con el error
            <p className={style.error}>{error.name}</p>
          )}
          <input
            type="text"
            value={input.name}
            className={style.field}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <p>Price: </p>
          {error.price && ( // si hay un error hara un <p> nuevo con el error
            <p className={style.error}>{error.price}</p>
          )}
          <input
            type="number"
            min="0"
            step="25"
            className={style.field}
            value={input.price}
            name="price"
            onChange={handleChange}
          />
        </div>

        <div>
          <div>
            <p>Img:</p>
            {error.image && ( // si hay un error hara un <p> nuevo con el error
              <p className={style.error}>{error.image}</p>
            )}
            <input
              type="text"
              value={input.image}
              className={style.field}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <p>brand:</p>
            {error.brand && ( // si hay un error hara un <p> nuevo con el error
              <p className={style.error}>{error.brand}</p>
            )}
            <input
              type="text"
              value={input.brand}
              className={style.field}
              name="brand"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className={style.select}>
          {input.gender.length === 0 && ( // si hay un error hara un <p> nuevo con el error
            <p className={style.error}>{"choose a gender"}</p>
          )}
          <p>Select Gender:</p>
          <select className={style.select} onChange={(e) => handleSelect(e)}>
            <option selected disabled>
              Select Gender
            </option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        <div>
          <p>Select Category:</p>


          <div className={style.select}>
            {input.categoryId === null && ( // si hay un error hara un <p> nuevo con el error
              <p className={style.error}>{"choose a category"}</p>
            )}
            {/*<select
                className={style.select}
                onChange={(e) => handleSelectCategory(e)}
              >
                <option selected disabled>
                  Select Category
                </option>
                <option value="4208">Jeans</option>
                <option value="7078">Shorts</option>
                <option value="3602">Shirts</option>
                <option value="5668">Hoodies & Sweatshirts</option>
                <option value="14274">Sweatpants</option>
          </select>*/}

            <select value={input.nameCategory} className={style.select} onChange={(e) => handleSelectCategory(e)}>
              <option selected disabled value={"Disable"} > Select Category</option>
              {input.categorysGender.map((elemento) => {
                return (
                  <option key={elemento.id} value={elemento.name}>{elemento.name}</option>)
              })
              }
              <option className={style.optionCreate} key={"Create"} value={"Create"} >Create Category</option>
            </select>
          </div>

          {/* CREAR NUEVA CATEGORY */}

          {input.NewCategory === "Create" && ( // si hay un error hara un <p> nuevo con el error
            <div className={style.containerCrate}>
              <input
                type="text"
                value={input.categoryId}
                name="categoryId"
                className={style.fieldCreate}
                placeholder="New Category"
                onChange={(e) => handleChangeCate(e)}
              />
              <button className={style.buttonCreateCategory} onClick={(e) => CreateNewCategory(e)}>Create category</button>
            </div>
          )}

          {/* DESCRIPTION */}
          <section className={style.ContainTextarea}>
            <p>Description: </p>
            {error.description && ( // si hay un error hara un <p> nuevo con el error
              <p className={style.error}>{error.description}</p>
            )}
            <textarea
              name="description"
              value={input.description}
              onChange={(e) => handleChange(e)}
              className={style.contactTextarea}
              placeholder="Description Product"
              cols="30"
              rows="8">
            </textarea>
          </section>


          {/* STOCK */}
          {    /*
          <p className={style.stockTitle}>Create Stock:</p>
          <div className={style.stockContainerPrincipal}>
            <p className={style.stockNumberContain}>stock Product:  <span className={style.stockNumber}>{input.stock}</span></p>
            {error.stock && ( // si hay un error hara un <p> nuevo con el error
              <p className={style.error}>{error.stock}</p>
            )}
            <section>
              <button className={style.buttonStock} onClick={(e) => handleAumentar(e)}>+</button>
              <button className={style.buttonStock} onClick={(e) => handleDecrementar(e)} >-</button>
            </section>
          </div>

          {/* TALLE */}
          {/*    
          <div className={style.select}>
            {input.size.length === 0 && ( // si hay un error hara un <p> nuevo con el error
              <p className={style.error}>{"choose a Size"}</p>
            )}
            <p>Select Size:</p>
            <select className={style.select} onChange={(e) => handleSelectSize(e)}>
              <option selected disabled>
                Select size
              </option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>
                */}

          {/* BUTTON */}
          {Object.keys(error).length === 0 && comprobacionInput(input) ? (
            <button
              className={style.submit}
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Create New Product
            </button>
          ) : (
            <p className={style.todosCampos}>
              You must fill in all the fields, to be able to Create your product
            </p>
          )}

          {/* <button className={style.submit} type='submit' onClick={(e) => handleSubmit(e)}>Create New Product</button> */}
        </div>
      </form>
    </div >
  );
}

export default Formulario;

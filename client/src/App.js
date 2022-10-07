/* import "./App.css"; */
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Details from "./components/Details/Details";
import Landing from "./components/Landing/Landing";


// import ErrorPage from "./components/ErrorPage/ErrorPage";
// import Formulario from "./components/Formulario/Formulario";
// // register
// import Register from "./components/Register/Register.jsx";
import Footer from "./components/Footer/Footer.jsx";

import About from "./components/About/About.jsx";
import ComponentProducts from "./components/ComponentProducts/ComponentProducts.jsx";
import Register from "./Pages/Register/Register"
import CreateProduct from "./components/CreateProduct/CreateProduct.jsx";

import Login from "./components/Login/Login"
import Carry from "./components/Carry/Carry";
import Contact from "./components/Contact/Contact";
import { ObtenerLogin } from "./redux/actions";
// import ComponentProductsGestion from "./components/ComponentProductsGestion/ComponentProductsGestion";
// import GoogleLogin from "react-google-login";
// import Login from "./components/Login/Login";
 //import payment from "./components/Pago/Pay";
// import Profile from "./components/Profile/Profile";
// import ModifyItem from "./components/ModifyITem/ModifyItem";
// import UsersAdmin from "./components/UsersAdmin/UsersAdmin";
// import AdminOrders from "./components/AdminOrders/AdminOrders.tsx";
// import Favorites from "./components/Favs/Favorites";
// import ModifyUser from "./components/ModifyUser/ModifyUser";
// import ModifyUserImage from "./components/ModifyUser/ModifyUserImage";
// import ModifyUserPassword from "./components/ModifyUser/ModifyUserPassword";
// import NavUser from "./components/NavUser/NavUser.jsx";
// import Orders2 from "./components/Orders/Orders2";
// import OrdersDetails from "./components/Orders/OrdersDetails";

// // login Google
// import LoginGoogle from "./components/Login/Login Google/LoginGoogle";

// import styles from "./App.module.css";
// import AdminDetailOrder from "./components/AdminOrders/AdminDetailOrder.jsx";
 import FormDelivery from "./components/PasarelaDePago/FormularioContactoDelivery";
import MethodPay from "./components/PasarelaDePago/ResumenMetododeCompra";



function App() {
  const dispatch = useDispatch()
  const user_login = useSelector((state) => state.user_login);

  useEffect(() => {
    if (user_login === "Loading"){
      dispatch(ObtenerLogin())
    }
  }, [])

	return (
		<div >
				{/* nav bar */}
				<NavBar />
				<Switch>
					<Route exact path="/">
						<Landing />{" "}
					</Route>
					{/* <Route exact path="/gestionProducts">
						<ComponentProductsGestion />{" "} */}
						{/*Se pone asi porque los componentes estan creadas como Clase*/}
					 {/* </Route> */}
					<Route exact path="/products/:gender">
						<ComponentProducts />{" "} 
						{/*Se pone asi porque los componentes estan creadas como Clase*/} 
					</Route>
					<Route exact path="/create">
						<CreateProduct />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
					<Route exact path="/login">
						<Login/>
					</Route>
                     {/*
					<Route exact path="/profile" component={Profile} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/createProduct" component={Formulario} />{" "} */}
					{/*Se pone asi porque los componentes estan creadas como Funcion*/}
					<Route exact path="/about" component={About}></Route>
          <Route path="/carry">
						<Carry />{" "}
					</Route>
          <Route exact path="/contact" component={Contact}></Route>
					{/*  
					<Route exact path="/LoginGoogle" component={LoginGoogle} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/prueba" component={Map} />
					<Route path={"/Favorites"} component={Favorites}></Route>
					<Route path={"/ModifyUser"} component={ModifyUser}></Route>
					<Route path={"/ModifyUserImage"} component={ModifyUserImage}></Route>
					<Route
						path={"/ModifyUserPassword"}
						component={ModifyUserPassword}
					></Route> */}
					{/*<Route exact path="/adminOrders" component={AdminOrders}></Route>*/}
					<Route exact path="/FormDelivery" component={FormDelivery}></Route>
					 <Route exact path="/MethodPay" component={MethodPay}></Route>
					{/*<Route exact path="/payment" component={payment} />
					<Route exact path="/orders" component={Orders2} />
					<Route path="/OrderDetails/:id" component={OrdersDetails} />
					<Route path="/AdminDetailOrder/:id" component={AdminDetailOrder} />
					<Route exact path="/usersAdmin" component={UsersAdmin} />
					<Route exact path="/modifyProduct/:id" component={ModifyItem} />
					<Route component={ErrorPage}></Route> */}
          {/* Componentes recien generados */}
					<Route path="/details/:id" component={Details}></Route>{" "}
				</Switch>
			{/* </UserContextProvider> */}
			<Footer />
		</div>
	);
}

//  const respuestaGoogle = (respuesta) =>{
//   console.log(respuesta)
//  }
// <GoogleLogin
//   clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
//   buttonText="Login"
//   onSuccess={responseGoogle}
//   onFailure={responseGoogle}
//   cookiePolicy={'single_host_origin'}
// />

export default App;

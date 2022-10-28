import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Details from "./components/Details/Details";
import Landing from "./components/Landing/Landing";
import OrdersDetails from "./components/Orders/OrdersDetails";
import Orders from "./components/Orders/Orders2.jsx";
import OrdersAdmin from "./components/OrdersAdmin/OrdersAdmin.jsx";
import ProductsAdmin from "./components/ProductsAdmin/ProductsAdmin.jsx";
import ProfileUserAdmin from "./components/UserAdmin/Profile.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Favorites from "./components/Favs/Favorites";
import About from "./components/About/About.jsx";
import ComponentProducts from "./components/ComponentProducts/ComponentProducts.jsx";
import Register from "./Pages/Register/Register"
import CreateProduct from "./components/CreateProduct/CreateProduct.jsx";
import Forgot from "./components/ForgotPassword/forgot.jsx"
import Reset from "./components/ForgotPassword/reset.jsx"
import Login from "./components/Login/Login"
import Carry from "./components/Carry/Carry";
import Contact from "./components/Contact/Contact";
import { ObtenerLogin } from "./redux/actions";
import UserAdmin from "./components/UserAdmin/userAdmin.jsx";
import Profile from "./components/Profile/Profile";
import EditProfileFormulary from "./components/Profile/EditProfileFormulary2.jsx";
import ModifyItem from "./components/ModifyITem/ModifyItem.jsx";
import OrdersDetailsAdmin from "./components/OrdersAdmin/OrdersDetails.jsx";
import Pasarela from "./components/PasarelaDePago/Pasarela";
import Loader from "./components/Loader/Loader.jsx";



function App() {
	const dispatch = useDispatch()
	const user_login = useSelector((state) => state.user_login);

	useEffect(() => {
		if (user_login === "Loading") {
			dispatch(ObtenerLogin())
		}
	}, [])

	return (
		<div >
			<AuthProvider>
				<NavBar />
				<Switch>
					<Route exact path="/">
						<Landing />{" "}
					</Route>	
					<Route exact path="/products/:gender">
						<ComponentProducts />{" "}
						{/*Se pone asi porque los componentes estan creadas como Clase*/}
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/forgot" component={Forgot} />
					<Route path="/reset/:token" component={Reset} />
					<Route exact path="/about" component={About}></Route>
					<Route path="/carry">
						<Carry />{" "}
					</Route>
					<Route exact path="/contact" component={Contact}></Route>
					<Route exact path="/profile" component={Profile} />
					<Route path="/details/:id" component={Details}></Route>{" "}

                    
					{(user_login === "Loading" || user_login.typeUser === "Admin")?
					(<Switch>
					<Route exact path="/createProduct"> {user_login==="Loading" ? Loader : <CreateProduct />}</Route>
					<Route path="/usersAdmin" component={user_login==="Loading" ? Loader : UserAdmin} />
					<Route path="/ordersAdmin" component={user_login==="Loading" ? Loader : OrdersAdmin} />
					<Route path="/productsAdmin" component={user_login==="Loading" ? Loader : ProductsAdmin} />
					<Route path="/orderAdminDetail/:id" component={user_login==="Loading" ? Loader : OrdersDetailsAdmin} />
					<Route exact path="/userAdminDetail/:id" component={user_login==="Loading" ? Loader : ProfileUserAdmin} />
					<Route path={"/productEdit/:id"} component={user_login==="Loading" ? Loader : ModifyItem} />
					</Switch>) 
					: 
					(user_login === "Loading" || user_login.typeUser === "User")?
					(<Switch>
					<Route path={"/favorites"} component={Favorites}></Route>
					<Route exact path="/pasarela"><Pasarela /></Route>
					<Route path="/OrderDetails/:id" component={OrdersDetails} />
					<Route path="/OrdersUser" component={Orders} />
					<Route exact path="/editProfileFormulary" component={EditProfileFormulary} />
					</Switch>) : <Redirect to="/"/>}
                     
				</Switch>
				<Footer />
			</AuthProvider>
		</div>
	);
}


export default App;
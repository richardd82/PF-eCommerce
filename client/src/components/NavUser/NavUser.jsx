import { BiUser } from "react-icons/bi";
import { IconContext } from "react-icons";
import Style from "./NavUser.module.css"
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/actions";
import { useAuth } from "../../context/authContext";

function NavUser() {
  //login Google
  const { logout, user } = useAuth();
  const user2 = useSelector((state) => state.user_login);

  const handleLogout = async () => {
    try {
      await logout()
      dispatch(Logout());
    } catch (error) {
      console.error(error.message);
    }
  };




  // login email
  const dispatch = useDispatch()

  // function OnLogout() {

  // }
  console.log(user2)

  return (
    <div className={Style.navbar}>
      <div className={Style.dropdown}>

        <button className={Style.dropbtn} >
          {user2.image == undefined ? <IconContext.Provider value={{ color: 'white', size: '25px' }}>
            <BiUser />
          </IconContext.Provider> : <img style={{ width: "30px" }} src={user2.image} />}
          <i className={Style.fa_fa_caret_down}></i>
        </button>
        <div className={Style.dropdown_content}>
          <a href="#" onClick={handleLogout}>Logout</a>
          <a href="/profile">Profile</a>
          {
            user2 !== false && (user2.isAdmin === false) &&
            <a href={`/OrdersUser`}>Your Orders</a>
          }
          {
            user2 !== false && (user2.isAdmin === true) &&
            <div>
              {/*<a href="/gestionProducts">Administracion Productos</a>
          <a href="/usersAdmin">Administracion Usuarios</a>
          <a href="/adminOrders">Administracion Ventas</a>*/}
              <a href="/create">Create Product</a>
            </div>
          }
          {/*<a href="#">Link 2</a>
          <a href="#">Link 3</a>*/}
        </div>
      </div>
    </div>
  );
}

export default NavUser;

//aca

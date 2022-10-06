import { BiUser } from "react-icons/bi";
import { IconContext } from "react-icons";
import Style from "./NavUser.module.css"
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/actions";
//import { useAuth } from "../../context/authContext";

function NavUser() {
  //login Google
 // const { logout, user } = useAuth();
  const user2 = useSelector((state) => state.user_login);

  const handleLogout = async () => {
    try {
      dispatch(Logout());
    } catch (error) {
      console.error(error.message);
    }
  };




  // login email
  const dispatch = useDispatch()

  // function OnLogout() {

  // }


  return (
    <div className={Style.navbar}>
      <div className={Style.dropdown}>

        <button className={Style.dropbtn} >
          <IconContext.Provider value={{ color: 'white', size: '25px' }}>
            <BiUser />
          </IconContext.Provider>
          <i className={Style.fa_fa_caret_down}></i>
        </button>
        <div className={Style.dropdown_content}>
          <a href="#" onClick={handleLogout}>Logout</a>
          <a href="/profile">Profile</a>
          {
           user2 !== false &&  (user2.admin === true) &&
          <div>
          <a href="/gestionProducts">Administracion Productos</a>
          <a href="/usersAdmin">Administracion Usuarios</a>
          <a href="/adminOrders">Administracion Ventas</a>
          <a href="/createProduct">Create Product</a>
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

import { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction, put_User_Login, LoginGoogleUser } from "../../redux/actions";
import { useAuth } from "../../context/authContext";
const { REACT_APP_URL_BACK } = process.env;
import style from "./Login.module.css";
import Swal from "sweetalert2";
import axios from "axios";

/*
function validate(input) {
    let errors = {};

    let usernameValidator = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
    let passwordValidator = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/

    if (!input.username || usernameValidator.test(input.username) === false)
        errors.uesrname = 'It should have between 6 and 18 characters, only contain letter,number'
    else if (!input.password || passwordValidator.test(input.password) === false)
        errors.password = 'Password must have, one digit, one lowercase character, one uppercase character and be at least 8 characters in length but no more than 20'
    return errors
}*/

export default function Login(props) {

  const dispatch = useDispatch()
  const history = useHistory()
  const userLog = useSelector((state) => state.user_login);
  //const [errors, setErrors] = useState({})
  //const [user, setUser] = useState(null)
  const { googleLogin, user } = useAuth()

  const [input, setInput] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    if (userLog !== false && userLog !== "Loading") {
      console.log("Entra aca")
      props.close(false)
      history.push('/')
    }
    /* const loggedUserJSON = window.localStorage.getItem('loggedHenryApp')
     if (loggedUserJSON) {
         const user = JSON.parse(loggedUserJSON)
         if (user.auth) {
             history.push('/')
         } else {
             console.log(user)
             setUser(user)
         }
     }*/
  }, [])

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    /* setErrors(
         validate({
             ...input,
             [e.target.name]: e.target.value,
         })
     )*/
  }

  function handleClose() {
    console.log("Entra aca")
    props.close(false)
  }

  function changePageCreateAccount(e) {
    e.preventDefault();
    console.log("Entra aca")
    props.close(false)
    history.push("/register")
  }


  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await dispatch(loginAction(input))
      if (user === undefined) {
        Swal.fire({
          customClass: {
            container: `${style.myswal}`
          },
          title: `User or password invalid`,
          icon: "warning",
        });
      } else {
        console.log("Entra aca")
        props.close(false)
        Swal.fire({
          title: `User successfully sign in`,
          position: "center",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        dispatch(put_User_Login(user))
        /*window.localStorage.setItem(
            'loggedHenryApp', JSON.stringify(user)
        )*/
        // setUser(user)
        /*setInput({
            username: '',
            password: '',
        })*/
        history.push('/')
      }
    } catch (error) {
      console.log(error)
    }

  }

  const register = async (user) => {
    console.log("entra ACA")
    let nombreSep = user.displayName.split(" ");

    let name = nombreSep[0]
    var lastname = "";
    if (nombreSep.length == 2)
      lastname = nombreSep[1]
    else
      if (nombreSep.length == 3)
        lastname = nombreSep[1].concat(" ", nombreSep[2])
      else
        if (nombreSep.length >= 4) {
          name = nombreSep[0].concat(" ", nombreSep[1])
          lastname = nombreSep[2].concat(" ", nombreSep[3])
        }

    const { uid, email, photoURL } = user;
    console.log('USER_LOGIN', user)
    return await axios
      .post(`${REACT_APP_URL_BACK}/auth/google`, {
        username: email,
        name: name,
        email: email,
        password: uid,
        lastName: lastname,
        image: photoURL,
        address: "Need to complete",
      })
      .then((response) => {
        console.log("Entra aca")
        props.close(false)
        console.log("respuesta ", response);
        dispatch(LoginGoogleUser({ userForToken: response.data.userValidate[0], token: response.data.token }))
      });

  };
  const handleForgot = () => {
    history.push("/forgot");
    location.reload();
  }

  if (user) {
    console.log(user.providerData[0])
    register(user.providerData[0])
  }

  const handleGoogleSignIn = async () => {

    try {
      await googleLogin().then(e => {
        if (user) {
          console.log(user, "  ", e)
          register(user.providerData[0])
        }
      })
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className={style.loginContainer}>
      <div className={style.login}>
        <button className={style.btnClose} onClick={(e) => handleClose(e)}><b>X</b></button>
        <h1>Login</h1>
        <label>Username:</label>
        <input type="input" name="username" onChange={(e) => handleChange(e)} placeholder="UserName" />
        <label>Password:</label>
        <input type="password" name="password" onChange={(e) => handleChange(e)} placeholder="Password" />
        <Link onClick={() => handleForgot()} className={style.forgotPswd}>Forgot your password?</Link>
        <button className={style.btnLoginModal} onClick={(e) => handleLogin(e)}>LOGIN</button>
        <p>Or log using google:</p>
        {/* <LoginGoogle />*/}
        <button onClick={() => handleGoogleSignIn()} className={style.loginGoogle}></button>
      </div>
      <hr />
      <div className={style.createAcc}>
        <button className={style.btnLoginModal} onClick={(e) => changePageCreateAccount(e)}>CREATE ACCOUNT</button>
      </div>
    </div>
  )
}

import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginAction } from "../../redux/actions";

function validate(input){
    let errors = {};

    let usernameValidator = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
    let passwordValidator = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
   
    if (!input.username || usernameValidator.test(input.username) === false)
    errors.uesrname = 'It should have between 6 and 18 characters, only contain letter,number'
    else if (!input.password || passwordValidator.test(input.password) === false)
    errors.password = 'Password must have, one digit, one lowercase character, one uppercase character and be at least 8 characters in length but no more than 20'
    return errors
}

export default function Login(){

    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({})
    const [user, setUser] = useState(null)

    const [input, setInput] = useState({
        username: '',
        password: '',
    })

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedHenryApp')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            if(user.auth){
              history.push('/')
            }else{
                console.log(user)
                setUser(user)
            }
        }
    },[])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(
            validate({
              ...input,
              [e.target.name]: e.target.value,
            })
        )
    }


    const handleLogin = async(e) => {
        e.preventDefault()

        try {
            const user = await dispatch(loginAction(input))
            if(user === undefined){
                alert('User or password invalid')
            }else{
            alert('User successfully sign in')
            console.log(user)
            window.localStorage.setItem(
                'loggedHenryApp', JSON.stringify(user)
            )
            setUser(user)
            setInput({
                username: '',
                password: '',
            })
             history.push('/')    
        }
        } catch (error) {
            console.log(error)
        }
        
    }

    return(
            <div>
            <form>
                <div>
                    <label>Username:</label>
                    <input
                    type='input'
                    value={input.username}
                    name= 'username' 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.username && (
                        <p>{errors.username}</p>
                    )}
                </div>
                <div>
                <label>Password:</label>
                    <input
                    type='password'
                    value={input.password}
                    name= 'password' 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.password && (
                        <p>{errors.password}</p>
                    )}
                </div>
                <button type="submit" onClick={(e) => handleLogin(e)}>Login</button>    
            </form>
            </div>
    )    
}
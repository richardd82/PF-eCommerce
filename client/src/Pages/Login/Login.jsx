import { useState } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from "../../redux/actions";

function validate(input){
    let errors = {};

    let usernameValidator = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
    let passwordValidator = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
   
    if (!input.username || usernameValidator.test(input.username) === false)
    errors.attack = 'It should have between 6 and 18 characters, only contain letter,number'
    else if (!input.password || passwordValidator.test(input.password) === false)
    errors.password = 'Password must have, one digit, one lowercase character, one uppercase character and be at least 8 characters in length but no more than 20'
    return errors
}

export default function PokemonCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        username: '',
        password: '',
    })

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


    function handleSubmit(e){
        e.preventDefault()
        
            dispatch(login(input))
            alert('User successfully sign in')
            setInput({
                username: '',
                password: '',
            })
            history.push('/')    
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

              {
                !Object.keys(errors).length ?
                (<button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>) :
                (<button hidden='true'>Submit</button>)
              } 
            </form>
            </div>
    )    
}

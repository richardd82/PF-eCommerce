import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from "../../redux/actions";

function validate(input){
    let errors = {};

    let urlValidator = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/
    let emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let usernameValidator = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
    let passwordValidator = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
   
    if (!input.email || emailValidator.test(input.email) === false)
    errors.life = 'Please Enter a valid email direction'
    else if (!input.username || usernameValidator.test(input.username) === false)
    errors.attack = 'It should have between 6 and 18 characters, only contain letter,number'
    else if (!input.name || input.name < 1 || input.name > 20)
    errors.defense = 'It should have between 2 and 20 characters'
    else if (!input.lastName || input.lastName < 1 || input.lastName > 20)
    errors.speed = 'It should have between 2 and 20 characters'
    else if (!input.password || passwordValidator.test(input.password) === false)
    errors.password = 'Password must have, one digit, one lowercase character, one uppercase character and be at least 8 characters in length but no more than 20'
    else if (!input.confirmPass || input.password !== input.confirmPass)
    errors.confirmPass = 'Check that you have entered your password correctly'
    else if (!input.phone)
    errors.height = 'Please enter your phone number'
    else if (!input.address)
    errors.weight = 'Please enter your address'
    else if (!input.image || urlValidator.test(input.image) == false) 
    errors.image = 'Image cannot be null or incorrect (png, gif, jpg)'

    return errors
}

export default function PokemonCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        email: '',
        username: '',
        name: '',
        lastName: '',
        password: '',
        confirmPass: '',
        phone: '',
        address: '',
        image: '',
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
        
            dispatch(register(input))
            alert('User successfully created')
            setInput({
                email: '',
                username: '',
                name: '',
                lastName: '',
                password: '',
                confirmPass: '',
                phone: '',
                address: '',
                image: '',
            })
            history.push('/home')    
    }

    return(
        <div>
            <div>
            <form>
                <div>
                    <label>Name:</label>
                    <input
                    type='text'
                    value={input.name}
                    name= 'name' 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                    type='text'
                    value={input.lastName}
                    name= 'lastName' 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.lastName && (
                        <p>{errors.lastName}</p>
                    )}
                </div>
                <div>
                    <label>Username:</label>
                    <input
                    type='text'
                    value={input.username}
                    name= 'username' 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.username && (
                        <p>{errors.username}</p>
                    )}
                </div>
                <div>
                    <label>Email:</label>
                    <input
                    type='text'
                    value={input.email}
                    name= 'email' 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.email && (
                        <p>{errors.email}</p>
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
                <div>
                <label>Confirm password:</label>
                    <input
                    type='password'
                    value={input.confirmPass}
                    name= 'confirmPass' 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.confirmPass && (
                        <p>{errors.confirmPass}</p>
                    )}
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                    type='text'
                    value={input.phone}
                    name= 'phone' 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.phone && (
                        <p>{errors.phone}</p>
                    )}
                </div>
                <div>
                    <label>Address:</label>
                    <input
                    type='text'
                    value={input.address}
                    name= 'address' 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.address && (
                        <p>{errors.address}</p>
                    )}
                </div>
                <div>
                    <label>Image:</label> 
                    <input
                    type='text'
                    value={input.image}
                    name= 'image' 
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.image && (
                        <p>{errors.image}</p>
                    )}
                </div>
              {
                !Object.keys(errors).length ?
                (<button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>) :
                (<button hidden='true'>Submit</button>)
              } 
            </form>
            </div>
        </div>
    )    
}


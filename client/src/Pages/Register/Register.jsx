import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register, getAllUsers } from "../../redux/actions";
import Swal from "sweetalert2";

function validate(input, allUsers) {
    let errors = {};
    //const allUsers = useSelector((state) => state.allUsers)

    let urlValidator = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/
    let emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let usernameValidator = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){4,18}[a-zA-Z0-9]$/
    let passwordValidator = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/

    if (!input.email || emailValidator.test(input.email) === false)
        errors.email = 'Please Enter a valid email direction'
    else if (!input.username || usernameValidator.test(input.username) === false)
        errors.username = 'It should have between 4 and 18 characters, only contain letter,number'
    // else if (allUsers.includes(input.username) === true)
    // errors.username = 'Username already exists, please choose another'
    else if (!input.name || input.name < 1 || input.name > 20)
        errors.name = 'It should have between 2 and 20 characters'
    else if (!input.lastName || input.lastName < 1 || input.lastName > 20)
        errors.lastName = 'It should have between 2 and 20 characters'
    else if (!input.password || passwordValidator.test(input.password) === false)
        errors.password = 'Password must have, one digit, one lowercase character, one uppercase character and be at least 8 characters in length but no more than 20'
    else if (!input.confirmPass || input.password !== input.confirmPass)
        errors.confirmPass = 'Check that you have entered your password correctly'
    else if (!input.phone || isNaN(input.phone) === true)
        errors.phone = 'Please enter your phone number, must be a number without other characters'
    else if (!input.address)
        errors.address = 'Please enter your address'
    else if (!input.image || urlValidator.test(input.image) == false)
        errors.image = 'Image cannot be null or incorrect (png, gif, jpg)'

    return errors
}

export default function Register() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({})
    const allUsers = useSelector((state) => state.allUsers)
    console.log(allUsers)
    const [input, setInput] = useState({
        email: '',
        username: '',
        name: '',
        lastName: '',
        password: '',
        confirmPass: '',
        phone: null,
        address: '',
        image: '',
    })

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    function handleChange(e) {
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

    const usersNames = allUsers.map(n => {
        return n.username
    })
    console.log(usersNames)

    function handleSubmit(e) {
        e.preventDefault()
        console.log("ALLUSERS", allUsers)
        console.log("INPUT:username", input.username)
        if (usersNames.includes(input.username)) {
            alert(`The username ${input.username} is already registered. Please enter a different one`)
            setInput({
                email: '',
                username: '',
                name: '',
                lastName: '',
                password: '',
                confirmPass: '',
                phone: null,
                address: '',
                image: '',
            })
            history.push('/register')
        } else {
            register(input).then(e => {
                Swal.fire({
                    title: 'User successfully created',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: "Yes",
                    denyButtonText: `No`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push('/')
                    }
                })
            }).catch(e =>
                Swal.fire({
                    title: e.response.data,
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: "Yes",
                    denyButtonText: `No`,
                }).then((result) => { console.log(result)})
            )
        }
    }

    return (
        <div>
            <div>
                <form>
                    <div>
                        <label>Name:</label>
                        <input
                            type='text'
                            value={input.name}
                            name='name'
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
                            name='lastName'
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
                            name='username'
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
                            name='email'
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
                            name='password'
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
                            name='confirmPass'
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
                            name='phone'
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
                            name='address'
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
                            name='image'
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

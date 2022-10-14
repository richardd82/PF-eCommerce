import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetPassword } from "../../redux/actions";
import { Link } from "react-router-dom";

function validate(input) {
    let errors = {}

    let passwordValidator = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

    if (!input.password || passwordValidator.test(input.password) === false)
        errors.password = "one digit,lowercase, uppercase, min least 8 characters max 20";
    else if (!input.confirmPass || input.password !== input.confirmPass)
        errors.confirmPass = "Check that you have entered your password correctly";

    return errors    
}

export default function ResetPassword(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [input, setInput] = useState({
        password: "",
        confirmPass: "",
    })

    var token=history.location.pathname.slice(7,history.location.pathname.length);

    const [errors, setErrors] = useState({})

    // await axios.put(`${REACT_APP_URL_BACK}/auth/reset/${props.match.params.resetToken}` , password, {
    //     where: {
    //         resetToken: props.match.params.resetToken
    //     }
    // })
    
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

    function handleSubmit(e) {
        e.preventDefault()
        console.log(input)
        dispatch(resetPassword(input.password,token))
        setInput({
            password: "",
            confirmPass:""
        })
        alert("Password changed successfully")
        history.push("/")
    }
   
    console.log(props)
    return (
        <div>
            <form>
                <div>
                    <label>Your new assword:</label>
                </div>
                <input
                    type="password"
                    value={input.password}
                    name="password"
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                />
                <div>
                    {errors.password && <p>{errors.password}</p>}
                </div>

                <div>
                    <label>Confirm password:</label>
                </div>
                <input
                    type="password"
                    value={input.confirmPass}
                    name="confirmPass"
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                />
                <div>
                    {errors.confirmPass && <p className="errorRegister">{errors.confirmPass}</p>}
                </div>

                <button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >Submit
                </button>
            </form>
        </div>
    )
}

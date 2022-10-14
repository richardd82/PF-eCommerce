import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { forgotPassword } from "../../redux/actions"


export default function ForgotPassword() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [input, setInput] = useState({
        email: ""
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit(e) {
        e.preventDefault()
        console.log(input)
        dispatch(forgotPassword(input))
        setInput({
            email:""
        })
        alert("Check your email")
    }

    return (
        <div>
            <h2>Password recovery</h2>
            <h4>Inform the email address used to create your account</h4>
            <form>
                <input
                    type="text"
                    value={input.email}
                    name="email"
                    placeholder="email@email.com"
                    onChange={(e) => handleChange(e)}
                />

                <button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >Submit
                </button>
            </form>
        </div>
    )
}
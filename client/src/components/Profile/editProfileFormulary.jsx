import React, { useEffect, useState } from "react";
import style from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getAllUsers, putUser } from "../../redux/actions";



const EditProfileFormulary = () => {



    const allUsers = useSelector((state) => state.allUsers);
    const dispatch = useDispatch();
    const users = useSelector((state) => state.allUsers);
    const user_login = useSelector((state) => state.user_login);
    const [input, setInput] = useState({
        email: "",
        name: "",
        lastName: "",
        image: "",
        address: "",
        phone: null
    });
    console.log(user_login)
    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(deleteUsers())
    }, [dispatch]);

    const userConnected = users.find(user => user.id === user_login.id)
    const id = user_login.id;

    console.log(userConnected);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        // setErrors(
        //     validate({
        //         ...input,
        //         [e.target.name]: e.target.value,
        //     })
        // )
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(putUser(input, id))
        alert("usuario modificado")
    }


    return (

        <div className={style.mainContainer}>
            {userConnected ? (
                <div className={style.containCarry}>
                    <form>
                        <div >
                            <input type="text" className="form-control"
                             placeholder="Name" name="name"
                             onChange={(e) => handleChange(e)}
                              />
                              
                        </div>
                        <div >
                            <input type="text" className="form-control"
                             placeholder="Lastname" name="lastName"
                             onChange={(e) => handleChange(e)}
                             />
                        </div>
                        <div>
                            <input type="email" className="form-control"
                             placeholder="Email Address" name="email" 
                             onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <input type="address" className="form-control"
                             placeholder="Address" name="address" 
                             onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <input type="string" className="form-control"
                             placeholder="image" name="image" 
                             onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <input type="number" className="form-control"
                             placeholder="phone" name="phone" 
                             onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <button onClick={(e) => handleSubmit(e)}>Agregar o cambiar datos</button>
                    </form>
                </div>
            ) : (
                <div className="cards">
                    <p>
                        <b>{"No found Profile"}</b>
                    </p>
                </div>
            )
            }
        </div>
    )
};

export default EditProfileFormulary;

import React, { useEffect, useState } from "react";
import style from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getAllUsers } from "../../redux/actions";



const EditProfileFormulary = () => {


    const { editMode, setEditMode } = useState();
    const allUsers = useSelector((state) => state.allUsers);
    const dispatch = useDispatch();
    const users = useSelector((state) => state.allUsers);
    const user_login = useSelector((state) => state.user_login);


    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(deleteUsers())
    }, [dispatch]);

    const userConnected = users.find(user => user.id === user_login.id)

    console.log(userConnected);

    const onSubmit = () => {
        e.preventDefault();
        
    }

    return (

        <div className={style.mainContainer}>
            {userConnected ? (
                <div className={style.containCarry}>
                    <form>
                        <div >
                            <input type="text" className="form-control"
                             placeholder="Name" name="userConnected.name" />
                        </div>
                        <div >
                            <input type="text" className="form-control"
                             placeholder="Lastname" name="userConnected.Lastname" />
                        </div>
                        <div>
                            <input type="email" className="form-control"
                             placeholder="Email Address" name="userConnected.email" />
                        </div>
                        <div>
                            <input type="address" className="form-control"
                             placeholder="Address" name="userConnected.address" />
                        </div>
                        <div>
                            <input type="string" className="form-control"
                             placeholder="image" name="userConnected.image" />
                        </div>
                        <div>
                            <input type="number" className="form-control"
                             placeholder="phone" name="userConnected.phone" />
                        </div>
                        <button>Agregar o cambiar datos</button>
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

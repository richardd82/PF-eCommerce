import React, { useEffect, useState } from "react";
import style from "./Profile.module.css";
import ProfileCard from "./ProfileCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getAllUsers } from "../../redux/actions";






const EditProfileFormulary = () => {

    const { userData, setUserData } = useState();
    const { initialState, setInitialState } = useState();
    const { editMode, setEditMode } = useState();
    const allUsers = useSelector((state) => state.allUsers);
    const dispatch = useDispatch();
    const users = useSelector((state) => state.allUsers);
    const user_login = useSelector((state) => state.user_login);


    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(deleteUsers())
    }, [dispatch]);

    const userConected = users.find(user => user.id === user_login.id)
    console.log(userConected);
    return (

        <div className={style.mainContainer}>
            {userConected ? (
                <div className={style.containCarry}>
                    <div>
                        <ProfileCard
                            email={userConected.email}
                            name={userConected.name}
                            lastName={userConected.lastName}
                            image={userConected.image}
                            address={userConected.address}
                            isAdmin={userConected.isAdmin}
                        />
                    </div>
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

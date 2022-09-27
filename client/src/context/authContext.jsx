import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("There is not auth provider");
    return context;
}

export const googleLogin = () => {
    const googleProvider = new GoogleAuthProvider;
    return signInWithPopup(auth, googleProvider);
}


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const singup = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    useEffect(() => {
        const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log({ currentUser });
            setUser(currentUser);
            // setLoading(false);
        });
        return () => unsubuscribe();
    }, []);

    return <authContext.Provider value={{ singup, googleLogin, user, logout }}>{children}</authContext.Provider>;
};

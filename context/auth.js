import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react'
import { auth } from "../firebase";
export const AuthContext = React.createContext();
// import { signInWithEmailAndPassword } from "firebase/auth";

function AuthWrapper({ children }) {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log("onAuthStateChanged called");
            if (user) {
                setUser(user);
              }
              else {
                setUser('');
            }
        })
        setLoading(false);
    }, [])

    console.log("Hello in auth");
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function logout() {
        return signOut(auth);
    }
    function forgetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const store = {
        login,
        user,
        logout,
        forgetPassword,
        signup,
    };
    return (
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthWrapper
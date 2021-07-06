import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password, firstName, lastName) {
        return auth.createUserWithEmailAndPassword(email, password)
        .then((res) => res.user.updateProfile({displayName: firstName + " " + lastName}))
        .then(() => {
            console.log("Username successfully created");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    } 
    
    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, []);

    auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
    })

    const value = {
        currentUser,
        login,
        signup, 
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
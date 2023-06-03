import React from "react";
import { useState } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";


function LogIn({ setIsAuth }) {
    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        });
    };

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, emailSignIn, passwordSignIn)
        .then((userCredential) => {
            console.log(userCredential.user)
            alert("Account Signed In")
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        })
        .catch((error) => {
            console.log(error.message)
            alert(error.code)
        })
    }

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, emailSignUp, passwordSignUp)
        .then((userCredential) => {
            signInWithEmailAndPassword(auth, emailSignUp, passwordSignUp)
            console.log(userCredential.user)
            alert("Signed Up")
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        })
        .catch((error) => {
            console.log(error.message)
            alert(error.code)
        })
    }


    const [emailSignIn, setEmailSignIn] = useState('');
    const [passwordSignIn, setPasswordSignIn] = useState('');
    const [emailSignUp, setEmailSignUp] = useState('');
    const [passwordSignUp, setPasswordSignUp] = useState('');

    return (
        <div className="loginPage">
            <p>Sign In With Google to Continue</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
            <form onSubmit={signIn}>
                <input 
                    type="email" 
                    placeholder="Enter your email"
                    value={emailSignIn}
                    onChange={(e) => setEmailSignIn(e.target.value)}
                ></input>
                <input 
                    type="password" 
                    placeholder="Enter your password"
                    value={passwordSignIn}
                    onChange={(e) => setPasswordSignIn(e.target.value)}
                ></input>
                <button type="submit">Sign In</button>
            </form>
            <form onSubmit={signUp}>
                <input 
                    type="email" 
                    placeholder="Enter your email"
                    value={emailSignUp}
                    onChange={(e) => setEmailSignUp(e.target.value)}
                ></input>
                <input 
                    type="password" 
                    placeholder="Enter your password"
                    value={passwordSignUp}
                    onChange={(e) => setPasswordSignUp(e.target.value)}
                ></input>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default LogIn;
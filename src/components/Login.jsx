import React from "react";
import { useState } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function LogIn({ setIsAuth }) {
    let navigate = useNavigate();
    var valid = "True";

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
        checkPassword(passwordSignUp);
        if (valid === "True") {
            createUserWithEmailAndPassword(auth, emailSignUp, passwordSignUp)
            .then((userCredential) => {
                signInWithEmailAndPassword(auth, emailSignUp, passwordSignUp)
                const currentAuth = getAuth();
                const emailUser = emailSignUp.substring(0, emailSignUp.indexOf("@"));
                updateProfile(currentAuth.currentUser, {
                displayName: emailUser, photoURL: ""
                }).then(() => {
                }).catch((error) => {
                });
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
        } else {
            navigate("/login");
            alert("password not valid")
        }
    }

    function checkPassword(pass) {
        if (pass.length < 8) {
            valid = "False";
        } else if (!(/\d/.test(pass))) {
            valid = "False";
        } else if (!(/[A-Z]/.test(pass))) {
            valid = "False";
        } else if (!(/[a-z]/.test(pass))) {
            valid = "False";
        } else {
            valid = "True";
        }
    }

    function changeDisplay() {
        document.getElementById("sign-up").style.display = "grid";
        document.getElementById("sign-in").style.display = "none";
        document.getElementById("create-account").style.display = "none";
    }

    const [emailSignIn, setEmailSignIn] = useState('');
    const [passwordSignIn, setPasswordSignIn] = useState('');
    const [emailSignUp, setEmailSignUp] = useState('');
    const [passwordSignUp, setPasswordSignUp] = useState('');

    return (
        <div className="loginPage">
            <form id="sign-in" className="signIn" onSubmit={signIn}>
                <h3>Email</h3>
                <input 
                    className="authEmail"
                    type="email" 
                    value={emailSignIn}
                    onChange={(e) => setEmailSignIn(e.target.value)}
                ></input>
                <h3>Password</h3>
                <input 
                    className="authPass"
                    type="password" 
                    value={passwordSignIn}
                    onChange={(e) => setPasswordSignIn(e.target.value)}
                ></input>
                <button className="authBtn" type="submit">Sign In</button>
            </form>
            <button className="createBtn" id="create-account" onClick={changeDisplay}>Create Account</button>
            <form id="sign-up" className="signUp" onSubmit={signUp}>
                <h3>Email</h3>
                <input 
                    className="authEmail"
                    type="email" 
                    value={emailSignUp}
                    onChange={(e) => setEmailSignUp(e.target.value)}
                ></input>
                <h3>Password</h3>
                <input 
                    className="authPass"
                    type="password"
                    value={passwordSignUp}
                    onChange={(e) => setPasswordSignUp(e.target.value)}
                ></input>
                <p>Passwords must contain at least eight characters, including at least one uppercase letter, one lowercase letter, and one number.</p>
                <button className="authBtn" type="submit">Sign Up</button>
            </form>
            <button className="googleLogIn" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    );
}

export default LogIn;
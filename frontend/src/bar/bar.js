import React, { useState,useEffect } from 'react'
import "../css/bar/bar.css"
import HomeEntrance from './student-home/home-entrance/home-entrance'
import Signup from "../components/home/signup/signup"
import Signin from "../components/home/signin/signin"
import "../css/bar/signIn-signUp.css"

export default function Bar() {
    const [logIn, setLogIn] = useState("");
    const [student,setStudent] = useState("");
    useEffect(()=>{
        if(logIn == "true")
        setStudent(JSON.parse(localStorage.getItem("student")));
    },[logIn])

    useEffect(() => {
        setLogIn(localStorage.getItem("isLogin"));   
    }, [logIn])

    const drawSignInState = () => {
        console.log((localStorage.getItem("isLogin")));
        if (logIn == "true" ) {
            return <HomeEntrance logIn={isLogin} student={student}/>
        } else  {
            return (
            <div>
                <div className="signUpBtn " data-toggle="modal" data-target="#signUpModal">Sign up</div>
                <Signup />
                <div className="signInBtn" data-toggle="modal" data-target="#signInModal" data-backdrop="false">Sign in</div>
                <Signin login={isLogin}  />
            </div>
                   )
        }
    }

    const isLogin = (logIn) => {
        setLogIn(logIn);
    }

    return (
        <div className="bar">
            <h1>Welcome to our Online Academy {student.student_firstname}
            </h1>
            {drawSignInState()}
        </div>
    )


}

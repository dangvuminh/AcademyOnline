import React, { useState } from 'react'
import "../css/bar/bar.css"
import HomeEntrance from './student-home/home-entrance/home-entrance'
import Signup from "../components/home/signup/signup"
import Signin from "../components/home/signin/signin"
import "../css/bar/signIn-signUp.css"

export default function Bar() {
    const [logIn, setLogIn] = useState(false);
    const [student,setStudent] = useState("");
    const drawSignInState = () => {
        console.log(logIn);
        if (logIn) {
            return <HomeEntrance student={student}/>
        } else {
            return (
            <div>
                <div className="signUpBtn " data-toggle="modal" data-target="#signUpModal">Sign up</div>
                <Signup />
                <div className="signInBtn" data-toggle="modal" data-target="#signInModal" data-backdrop="false">Sign in</div>
                <Signin login={isLogin} student={getStudentName}/>
            </div>
                   )
        }
    }

    const isLogin = (logIn) => {
        setLogIn(logIn);
    }

    const getStudentName = (student) => {
        setStudent(student);
    }

    return (
        <div className="bar">
            <h1>Welcome to our Online Academy {student.student_firstname}</h1>
            {drawSignInState()}
            {/* <div style={{display: logIn ? 'block' : 'none'}}> <HomeEntrance /></div>
            <div style={{display: logIn ? 'none' : 'block'}}>
                <div className="signUpBtn " data-toggle="modal" data-target="#signUpModal">Sign up</div>
                <Signup />
                <div className="signInBtn" data-toggle="modal" data-target="#signInModal" data-backdrop="false">Sign in</div>
                <Signin login={isLogin} student={getStudentName}/>
            </div> */}
        </div>
    )


}

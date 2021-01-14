import React,{useState,useEffect} from 'react'

import "../../../css/teacher/teacherSignIn.css"
import TeacherHome from "../teacher_home/teacherHome"
import Axios from "axios"

export default function TeacherSignIn() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [isLogIn,setIsLogIn] = useState(false);
    const [err,setErr] = useState("");

    const submitHandle = (e) => {
        e.preventDefault();
        Axios({
            method:"post",
            url:"http://localhost:4000/api/teacherSignIn",
            data:{
                username:username,
                password:password,
            }
        }).then(result=>{
            if(result.data.state === 1){
                setIsLogIn(true);
                localStorage.setItem("teacherLogIn","true");
            } else{
                setErr("Your username or password has been wrong")
            }
        })
    }

    const drawTeacherHome = () => {
        if(isLogIn === true){
            return <TeacherHome username={username}/>
        } else {
            return (
                <div className="teacherSignIn">
            <i class="fa fa-graduation-cap"></i>
            <form onSubmit={submitHandle} className="was-validated">
            <p style={{color:"red"}}>{err}</p>
        <div className="form-group">
          <label htmlFor="uname">Username:</label>
          <input onChange={(e)=>{setUsername(e.target.value)}}
          type="text" className="form-control" id="uname" placeholder="Enter username" name="uname" required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input onChange={(e)=>{setPassword(e.target.value)}}
          type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <button type="submit" className="btn btn-primary">Enter</button>
      </form>
        </div>
            )
        }
    }
    return (
        <div>
        {drawTeacherHome()}
        </div>
    )
}

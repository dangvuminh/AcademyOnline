import React,{useState} from 'react'
import Axios from "axios"

export default function CreateTeacher() {
    const [username,setUsername] = useState("");
    const [password1,setPassword1] = useState("");
    const [password2,setPassword2] = useState("");
    const [err1,setErr1] = useState("");
    const [err2,setErr2] = useState("");

    const submitHandle = (e) => {
        e.preventDefault();

        if(password1 != password2){
            setErr2("The passwords don't match.Please type again!!")
        } else{
            Axios({
                method:"post",
                url:"http://localhost:4000/api/createTeacher",
                data:{
                    username : username,
                    password: password1
                }
            }).then(result=>{
                if(result.data.state === 1){
                    alert("Created a teacher account!!");
                } else{
                    setErr1("This username has been used already!!");
                }
            })
        }    
    }

    return (
        <div>
            <h3>Create Teacher Account</h3>
            <form onSubmit={submitHandle} className="was-validated">
        <div className="form-group">
          <label htmlFor="uname">Username:</label>
          {/* Error msg */}
          <p style={{color:"red"}}>{err1}</p>
          <input onChange={(e)=>{setUsername(e.target.value)}}
          type="text" className="form-control" id="uname" placeholder="Enter username" required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>

        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input onChange={(e)=>{setPassword1(e.target.value)}}
          type="password" className="form-control" id="pwd" placeholder="Enter password" required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>

        <div className="form-group">
          <label htmlFor="pwd">Enter Password Again:</label>
          {/* Error msg */}
          <p style={{color:"red"}}>{err2}</p>
          <input onChange={(e)=>{setPassword2(e.target.value)}}
          type="password" className="form-control" id="pwd" placeholder="Enter password again"  required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
        </div>
    )
}

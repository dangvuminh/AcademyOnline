import React ,{useState}from 'react'
import Axios from "axios"

export default function Signup() {

    const [fname,setFname]  = useState("");
    const [lname,setLname]  = useState("");
    const [email,setEmail]  = useState("");
    const [username,setUsername]  = useState("");
    const [pw,setPw]  = useState("");
    const [confirmPw,setConfirmPw]  = useState("");
    const [errUsername,setErrUsername] = useState("");
    const [errPw,setErrPw] = useState("");
    //  let showError=()=>{
    //     return "";
    //  }
     const handleSubmit = (e) =>{
       e.preventDefault();
       if(confirmPw !== pw){
           setErrPw("Passwords don't match to the above!");
       } else
        Axios({
            method:"post",
            url:"http://localhost:4000/api/studentSignUp",
            data:{
                firstname:`${fname}`,lastname:`${lname}`,email:`${email}`,username:`${username}`,password:`${pw}`
            }
        }).then(()=>{
            e.target.firstname.value = "";
            e.target.lastname.value = "";
            e.target.email.value = "";
            e.target.password.value = "";
            e.target.username.value = "";
            e.target.confirmPw.value = "";
            alert("You have created an Account!")
        }).catch(err=>{
            if(err.response)
            setErrUsername("This username has already been used!");
        })

    }

    return (
        <div>
            {/* The Modal */}
            <div className="modal fade" id="signUpModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">Let's Sign Up</h4>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        {/* Modal body */}
                        <div className="modal-body">

                            <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                    <label >First Name:</label>
                                    <input  onChange={(e)=>{setFname(e.target.value)}} 
                                    type="text" className="form-control" id="firstname" placeholder="Enter your first name" name="firstname" />
                                </div>
                                <div className="form-group">
                                    <label>Last Name:</label>
                                    <input onChange={(e)=>{setLname(e.target.value)}} 
                                    type="text" className="form-control" id="lastname" placeholder="Enter your lasst name" name="lastname" />
                                </div>
                                <div className="form-group">
                                    <label >Email:</label>
                                    <input onChange={(e)=>{setEmail(e.target.value)}} 
                                    type="email" className="form-control" id="email" placeholder="Enter email" name="email" />
                                </div>
                                <div className="form-group">
                                    <label >Username:</label>
                                    <p style={{color:"red"}}>{errUsername}</p>
                                    <input onChange={(e)=>{setUsername(e.target.value)}} 
                                    type="text" className="form-control"  placeholder="Enter username" name="username" />
                                </div>
                                <div className="form-group">
                                    <label >Password:</label>
                                    <input onChange={(e)=>{setPw(e.target.value)}} 
                                    type="password" className="form-control" id="pwd" placeholder="Enter password" name="password" />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password:</label>
                                    <p style={{color:"red"}}>{errPw}</p>
                                    <input onChange={(e)=>{setConfirmPw(e.target.value)}} 
                                    type="password" className="form-control" id="confirmPw" placeholder="Enter password again" name="confirmPw" />
                                </div>
                                <button className="btn btn-primary">Sign Up</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

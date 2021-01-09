import React,{useState} from 'react'
import Axios from "axios"


let  studentData={};
export default function Signin(props) {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [userErr,setUserErr] = useState("");
    const [pwErr,setPwErr] = useState("");

    const storeStudentData = (username) => {
        Axios({
            method: "post",
            url: `http://localhost:4000/api/student/getStudentData`,
            data: {
                accessToken: localStorage.getItem('accessToken'),
                username:username
            }
        }).then(result=>{
            localStorage.setItem("student",JSON.stringify(result.data[0]));
        })
    }

    const submitHandle = (e) =>{
        e.preventDefault();
       
        Axios({
            method:"post",
            url:"http://localhost:4000/api/student/studentSignIn",
            data:{
                username:`${username}`,
                password:`${password}`,
                refreshToken: localStorage.getItem("refreshToken"),
            }
        }).then((result)=>{
            console.log(result.data.authenticated)
            if(result.data.authenticated == -1)
            {
                setUserErr("This account no exist!");
                setPwErr("");
            }
            else
            if(result.data.authenticated == 0){
                setPwErr("Wrong Password!");
                setUserErr("");
            } else{
                props.login(true);
                localStorage.setItem("isLogin",true);
                localStorage.setItem('accessToken', result.data.accessToken);
                storeStudentData(username);
            }  
        })
    }


    return (
        
      
        <div>
             <div className="modal fade" id="signInModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">Into your Account..</h4>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        {/* Modal body */}
                        <div className="modal-body">

                            <form onSubmit={submitHandle}>
                                <div className="form-group">
                                    <p style={{color:"red"}}>{userErr}</p>
                                    <label>Username:</label>
                                    <input onChange={(e)=>{setUsername(e.target.value)}}
                                    type="text" className="form-control"  placeholder="Enter username" name="username" />
                                </div>
                                <div className="form-group">
                                <p style={{color:"red"}}>{pwErr}</p>
                                    <label >Password:</label>
                                    <input onChange={(e)=>{setPassword(e.target.value)}}
                                    type="password" className="form-control"  placeholder="Enter password" name="password" />
                                </div>
                                <button className="btn btn-primary" >Sign In</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const studentDataExport = studentData ;
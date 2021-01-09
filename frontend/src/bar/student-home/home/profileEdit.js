import Axios from 'axios';
import React, { useState,useEffect } from 'react'
import "../../../css/student-home/profileEdit.css"


export default function ProfileEdit(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [curFirstName, setCurFirstName] = useState("");
    const [curLastName, setCurLastName] = useState("");
    const [curEmail, setCurEmail] = useState("");

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [categories, setCategories] = useState("0");
    const [errMsq1,setErrMsg1] = useState("");
    const [errMsq2,setErrMsg2] = useState("");
    const [errMsq3,setErrMsg3] = useState("");
   
    useEffect(()=>{
       
        setCurFirstName(props.student.student_firstname);
        setCurLastName(props.student.student_lastname);
        setCurEmail(props.student.email);
    },[])

   const submitHandle1 = (e) => {
    e.preventDefault();
   
    Axios({
        method:"post",
        url: "http://localhost:4000/api/student/checkPassword",
        data: {
            username: props.student.username,
            password: password ,
        }
    }).then(result=>{
        if(result.data == 1 && newPassword != ""){
            Axios({
                method:"post",
                url:"http://localhost:4000/api/profile/updatePassword",
                data:{
                    accessToken: localStorage.getItem('accessToken'),
                    username: props.student.username,
                    password: newPassword ,
                }
            }).then(result=>{
                console.log(result.data);
                if(result.data.state == 0){
                    
                } else if(result.data.state == 1){
                    alert("Successfully password updated!!");
                    setErrMsg2("");
                } 
            })
        } if(newPassword == ""){
            setErrMsg2("You have to fill in this field..")
        } else if(result.data == 0 ){
            setErrMsg1("Your current password is wrong!!");
            
        } else if(newPassword != ""){
            setErrMsg2("");
        }
    })
   }

   const submitHandle2 = (e) => {
    e.preventDefault();
    if(firstName != "" && lastName != "" && email != ""){
        Axios({
            method:"post",
            url:"http://localhost:4000/api/profile/updateProfile",
            data:{
                accessToken: localStorage.getItem('accessToken'),
                username: props.student.username,
                firstname: firstName ,
                lastname: lastName,
                email: email,
            }
        }).then(()=>{
            //update storage
            Axios({
                method:"post",
                url:"http://localhost:4000/api/student/getStudentData",
                data:{
                    accessToken: localStorage.getItem('accessToken'),
                    username: props.student.username,
                }
            }).then(result=>{
                localStorage.setItem("student",JSON.stringify(result.data[0]));
                alert("Successfully Updated!!");
                setErrMsg2("");
            })
          
        })
    } else{
        setErrMsg3("All fields must be filled");
    }
   
}
    const changePasswordForm = () => {
        return <div className="modal-body">

                        <form onSubmit={submitHandle1}>
                            <div className="form-group">

                                <label>Current Password:</label>
                                <p style={{color:'red'}}>{errMsq1}</p>
                                <input onChange={(e) => { setPassword(e.target.value) }}
                                    type="password" className="form-control" placeholder="Enter first name" name="password" />
                            </div>

                            <div className="form-group">

                                <label >New Password:</label>
                                <p style={{color:'red'}}>{errMsq2}</p>
                                <input onChange={(e) => { setNewPassword(e.target.value) }}
                                    type="password" className="form-control" placeholder="Enter new password" name="newPassword" />
                            </div>

                            <button className="btn btn-primary" >Update</button>
                        </form>
                
</div>
    }

    const editProfileForm = () => {
        return <div className="modal-body">

                        <form onSubmit={submitHandle2}>
                            <div className="form-group">
                                <p style={{color:'red'}}>{errMsq3}</p>
                                <label>Current First name: <b>{curFirstName}</b></label>
                                
                                <input onChange={(e) => { setFirstName(e.target.value) }}
                                    type="text" className="form-control"  name="firstName" placeholder="Enter new firstname"/>
                            </div>
                            <div className="form-group">

                                <label >Current Last Name: <b>{curLastName}</b></label>
                                <input onChange={(e) => { setLastName(e.target.value) }}
                                    type="text" className="form-control"  name="lastName" placeholder="Enter new lastname"/>
                            </div>

                            <div className="form-group">

                                <label >Current Email: <b>{curEmail}</b></label>
                                <input onChange={(e) => { setEmail(e.target.value) }}
                                    type="email" className="form-control"  name="email" placeholder="Enter new email"/>
                            </div>

                            <button className="btn btn-primary" >Update</button>
                        </form>

                    </div>
    } 

    const drawEditCategory = () => {
        if(categories == '0'){
            return editProfileForm(); 
       } else if(categories == '1'){
            return changePasswordForm();
        }
    }


    return (
        <div>
             <a data-toggle="modal" data-target="#profileEditModal" className="btn btn-primary">Edit Profile</a>
        
        <div className="modal fade" id="profileEditModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header">
                        
                        <div>
                            <div className="categories">
                                <span style={{  borderBottom : categories == '0' ? "2px solid black" : "" , paddingBottom:"9px"  }} 
                                onClick={() => { setCategories("0") }}><a>Edit Profile</a></span>
                                <span style={{  borderBottom : categories == '1' ? "2px solid black" : "" , paddingBottom:"9px"  }} 
                                onClick={() => { setCategories("1") }}><a>Change Password</a></span>
                            </div>
                        </div>

                        <button type="button" className="close" data-dismiss="modal">×</button>
                    </div>
                    {/* Modal body */}
                    {drawEditCategory()}
                </div>
            </div>
        </div>
        </div>
    )
}

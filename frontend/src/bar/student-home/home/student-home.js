import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Axios from "axios"
import avatar from "../../../img/avatar.png"
import "../../../css/student-home/student-home.css"

export default function StudentHome() {
    const [student, setStudent] = useState([]);
    const params = useParams();
    const username = params.username;

    useEffect(() => {
        Axios({
            method: "post",
            url: `http://localhost:4000/api/signIn/getStudentProfile/${username}`,
            data: {
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then((result) => {
            setStudent(result.data[0]);
        }).catch(err => {
            alert("Your Log-in time has run out.Please Log in again!!");
            localStorage.setItem('isLogin', false);
            window.open("/", "_parent");
        })
    }, []);

    const getOwnCourses = () =>{
        Axios({
            method:"post",
            url:`http://localhost:4000/api/getEnrollment`,
            data:{ 
                studentID : student.student_id ,
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then(result=>{
            if(result.data.state == 0)
            console.log("No Nah");
            console.log(result.data[0]);
        }).catch(err=>{
            throw err;
        })
    }
    const drawStudentProfile = () => {
            return <div className="student-home" className="card" style={{ width: '300px' }}>
                <div>
                    <img className="card-img-top" src={avatar} alt="Card image" />
                    <div className="card-body">
                        <h4 className="card-title">{student.student_firstname} {student.student_lastname}</h4>
                        <p className="card-text">Some example text.</p>
                        <a href="#" className="btn btn-primary">Edit Profile</a>
                    </div>
                </div>

                <div className="student-home-content">
                    <div  className="favorite student-home-item">
                        <h2>Your Favourite Courses</h2>
                        <i class="fa fa-heart"></i>
                    </div>
                    <div onClick={()=>{getOwnCourses()}} className="boughtCourses student-home-item">
                        <h2>Your Own Courses</h2>
                        <i class="fa fa-book"></i>
                    </div>
                </div>
            </div>
    }

    return (
        <div >
            {drawStudentProfile()}
        </div>
    )
}

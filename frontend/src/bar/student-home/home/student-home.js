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
            method:"get",
            url:`http://localhost:4000/api/signIn/getStudentProfile/${username}`,
            headers: { 'accessToken' : localStorage.getItem('accessToken') } 

            }).then((result) => {
            setStudent(result.data);
        })
    }, []);

    const drawStudentProfile = () => {
        return student.map((item, index) => {
            return <div key={index} className="card" style={{ width: '300px' }}>
                <img className="card-img-top" src={avatar} alt="Card image" />
                <div className="card-body">
                    <h4 className="card-title">{item.student_firstname} {item.student_lastname}</h4>
                    <p className="card-text">Some example text.</p>
                    <a href="#" className="btn btn-primary">Edit Profile</a>
                </div>
            </div>
        })
    }

    return (
        <div className="student-home">
            {drawStudentProfile()}
            <div className="student-home-content">
                <div className="favorite student-home-item">
                <h2>Your Favourite Courses</h2>
                <i class="fa fa-heart"></i>
                </div>
                <div className="boughtCourses student-home-item">
                <h2>Your Own Courses</h2>
                <i class="fa fa-book"></i>
                </div>
            </div>
        </div>
    )
}

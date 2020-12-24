import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Axios from "axios"
import avatar from "../../../img/avatar.png"
import "../../../css/student-home/student-home.css"
import OwnLesson  from "../lesson/ownLesson"

export default function StudentHome() {
    const [student, setStudent] = useState([]);
    const [lesson,setLesson] = useState([]);
    const [isOwn,setIsOwn] = useState(false);
    const [isFavorite,setIsFavorite] = useState(false);
    const [msg,setMsg] = useState("");
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

    const getOwnCourses = () => {
        Axios({
            method: "post",
            url: `http://localhost:4000/api/getEnrollment`,
            data: {
                studentID: student.student_id,
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then(result => {
            if (result.data.state == 0)
                setMsg("No course Available right now");
                else{
                    console.log(result.data);
                    setLesson(result.data);
                    setIsOwn(true);
                }
               
        }).catch(err => {
            if (err) throw err;
            alert("Your Log-in time has run out.Please Log in again!!");
            localStorage.setItem('isLogin', false);
            window.open("/", "_parent");
        })
    }

    const drawLesson=()=>{
        if(isOwn){
            return <OwnLesson lesson={lesson}/>
        } 
    }

    const drawStudentHome = () => {
        return <div className="student-home">

            <div className="student-home-profile" className="card" style={{ width: '300px' }}>
                <img className="card-img-top" src={avatar} alt="Card image" />
                <div className="card-body">
                    <h4 className="card-title">{student.student_firstname} {student.student_lastname}</h4>
                    <p className="card-text">Some example text.</p>
                    <a href="#" className="btn btn-primary">Edit Profile</a>
                </div>
            </div>

            <div className="student-home-course-manage">

                <div className="student-home-category">
                    <div className="favorite student-home-item">
                        <h2>Your Favourite Courses</h2>
                        <i class="fa fa-heart"></i>
                    </div>
                    <div onClick={() => { getOwnCourses() }} className="boughtCourses student-home-item">
                        <h2>Your Own Courses</h2>
                        <i class="fa fa-book"></i>
                    </div>
                </div>
                <div className="student-home-course-list">
                <div className="msg">{msg}</div>
                {drawLesson()}
                </div>
            </div>

        </div>

    }

    return (
        <div >
            {drawStudentHome()}

        </div>
    )
}

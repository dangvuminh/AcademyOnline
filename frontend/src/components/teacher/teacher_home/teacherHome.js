import React,{useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
import CourseHandle from "./courseHandle/courseHandle"
import EditProfile from "./editProfile/editProfile"
import Axios from "axios"

export default function TeacherHome() {
    const [courseState,setCourseState] =useState(0)
    const params = useParams();
    const username = params.username;
    const [teacher,setTeacher] = useState([]);

    useEffect(()=>{
        Axios.get(`http://localhost:4000/api/getTeacherData/${username}`).then(result=>{
            setTeacher(result.data[0]);
        })
    },[])
    const drawTeacherTask = () => {
        if(courseState === 1){
            return <CourseHandle teacher={teacher}/>
        } else if(courseState === 2){
            return <EditProfile teacher={teacher}/>
        } 
    }
    return (
        <div>
            <h3>Teacher Home</h3>
            <ul className="nav nav-tabs">
                <li className="nav-item" onClick={()=>{setCourseState(1)}}>
                    <a className="nav-link " href="#">Courses</a>
                </li>
                <li className="nav-item" onClick={()=>{setCourseState(2)}}>
                    <a className="nav-link" href="#">Edit Profile</a>
                </li>
            </ul>

            <div className="admin_home_content">
                {drawTeacherTask()}
            </div>
        </div>
    )
}

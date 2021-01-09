import React,{useState} from 'react'
import CourseHandle from "./courses/course_handle"

export default function AdminHome() {
    const [courseHandleState,setCourseHandleState] =useState(false)
    const drawAdminTask = () => {
        if(courseHandleState === true){
            return <CourseHandle />
        }
    }
    return (
        <div>
            <h3>Admin Home</h3>
            <ul className="nav nav-tabs">
                <li className="nav-item" onClick={()=>{setCourseHandleState(true)}}>
                    <a className="nav-link " href="#">Courses</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Add Teachers</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Create Courses</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link " href="#">Disabled</a>
                </li>
            </ul>

            <div className="admin_home_content">
                {drawAdminTask()}
            </div>
        </div>
    )
}

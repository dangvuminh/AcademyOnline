import React,{useState} from 'react'
import CourseHandle from "./courses/course_handle"
import CreateCourse from './courses/createCourse'
import CreateTeacher from "./teacher/createTeacher"

export default function AdminHome() {
    const [courseState,setCourseState] =useState(0)
    const drawAdminTask = () => {
        if(courseState === 1){
            return <CourseHandle />
        } else if(courseState === 2){
            return <CreateTeacher />
        } else if(courseState === 3){
            return <CreateCourse />
        } 
    }
    return (
        <div>
            <h3>Admin Home</h3>
            <ul className="nav nav-tabs">
                <li className="nav-item" onClick={()=>{setCourseState(1)}}>
                    <a className="nav-link " href="#">Courses</a>
                </li>
                <li className="nav-item" onClick={()=>{setCourseState(2)}}>
                    <a className="nav-link" href="#">Add Teachers</a>
                </li>
                <li className="nav-item" onClick={()=>{setCourseState(3)}}>
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

import React from 'react'
import {NavLink} from "react-router-dom"
import "../../../css/home/courses.css"

export default function Courses(props) {

    const drawCoursesTable=()=>{
        let student = JSON.parse(localStorage.getItem("student"));
        let studentID;
        if(student != 0){
            studentID = student.student_id;
        }
        return props.courses.map((item,index)=>{
        return <div key={index} className="course_item">
            <NavLink className="nav-link" to={`/courses/${item.course_id}/${studentID}`}>
            <h3>{item.course_name}</h3>
            <div className="detail">
        <div className="detail_item"><i class="fa fa-user"></i>{item.teacher}</div>
        <div className="detail_item">${item.course_price}</div>
            </div>
            <div className="detail">
            <div className="detail_item">Course Point: <b>{item.course_point}</b></div>
            <div className="detail_item">Num of students: <b>{item.num_of_enrollments}</b></div>
            </div>
            </NavLink>
            </div>
        })
    }
    return (
        <div className="course_content">
             {drawCoursesTable()}
        </div>
    )
}

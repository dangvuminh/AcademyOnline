import React from 'react'
import {NavLink} from "react-router-dom"
import "../../../css/home/courses.css"

export default function Courses(props) {

    const drawCoursesTable=()=>{
        return props.courses.map((item,index)=>{
        return <div key={index} className="course_item">
            <NavLink className="nav-link" to={`/courses/${item.course_id}`}>
            <h3>{item.course_name}</h3>
            <div className="detail">
        <div className="detail_item"><i class="fa fa-user"></i>{item.teacher}</div>
        <div className="detail_item">${item.course_price}</div>
            </div>
            <div>...</div>
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

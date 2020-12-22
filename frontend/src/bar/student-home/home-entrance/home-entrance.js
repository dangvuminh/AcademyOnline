import React from 'react'
import "../../../css/bar/home-entrance.css"
import {NavLink} from "react-router-dom"

export default function HomeEntrance(props) {

    const logOut=()=>{
        localStorage.setItem("isLogin",false);
        props.logIn(false);
        localStorage.setItem('accessToken',0);
        window.open("/" , "_parent");
    }
    return (
        <div className="home_entrance">
            <div className="dropdown">
                <span data-toggle="dropdown">
                    <i className="fa fa-user"></i>
                    <i className="fa fa-angle-down"></i>
                </span>
                <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">{props.student.student_firstname} {props.student.student_lastname}</a>
                    <NavLink className="nav-link" to={`/student-home/${props.student.username}`}><a className="dropdown-item" href="#"><i class="fa fa-home"></i> Home</a></NavLink>
                    <a className="dropdown-item" href="#" onClick={()=>{logOut()}}><i class="fa fa-power-off"></i> Sign out</a>
                </div>
            </div>
        </div>
    )
}

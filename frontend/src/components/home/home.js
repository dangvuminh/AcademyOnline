import React,{useState} from 'react'
import Menu from "./menu /menu"
import List from "./list/list"
import Courses from "./courses/courses"
import   "../../css/home/menu.css"
import   "../../css/home/list.css"
import   "../../css/home/home.css"
import "../../css/home/courses.css"
import Signup from "./signup/signup"
import Signin from "./signin/signin"


export default function Home() {
    const [courses,setCourses] = useState([]);
    const getCourses=(courses)=>{
        setCourses(courses);
    }
    return (
        <div className="home">
            <h1>Welcome to our Online Academy</h1>
            <div  className="signUpBtn " data-toggle="modal" data-target="#signUpModal">Sign up</div>
            <Signup />
            <div  className="signInBtn" data-toggle="modal" data-target="#signInModal">Sign in</div>
            <Signin />
            <div className ="home_content">
             <Menu courses={getCourses}/>
            <List />
            </div>
            <Courses courses = {courses}/>
        </div>
    )
}

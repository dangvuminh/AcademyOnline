import React,{useState} from 'react'
import Menu from "./menu /menu"
import List from "./list/list"
import Courses from "./courses/courses"
import   "../../css/home/home.css"




export default function Home() {
    const [courses,setCourses] = useState([]);
    const getCourses=(courses)=>{
        setCourses(courses);
    }
    return (
        <div className="home">
            <div className ="home_content">
             <Menu courses={getCourses}/>
            <List />
            </div>
            <Courses courses = {courses}/>
        </div>
    )
}

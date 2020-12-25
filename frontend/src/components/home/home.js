import React,{useState,useEffect} from 'react'
import Menu from "./menu /menu"
import List from "./list/list"
import Courses from "./courses/courses"
import   "../../css/home/home.css"
import Axios from "axios"


export default function Home() {
    const [courses,setCourses] = useState([]);
    const getCourses=(courses)=>{
        setCourses(courses);
    }

    useEffect(() => {
        Axios.get("http://localhost:4000/api/updateStudentNumber").then(result=>{
            console.log(result.data)
        })
        
    }, [])
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

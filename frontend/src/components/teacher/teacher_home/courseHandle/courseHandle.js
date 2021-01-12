import React, { useState, useEffect } from 'react'
import Axios from "axios"
import { useParams } from "react-router-dom"

export default function CourseHandle(props) {
    const params = useParams();
    const username = params.username;
    //const [teacher,setTeacher] = useState([]);
    const [course, setCourse] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:4000/api/course/getCoursesByTeacher/${props.teacher.teacher_id}`).then(result => {
            if (result.data.state !== 0) {
                setCourse(result.data);
            } else {
                setCourse(0);
            }
        })
    }, [])

    const drawCourseTable = () => {
        if(course === 0){
            return <tr>
                <td colSpan="2">No Available Courses Right Now..</td>
            </tr>
        } else {
            return course.map((item,index)=>{
                return <tr key={index}>
                    <td>{item.course_id}</td>
                    <td>{item.course_name}</td>
                </tr>
            })
        }
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>

                    </tr>
                </thead>
                <tbody>
                    {drawCourseTable()}
                </tbody>
            </table>
        </div>
    )
}

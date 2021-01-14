import React, { useState, useEffect } from 'react'
import Axios from "axios"
import { useParams } from "react-router-dom"
import {NavLink} from "react-router-dom"
import CourseHandleDetail from './courseHandleDetail';

export default function CourseHandle(props) {
    const params = useParams();
    const username = params.username;
    //const [teacher,setTeacher] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [courseDetail, setCourseDetail] = useState([]);
    const [courseHandleState,setCourseHandleState] = useState(0);
    
    useEffect(() => {
        Axios.get(`http://localhost:4000/api/course/getCoursesByTeacher/${props.teacher.teacher_id}`).then(result => {
            if (result.data.state !== 0) {
                setCourseList(result.data);
            } else {
                setCourseList(0);
            }
        })
    }, [])

    const drawTableData = () => {
        if(courseList === 0){
            return <tr>
                <td colSpan="2">No Available Courses Right Now..</td>
            </tr>
        } else {
            return courseList.map((item,index)=>{
                return <tr key={index}>
                    <td>{item.course_id}</td>
                    <td onClick={()=>{
                        setCourseHandleState(1);
                        setCourseDetail(item);
                        }}>{item.course_name}</td>
                </tr>
            })
        }
    }

    const drawCourseTable = () => {
        if(courseHandleState === 0 ){
            return(
            <table className="table">
            <thead>
                <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>

                </tr>
            </thead>
            <tbody>
                {drawTableData()}
            </tbody>
        </table>
            )
        } else if(courseHandleState === 1 ){
            return <CourseHandleDetail course={courseDetail} teacherID={props.teacher.teacher_id}/>
        }
        
    }

    return (
        <div>
            {drawCourseTable()}
        </div>
    )
}

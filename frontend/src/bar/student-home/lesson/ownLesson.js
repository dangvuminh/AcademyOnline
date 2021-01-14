import React from 'react'
import {useParams} from "react-router-dom"
import "../../../css/student-home/lesson.css"

export default function OwnLesson(props) {
    const params = useParams();
    const username = params.username;
    

    const startLesson=(courseID,teacherID,courseState)=>{
        if(courseState === 1)
        window.open(`/start-lesson/${courseID}/${teacherID}`);
    }
    const drawCourseTable = () =>{
        return props.lesson.map((item,index)=>{
            if(item.course_state == 1){
                return <tr key={index}>
                <td>{item.course_name}</td>
                <td>{item.teacher_name}</td>
                <td><div onClick={()=>{startLesson(item.course_id,item.teacher_fk,item.course_state)}} className="btn btn-success">Start Lesson</div></td>
            </tr>
            } else{
                return <tr key={index}>
                <td>{item.course_name}</td>
                <td>{item.teacher_name}</td>
                <td><div className="btn btn-danger" >Not Finished</div></td>
            </tr>
            }
           
        })
    }

    return (
        <div className="ownLessonTable">
            <table>
                <thead> 
                    <tr> <th colSpan="2">Your Own Course List</th></tr>
                    <tr>
                     <th>Course Name</th>
                     <th>Teacher Name</th>
                 </tr>
                 </thead>
                <tbody>
                 {drawCourseTable()}
                </tbody>
            </table>
        </div>
    )
}

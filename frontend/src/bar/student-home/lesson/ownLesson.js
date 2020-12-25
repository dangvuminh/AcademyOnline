import React from 'react'
import "../../../css/student-home/lesson.css"

export default function OwnLesson(props) {

    const drawCourseTable = () =>{
        return props.lesson.map((item,index)=>{
            return <tr key={index}>
                <td>{item.course_name}</td>
                <td>{item.teacher_name}</td>
            </tr>
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

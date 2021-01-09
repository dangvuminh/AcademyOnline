import React,{useState,useEffect} from 'react'
import Axios from "axios"

export default function CourseHandle() {

    const [courses,setCourses] = useState([]);
  
    const getCourses = (category) => {
        Axios.get(`http://localhost:4000/api/getCoursesByCategory/${category}`)
    .then(result => {
        setCourses(result.data);
    })
    }
    const drawCourses1Table = () => {
        return courses.map((item,index)=>{
            return   <tr key={index}>
            <td>{item.course_id}</td>
            <td>{item.course_name}</td>
            <td>{item.teacher}</td>
            <td><button type="button" class="btn btn-primary">Edit</button></td>
            <td><button type="button" class="btn btn-danger">Delete</button></td>
                    </tr>
      
        })
    }
    return (
        <div>
            <ul className="nav justify-content-center">
        <li className="nav-item" onClick={()=>getCourses(1)}>
          <a className="nav-link" >Web Programming</a>
        </li>
        <li className="nav-item" onClick={()=>getCourses(2)}>
          <a className="nav-link" >Mobile Programming</a>
        </li>
       
      </ul>
             <table className="table table-hover">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Teacher</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {drawCourses1Table()}
        </tbody>
      </table>
        </div>
    )
}

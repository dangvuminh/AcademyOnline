import React,{useState,useEffect} from 'react'
import Axios from "axios"
import {NavLink} from "react-router-dom"

export default function CourseHandle() {

    const [courses,setCourses] = useState([]);
  
    const getCourses = (category) => {
        Axios.get(`http://localhost:4000/api/getCoursesByCategory/${category}`)
    .then(result => {
        setCourses(result.data);
    })
    }
    const deleteCourse = (courseID) => {
      Axios({
        method:"post",
        url:"http://localhost:4000/api/course/deleteCourse",
        data:{
            courseID:courseID,
        }
    }).then((result)=> {
        if(result.data.state == 1){
            alert("Delete course Successfully");
        } else{
            alert("Cannot delete the course");
        }
    })
    }

    const drawCoursesTable = () => {
        return courses.map((item,index)=>{
            return   <tr key={index}>
            <td>{item.course_id}</td>
            <td>{item.course_name}</td>
            <td>{item.course_price}</td>
            <td>{item.teacher}</td>
            <td>
              <NavLink className="nav-link" to={`/admin-home/edit-course-form/${item.course_id}`}>
              <div  type="button" className="btn btn-primary">
                Edit
              </div>
              </NavLink>

              </td>
            <td><button onClick={()=>deleteCourse(item.course_id)} type="button" className="btn btn-danger">Delete</button></td>
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
            <th>Price</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
            {drawCoursesTable()}
            
        </tbody>
      </table>
        </div>
    )
}

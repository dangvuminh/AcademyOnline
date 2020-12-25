import React ,{useState}from 'react'
import "../../../css/home/list.css"
import Axios from "axios"

export default function List() {
    const [mostEnrolled,setMostEnrolled] = useState([]);
   
   
    const getMostEnrolledCourse = () =>{
        Axios.get("http://localhost:4000/api/getMostEnrolledCourse").then(result =>{
            sortCourseList(result.data);
            setMostEnrolled(result.data);
        }).catch(err=>{
            throw err;
        })
    }

    const sortCourseList = (courseList) =>{
        let sortable = courseList;
        sortable.sort(function(a, b) {
            return b.num_of_enrollments - a.num_of_enrollments;
        });
    
    }

    const drawMostEnrolledCourseTable = ()=>{
        let j = 0;
       return mostEnrolled.map((item,index)=>{
           if(j == 5 ) return; else
           if(item.num_of_enrollments == 0){
               j++; 
               return;
           } else{
            j++;
            return<li key={index}>
                {item.course_name} - {item.teacher_name}
            </li>
           }
       })
               
           
       
    }
    return (
        <div className="list home_item">
            <div>Most enrolled courses</div>
            <div className="most_enrolled_course">
            <i onClick={()=>{getMostEnrolledCourse()}} class="fa fa-angle-double-down"></i>
           <ol>
                {drawMostEnrolledCourseTable()}
           </ol>
            </div>
        </div>
    )
}


import React, { useContext,useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import "../../css/courses_detail/courses_detail.css"
import "../../css/courses_detail/comment.css"
import Comment from "./comment/comment"
import Axios from "axios" 

export default function Courses_detail() {
    const [course_detail, setCourseDetail] = useState([]);
    const [student,setStudent] = useState([]);
    const [isBought,setIsBought]= useState("");
    const [isLiked,setIsLiked]= useState("");
    const params = useParams();
    const course_id = params.course_id;

    useEffect(() => {
        setStudent(JSON.parse(localStorage.getItem("student")));
        Axios.get(`http://localhost:4000/api/getSingleCourse/detail/${course_id}`).then((result) => {
            setCourseDetail(result.data[0]); 
        });

     

    }, [])

    useEffect(()=>{
        Axios({
            method:"post",
            url:`http://localhost:4000/api/getStudentEnrolledByCourse`,
            data:{ 
                courseID: course_id ,
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then(result=>{
            if(result.data.state !=0){
              return result.data.map((item)=>{
                  if(item.student_id_fk == student.student_id){
                      setIsBought(true);
                  }
                  
                })
            } else{
              setIsBought(false);
  
            }
            
        })
    })

    useEffect(()=>{
        Axios({
            method:"post",
            url:`http://localhost:4000/api/getFavoriteCourseState`,
            data:{
                accessToken: localStorage.getItem('accessToken'),
                courseID: course_id
            }
        }).then(result=>{
            if(result.data.state !=0){
              return result.data.map((item)=>{
                  if(item.f_student_id_fk == student.student_id){
                      setIsLiked(true);
                  }
                  
                })
            } else{
              setIsLiked(false);
  
            }
            
        })
    })

    const likeTheCourse=(courseID,studentID,state)=>{
      
        Axios({
            method:"post",
            url:"http://localhost:4000/api/changeFavoriteCourseState", 
            data: {
                courseID: courseID,
                studentID:studentID,
                state:state,
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then(result=>{
            if(isLiked == false)
            setIsLiked(true);
            setIsLiked(false);
           
        }).catch(err=>{
            if(err)
            console.log(err);
            localStorage.setItem('isLogin',false);
            window.open("http://localhost:3000/","_parent");
            alert("Please log in to buy this course");
        })
    }

    const buyCourse = (courseID,studentID) =>{
        console.log(courseID);
        console.log(studentID);
        Axios({
            method:"post",
            url:`http://localhost:4000/api/buyCourse`,
            data:{ 
                accessToken: localStorage.getItem('accessToken'), 
                courseID: courseID,
                studentID: studentID,
            }
        }).then(result=>{
            //console.log(result.data.state);
            if(result.data.state == 1){
                alert("You have bought the course!!");
            }
        }).catch(err=>{
            // if(err)
            // throw err;
            localStorage.setItem('isLogin',false);
            window.open("http://localhost:3000/","_parent");
            alert("Please log in to buy this course");
        })

    }

    const drawCourseDetailTable = () => {
            return <div className="course_detail_content">

                <div className="course_detail_item">
                    <h2>{course_detail.course_name} <span onClick={()=>{likeTheCourse(course_detail.course_id,student.student_id,isLiked)}} style={{color: isLiked ? 'red' : 'grey'}}><i class="fa fa-heart"></i></span></h2>
                    <div className="description">{course_detail.course_content}</div>
                    <div className="money"> <h3  className="price">Price:${course_detail.course_price}</h3>
                        <button style={{display: isBought ? 'none' : 'block',}}
                         onClick={()=>{buyCourse(course_detail.course_id,student.student_id)}}>Buy Now</button>
                    </div>                
                </div>

                <div className="course_detail_item">
                <h2 >Point:</h2>
                <Comment />
                </div>

            </div>
    }

    return (
        <div>
            {drawCourseDetailTable()}
        </div>
    )
}

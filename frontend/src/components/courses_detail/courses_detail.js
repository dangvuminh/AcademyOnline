
import React, { useContext, useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import "../../css/courses_detail/courses_detail.css"
import "../../css/courses_detail/comment.css"
import Comment from "./comment/comment"
import Point from "./point/point"
import Axios from "axios"

export default function Courses_detail() {
    const [course_detail, setCourseDetail] = useState([]);
    const [isBought, setIsBought] = useState([]);
    const [isLiked, setIsLiked] = useState([]);
    const [comment, setComment] = useState([]);
    const [point, setPoint] = useState(0);
    const params = useParams();
    const course_id = params.course_id;
    const studentID = params.student_id;
   
    useEffect(() => {
        setPoint(0);
        Axios.get(`http://localhost:4000/api/getSingleCourse/detail/${course_id}`).then((result) => {
            setCourseDetail(result.data[0]);
        });
    }, [])


    useEffect(() => {
        Axios.get(`http://localhost:4000/api/course/getCoursePoint/${course_id}`).then((result) => {
            setPoint(result.data[0].course_point);
        })
    }, [])

    useEffect(() => {
        Axios({
            method: "post",
            url: `http://localhost:4000/api/getCommentList`,
            data: {
                accessToken: localStorage.getItem('accessToken'),
                courseID: course_id,
            }
        }).then((result) => {
            if (result.data.state != 0)
            setComment(result.data);
        });
    },[])

    useEffect(() => {
       
        Axios({
            method: "post",
            url: `http://localhost:4000/api/getStudentEnrolledByCourse`,
            data: {
                courseID: course_id,
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then(result => {
            if (result.data.state != 0) {
                return result.data.map((item) => {
                    if(item.student_id_fk == studentID) {  
                        setIsBought(true);
                    }  else{
                        setIsBought(false);
                    }
                })
            } else {
                setIsBought(false);
            }
          
        })
    },[])

    useEffect(() => {
        Axios({
            method: "post",
            url: `http://localhost:4000/api/getFavoriteCourseState`,
            data: {
                accessToken: localStorage.getItem('accessToken'),
                courseID: course_id
            }
        }).then(result => {
            if (result.data.state != 0) {
            
                return result.data.map((item) => {
                    if(item.f_student_id_fk == studentID) {
                        
                        setIsLiked(true);
                    } else{
                        setIsLiked(false);
                    }
                })
            } 
            else {
                setIsLiked(false);

            }

        }).catch(err => {
            setIsLiked(false);
        })
       
    },[])

    const likeTheCourse = (courseID, studentID, state) => {
        
        Axios({
            method: "post",
            url: "http://localhost:4000/api/changeFavoriteCourseState",
            data: {
                courseID: courseID,
                studentID: studentID,
                state: state,
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then(result => {
            if (isLiked == false){
                setIsLiked(true);
            } else{
                setIsLiked(false);
            }         

        }).catch(err => {
            localStorage.setItem('isLogin', false);
            window.open("http://localhost:3000/", "_parent");
            alert("Please log in to like this course");
        })
    }

    const buyCourse = (courseID, studentID) => {
        console.log(courseID);
        console.log(studentID);
        Axios({
            method: "post",
            url: `http://localhost:4000/api/buyCourse`,
            data: {
                accessToken: localStorage.getItem('accessToken'),
                courseID: courseID,
                studentID: studentID,
            }
        }).then(result => {
            if (result.data.state == 1) {
                alert("You have bought the course!!");
            }
        }).catch(err => {
            localStorage.setItem('isLogin', false);
            window.open("http://localhost:3000/", "_parent");
            alert("Please log in to buy this course");
        })

    }
    const getPoint = (point) => {
    
        setPoint(point)
    }
    const drawCourseDetailTable = () => {

        return <div className="course_detail_content">
            <div className="course_detail_left">
                <div className="course_detail_item">
                    <h3>{course_detail.course_name} <span onClick={() => { likeTheCourse(course_detail.course_id, studentID, isLiked) }} style={{ color: (isLiked)  ? 'red' : 'grey' }}><i class="fa fa-heart"></i></span></h3>
                    <div className="description">{course_detail.course_content}</div>
                    <div className="money"> <h3 className="price">Price:${course_detail.course_price}</h3>
                        <button style={{ display: isBought ? 'none' : 'block', }}
                            onClick={() => { buyCourse(course_detail.course_id, studentID) }}>Buy Now</button>
                    </div>
                </div>

                <div className="course_detail_item">
                    <h2 >Point: {point} / 5</h2>
                    <Comment courseID={course_id} studentID={studentID} />
                </div>
            </div>
                <Point courseID={course_id} studentID={studentID} point={getPoint} />
           
        </div>
    }

    
    const drawCommentSection = () => {
        if(comment){
          
            return comment.map((item, index) => {
                return <div key={index} className="comment_section_item">
                    <p><b>{item.student_name}</b> <span>{item.feedback_time}</span></p>
                    <p><em>{item.feedback_content}</em></p>
                </div>
            })
        }
    }

    return (
        <div>
            {drawCourseDetailTable()}
            <div className="comment_section">
                <h3>Users'Comment</h3>
                {drawCommentSection()}
            </div>
        </div>
    )
}

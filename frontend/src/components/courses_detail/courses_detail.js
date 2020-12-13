
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import "../../css/courses_detail/courses_detail.css"
import "../../css/courses_detail/comment.css"
import Comment from "./comment/comment"

import Axios from "axios" 
export default function Courses_detail() {
    const [course_detail, setCourseDetail] = useState([]);
    const params = useParams();
    const course_id = params.course_id;

    useEffect(() => {
        Axios.get(`http://localhost:4000/api/getSingleCourse/detail/${course_id}`).then((result) => {
            console.log(typeof (result.data));
            setCourseDetail(result.data);
        })

    }, [])

    const drawCourseDetailTable = () => {
        return course_detail.map((item, index) => {
            return <div key={index} className="course_detail_content">

                <div className="course_detail_item">
                    <h2>{item.course_name}</h2>
                    <div className="description">{item.course_content}</div>
                    <div className="money"> <h3  className="price">Price:${item.course_price}</h3>
                        <button>Buy Now</button>
                    </div>                
                </div>

                <div className="course_detail_item">
                <h2 >Point:</h2>
                <Comment />
                </div>

            </div>
        })
    }

    return (
        <div>
            {drawCourseDetailTable()}
        </div>
    )
}

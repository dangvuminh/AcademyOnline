import React, { useState, useEffect } from 'react'
import Axios from "axios"
import {useParams} from "react-router-dom" 

export default function EditForm(props) {
    const [courseName, setCourseName] = useState("");
    const [coursePrice, setCoursePrice] = useState("");
    const [teacherID,setTeacherID] = useState("");
    const [courseContent,setCourseContent] = useState("");
    const [teacher, setTeacher] = useState("");
    const [teacherList, setTeacherList] = useState("");
    const params = useParams();
    const course_id = params.course_id;
   
    useEffect(() => {
       
        Axios.get(`http://localhost:4000/api/getSingleCourse/detail/${course_id}`).then((result)=>{
           
            //console.log(result.data)
            setCourseName(result.data[0].course_name);
            setCoursePrice(result.data[0].course_price);
            setTeacher(result.data[0].teacher);
            setCourseContent(result.data[0].course_content);

             Axios.get("http://localhost:4000/api/getTeacherList").then(result => {
            setTeacherList(result.data);
        })

        }).catch(err=>{
            console.log(err)
        })
    },[])

    const getTeacherList = () => {
        if(teacherList)
        return teacherList.map((item, index) => {
                    return <div key={index} className="form-check " style={{textAlign:"left"}}>
                    <label className="form-check-label ">
                        <input onChange={(e)=>{setTeacherID(e.target.value)}}
                        type="radio" className="form-check-input" name="optradio" value={item.teacher_id}/>{item.teacher_name}
                </label>
                </div>
                
        })
    }
    const submitHandle=(e)=>{
        e.preventDefault();
        Axios({
            method:"post",
            url:"http://localhost:4000/api/course/updateCourse",
            data:{
                courseID:course_id,
                courseName:courseName,
                courseContent:courseContent,
                coursePrice:coursePrice,
                teacherID:teacherID,
            }
        }).then((result)=> {
            if(result.data.state == 1){
                alert("Update course Successfully");
            } else{
                alert("Cannot update the course");
            }
        })
    }

    return (
        <div>
             <form onSubmit={submitHandle}>
                            <div className="form-group">
                                <label >Current Course Name: <b>{courseName}</b></label>
                                <input onChange={(e) => { setCourseName(e.target.value) }}
                                    type="text" className="form-control" placeholder="Enter Course Name"  />  
                            </div>
                            <div className="form-group">
                                <label >Current Course Content: <b>{courseContent}</b></label>
                                <input onChange={(e) => { setCourseContent(e.target.value) }}
                                    type="text" className="form-control" placeholder="Enter Course Content" />
                            </div>
                            <div className="form-group">

                                <label>Current Course Price: <b>${coursePrice}</b></label>
                                <input onChange={(e) => { setCoursePrice(e.target.value) }}
                                    type="text" className="form-control" placeholder="Enter price" />
                            </div>

                            {/* Teacher ----------- */}

                            <div>
                                <h3>Assign Teacher</h3>
                                <p>Current Teacher: {teacher}</p>
                                {getTeacherList()}
                            </div>

                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
        </div>
    )
}

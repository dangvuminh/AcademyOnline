import React, { useState } from 'react'
import "../../../../css/teacher/courseHandleDetail.css"
import Axios from "axios"


export default function CourseHandleDetail(props) {
    const [videoName, setVideoName] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

    const [pdfUrl, setPdfUrl] = useState("");
    const [pdfName, setPdfName] = useState("");

    const [courseState,setCourseState] = useState(0);
    
    const uploadVideo = () => {
        if(videoUrl !== ""){

        
        Axios({
            method: "post",
            url: "http://localhost:4000/api/video/addVideo",
            data: {
                videoName: videoName,
                videoUrl: videoUrl,
                teacherID: props.teacherID,
                courseID: props.course.course_id,
            }
        }).then(result => {
            if (result.data.state === 1) {
                alert("Uploaded Video successfully")
            } else {
                alert("Failed to upload the video!!")
            }
        })
    }
    }

    const uploadFile = () => {
        if(pdfUrl !== ""){
        Axios({
            method: "post",
            url: "http://localhost:4000/api/file/addFile",
            data: {
                fileName: pdfName,
                fileUrl: pdfUrl,
                teacherID: props.teacherID,
                courseID: props.course.course_id,
            }
        }).then(result => {
            if (result.data.state === 1) {
                alert("Uploaded File successfully")
            } else {
                alert("Failed to upload the file!!")
            }
        })
    }
    }

    const videoHanler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setVideoUrl(reader.result);
            }
        }

        reader.readAsDataURL(e.target.files[0]);
    }

    const pdfHanler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPdfUrl(reader.result);
            }
        }

        reader.readAsDataURL(e.target.files[0]);
    }

    const updateCourseState = () => {
        Axios({
            method:"post",
            url:"http://localhost:4000/api/course/updateCourseState",
            data:{
                courseID: props.course.course_id,
                courseState: courseState,
            }
        }).then(result=>{
            if(result.data.state === 1){
                alert("Update Course State Successfully");
            } else {
                alert("Failed to update Course State!!");
            }
        })
    }

    return (
        <div>
            <h3>Course Detail</h3>
            <ul className="list-group">
                <li className="list-group-item">Course Name: <b>{props.course.course_name}</b></li>
                <li className="list-group-item">Course Content: <b>{props.course.course_content}</b></li>
                <li className="list-group-item">Number of students: <b>{props.course.num_of_enrollments}</b></li>
            </ul>

            <div className="fileUpload">
                <div className="pdfUpload">
                    <h4>Upload PDF file</h4>
                    <input onChange={(e) => { setPdfName(e.target.value) }}
                        type="text" placeholder="Enter PDF file name" style={{ width: "400px" }} />
                    <input type="file" accept=".pdf" onChange={pdfHanler}/>
                    <div className="btn btn-primary" onClick={() => { uploadFile() }}>Upload Video</div>
                </div>
                <div className="videoUpload">
                    <h4>Upload Video</h4>
                    <input onChange={(e) => { setVideoName(e.target.value) }}
                        type="text" placeholder="Enter Video name" style={{ width: "400px" }} />
                    <input type="file" accept="video/*" onChange={videoHanler} />
                    <div className="btn btn-primary" onClick={() => { uploadVideo() }}>Upload Video</div>
                </div>
            </div>

            <div className="course-state">
            <div className="form-check-inline">
                <label className="form-check-label">
                    <input onChange={(e)=>{setCourseState(1)}}
                    type="radio" className="form-check-input" name="optradio" />Finished
          </label>
            </div>
            <div className="form-check-inline">
                <label className="form-check-label">
                    <input onChange={(e)=>{setCourseState(0)}}
                    type="radio" className="form-check-input" name="optradio" />Unfinished
          </label>
            </div>

            <div className="btn btn-primary" onClick={()=>{updateCourseState()}}>Update Course State</div>
            </div>

        </div>
    )
}

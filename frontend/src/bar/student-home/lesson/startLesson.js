import Axios from 'axios'
import React,{useEffect,useState} from 'react'
import ReactPlayer from "react-player"
import {useParams} from "react-router-dom"
import "../../../css/student-home/startLesson.css"

export default function StartLesson() {
    
    const params = useParams();
    const teacherID = params.teacher_id;
     const courseID = params.course_id;
    
    const [videoList,setVideoList] = useState([]);
    const [fileList,setFileList] = useState([]);
    // useEffect(()=>{
    //  Axios.get(`http://localhost:4000/api/video/getVideoByCourseID/${courseID}`).then(result=>{
    //          setVideoList(result.data);

    //      })
    //     Axios.get(`http://localhost:4000/api/file/getFileByCourseID/${courseID}`).then(result=>{
    //         setFileList(result.data[0].file_url);
    //     })
    // },[])

    const getVideoAPI = () => {
        console.log(teacherID)
         Axios.get(`http://localhost:4000/api/video/getVideoByCourseID/${courseID}`).then(result=>{
             if(result.data.state !== 0){
                setVideoList(result.data);
             }else{
                setVideoList(0);
            }
         })
    }
    
    const getFileAPI = () => {
        console.log(teacherID)
             Axios.get(`http://localhost:4000/api/file/getFileByCourseID/${courseID}`).then(result=>{
                if(result.data.state !== 0){
                    setFileList(result.data);
                 } else{
                     setFileList(0);
                 }
        })
    // },[])
     }
    const getVideoList = () =>{
        if(videoList){
            return videoList.map((item,index)=>{
                if(item.teacher_id_fk == teacherID){
                    return <div key={index} className="videoFile_item">
                    <ReactPlayer controls url={item.video_url}/>
                    </div>
                }
                
            })
        }else{
            return <h2>No Video Available</h2>
        }
        
    }

    const getFileList = () =>{
        if(fileList !== 0){
            return fileList.map((item,index)=>{
                if(item.file_teacher_id_fk == teacherID){
                    return <div key={index} className="videoFile_item">
                   <embed src={item.file_url}  type="application/pdf" />
                    </div>
                }
                
            })
        } else{
            return <h2>No PDF file Available</h2>
        }
        
    }
    return (
        <div>
            <h3>Click for PDF file</h3>
            <div className="btn btn-success" onClick={()=>{getFileAPI()}}>PDF File</div>
            <div className="pdfFile">
            {getFileList()}
            </div>
            <h3>Click for Videos</h3>
            <div className="btn btn-success" onClick={()=>{getVideoAPI()}}>VIDEO</div>
            <div className="videoFile">  
                {getVideoList()}
            </div>
        </div>
    )
}

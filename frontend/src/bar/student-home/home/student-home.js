import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Axios from "axios"
import avatar from "../../../img/avatar.png"
import "../../../css/student-home/student-home.css"
import OwnLesson  from "../lesson/ownLesson"
import FavoriteLesson from "../lesson/favoriteLesson"
import ProfileEdit from "../home/profileEdit";


export default function StudentHome() {
    const [student, setStudent] = useState([]);
    const [lesson,setLesson] = useState([]);
    const [isOwn,setIsOwn] = useState(false);
    const [isFavorite,setIsFavorite] = useState(false);
    const [msg,setMsg] = useState("");
    const [profileImg,setProfileImg] = useState(avatar);
    const params = useParams();
    const username = params.username;
    
    
    useEffect(() => {
        Axios({
            method: "post",
            url: `http://localhost:4000/api/student/getStudentData`,
            data: {
                accessToken: localStorage.getItem('accessToken'),
                username:username
            }
        }).then((result) => {
            setStudent(result.data[0]);
            setProfileImg(result.data[0].student_image);
        }).catch(err => {
            alert("Your Log-in time has run out.Please Log in again!!");
            localStorage.setItem('isLogin', false);
            window.open("/", "_parent");
        });
    }, []);

    const storeImage = (image) => {
        Axios({
            method:"post",
            url:"http://localhost:4000/api/student/uploadImage",
            data:{
                studentID:student.student_id,
                image: image,
            }
        })
    }

    const profileImgHanler = (e) => {
        const reader = new FileReader();
        reader.onload=()=>{
            if(reader.readyState === 2 ){
                setProfileImg(reader.result);
                storeImage(reader.result);
            }
        }
       
        reader.readAsDataURL(e.target.files[0]);
    }

    const getOwnCourseList = () => {
        Axios({
            method: "post",
            url: `http://localhost:4000/api/getEnrollment`,
            data: {
                studentID: student.student_id,
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then(result => {
            if (result.data.state == 0){
                setMsg("No course Available right now");
                    setIsFavorite(false);
            }
                else{
                    setLesson(result.data);
                    setIsOwn(true);
                    setIsFavorite(false);
                    setMsg("");
                }
               
        }).catch(err => {
            //if (err) throw err;
            alert("Your Log-in time has run out.Please Log in again!!");
            localStorage.setItem('isLogin', false);
            window.open("/", "_parent");
        })
    }

   const getFavoriteCourseList = () =>{
    Axios({
        method: "post",
        url: `http://localhost:4000/api/getFavoriteCourseList`,
        data: {
            studentID: student.student_id,
            accessToken: localStorage.getItem('accessToken'),
        }
    }).then(result => {
        if (result.data.state == 0){
            setMsg("No Favorite Course ");
            setIsOwn(false);
        }
            else{
                setLesson(result.data);
                setIsFavorite(true);
                setIsOwn(false);
                setMsg("");
            }
           
    }).catch(err => {
        //if (err) throw err;
        alert("Your Log-in time has run out.Please Log in again!!");
        localStorage.setItem('isLogin', false);
        window.open("/", "_parent");
    })
   }

    const drawLesson=()=>{
        if(isOwn == true){
            return <OwnLesson lesson={lesson}/>
        } else if(isFavorite ==true){
            return <FavoriteLesson lesson={lesson}/>
        }
    }

    const drawStudentHome = () => {
        return <div className="student-home">

            <div className="student-home-profile" className="card" style={{ width: '300px' }}>
                
                <div className="profilePic">
                <img className="card-img-top" src={profileImg} alt="Card image" />
                <div className="profilePicChanger">
                    <input type="file" name="image-upload" accept="image/*" onChange={profileImgHanler}/>
                </div>
                </div>
                <div className="card-body">
                    <h4 className="card-title">{student.student_firstname} {student.student_lastname}</h4>
                    
                    <ProfileEdit student={student} />
                </div>
            </div>

            <div className="student-home-course-manage">

                <div className="student-home-category">
                    <div onClick={()=>{ getFavoriteCourseList() }} className="favorite student-home-item">
                        <h2>Your Favourite Courses</h2>
                        <i class="fa fa-heart"></i>
                    </div>
                    <div onClick={() => { getOwnCourseList() }} className="boughtCourses student-home-item">
                        <h2>Your Own Courses</h2>
                        <i class="fa fa-book"></i>
                    </div>
                </div>
                <div className="student-home-course-list">
                <h2 style={{marginTop:"25px"}} className="msg">{msg}</h2>
                {drawLesson()}
                </div>
            </div>

        </div>

    }

    return (
        <div >
            {drawStudentHome()}

        </div>
    )
}

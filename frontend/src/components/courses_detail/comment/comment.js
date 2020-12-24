import React,{useState} from 'react'
import Axios from "axios"

export default function Comment(props) {
    const [comment,setComment] = useState("");
    const submitComment = () =>{
        
        Axios({
            method: "post",
            url:"http://localhost:4000/api/addComment",
            data:{ 
                comment : comment ,
                courseID: props.courseID,
                studentID: props.studentID,
                accessToken: localStorage.getItem('accessToken'),
            }
        })
    }

    return (
        <div>
            <form method="post">
                <textarea onChange={(e)=>{setComment(e.target.value)}} rows="6" cols="35" placeholder="Tell us more your ideas..."></textarea>
               <i onClick={()=>submitComment()} class="fa fa-paper-plane"></i>
            </form>
        </div>
    )
}

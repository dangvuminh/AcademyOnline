import React,{useEffect,useState} from 'react'
import { useParams } from "react-router-dom"
import Axios from "axios"

export default function StudentHome() {
    const [student,setStudent] = useState([]);
    const params = useParams();
    const username = params.username;

    useEffect(() => {
       Axios.get(`http://localhost:4000/api/getStudentProfile/${username}`).then((result)=>{
           console.log(result.data);
           setStudent(result.data);
       })
    }, []);

    const drawStudentProfile = () => {
        return student.map((item,index)=>{
            return <div className="card" style={{width: '400px'}}>
            <img className="card-img-top" src="img_avatar1.png" alt="Card image" />
            <div className="card-body">
              <h4 className="card-title">{item.student_firstname} {item.student_lastname}</h4>
              <p className="card-text">Some example text.</p>
              <a href="#" className="btn btn-primary">Edit Profile</a>
            </div>
          </div>
        })
    }

    return (
        <div>
            {drawStudentProfile()}
        </div>
    )
}

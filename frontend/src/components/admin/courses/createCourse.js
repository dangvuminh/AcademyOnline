import React,{useState,useEffect} from 'react'
import Axios from "axios"

export default function CreateCourse() {
    const [category, setCategory] = useState(0);
    const [courseName, setCourseName] = useState("");
    const [coursePrice, setCoursePrice] = useState("");
    const [teacherID,setTeacherID] = useState(-1);
    const [courseContent,setCourseContent] = useState("");
    const [teacherList, setTeacherList] = useState("");
    const [err1,setErr1] = useState("");
    const [err2,setErr2] = useState("");

    useEffect(() => {
       
        Axios.get("http://localhost:4000/api/getTeacherList").then(result => {
            setTeacherList(result.data);
        })
    },[])
    const getTeacherList = () => {
        if(teacherList)
        return teacherList.map((item, index) => {
                    return <div key={index} className="form-check " style={{textAlign:"left"}}>
                    <label className="form-check-label ">
                        <input onChange={(e)=>{setTeacherID(e.target.value)}}
                        type="radio" className="form-check-input" name="optradio" value={item.teacher_id} />{item.teacher_name}
                        
                </label>
                </div>
                
        })
    }

    const submitHandle=(e)=>{

        e.preventDefault();
         if(category ===  0){
            setErr1("Please check this box");
         } else if(teacherID === -1 ){
            setErr2("Please check this box");
         } else {
            setErr1("");setErr2("");
            Axios({
                method:"post",
                url:"http://localhost:4000/api/course/createCourse",
                data:{
                    courseName:courseName,
                    courseContent:courseContent,
                    coursePrice:coursePrice,
                    teacherID:teacherID,
                    category:category,
                    courseState:0
                }
            }).then((result)=> {
                if(result.data.state == 1){
                    alert("Create course Successfully");
                } else{
                    alert("Cannot create the course");
                }
            })
         }
       
    }
    return (
        <div>
            <form onSubmit={submitHandle}>

            <div style={{marginBottom:"20px"}}>
            <h5>Course Category</h5>

            {/* Error message */}
            <p style={{color:"red"}}>{err1}</p>
            <div className="form-check-inline " >
                    <label className="form-check-label">
                        <input onChange={(e)=>{setCategory(e.target.value)}}
                        type="radio" className="form-check-input" name="optradio" value={1} />Web Programming
                        
                </label>
                </div>

                <div className="form-check-inline " >
                    <label className="form-check-label ">
                        <input onChange={(e)=>{setCategory(e.target.value)}}
                        type="radio" className="form-check-input" name="optradio" value={2}/>Mobile Programming
                </label>
                </div>
                </div>

                            <div className="form-group">
                                <label > Course Name:</label>
                                <input onChange={(e) => { setCourseName(e.target.value) }}
                                    type="text" className="form-control" placeholder="Enter Course Name"  />  
                            </div>
                            <div className="form-group">
                                <label > Course Content: </label>
                                <input onChange={(e) => { setCourseContent(e.target.value) }}
                                    type="text" className="form-control" placeholder="Enter Course Content" />
                            </div>
                            <div className="form-group">

                                <label> Course Price:</label>
                                <input onChange={(e) => { setCoursePrice(e.target.value) }}
                                    type="text" className="form-control" placeholder="Enter price" />
                            </div>

                            {/* Teacher ----------- */}

                            <div>
                                <h3>Assign Teacher</h3>
                                <p style={{color:"red"}}>{err2}</p>
                                {getTeacherList()}
                            </div>

                            <button type="submit" className="btn btn-primary">Create</button>
                        </form>
        </div>
    )
}

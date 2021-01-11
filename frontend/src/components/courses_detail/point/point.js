import React, { useState, useEffect } from 'react'
import Axios from "axios"


export default function Point(props) {
  const [point, setPoint] = useState('0');
  
  const courseID = props.courseID;
  const studentID = props.studentID;

  

  const getAverage = () => {
    let average = 0;
    let count = 0;
    let pointArray = [];
    Axios.get(`http://localhost:4000/api/getPointsById/${courseID}`).then((result) => {
        
        pointArray = result.data;
        console.log((pointArray));
        for(let  i = 0 ; i < pointArray.length ; i++){
            if(pointArray[i].enrollment_point != null){
                average += pointArray[i].enrollment_point;
                count ++;
               
            }
        }
        average = average/count;
        props.point(average);
    });
  }

  const submitHandle = () => {
    Axios({
      method: "post",
      url: `http://localhost:4000/api/addPoint`,
      data: {
        accessToken: localStorage.getItem('accessToken'),
        studentID: studentID,
        courseID: courseID,
        point: parseInt(point)
      }
    }).then(() => {
      alert("Thank you for grading the Course!");
      getAverage();
    }).catch(err => {
            localStorage.setItem('isLogin', false);
            window.open("http://localhost:3000/", "_parent");
            alert("Please log in to grade this course");
    })
  }
 
  return (
    <div className="point">
      <h3>Give this course some points!</h3>
      <div className="form-check-inline">
        <label className="form-check-label">
          <input onChange={(e) => { setPoint(e.target.value) }}
            type="radio" className="form-check-input" name="optradio" value="1" /> 1
          </label>
      </div>
      <div className="form-check-inline">
        <label className="form-check-label">
          <input onChange={(e) => { setPoint(e.target.value) }}
            type="radio" className="form-check-input" name="optradio" value="2" /> 2
          </label>
      </div>
      <div className="form-check-inline">
        <label className="form-check-label">
          <input onChange={(e) => { setPoint(e.target.value) }}
            type="radio" className="form-check-input" name="optradio" value="3" /> 3
          </label>
      </div>
      <div className="form-check-inline">
        <label className="form-check-label">
          <input onChange={(e) => { setPoint(e.target.value) }}
            type="radio" className="form-check-input" name="optradio" value="4" /> 4
          </label>
      </div>
      <div className="form-check-inline">
        <label className="form-check-label">
          <input onChange={(e) => { setPoint(e.target.value) }}
            type="radio" className="form-check-input" name="optradio" value="5" /> 5
          </label>
      </div>
      <button onClick={()=>{submitHandle()}}>Okay</button>
    </div>
  
    
  )
}

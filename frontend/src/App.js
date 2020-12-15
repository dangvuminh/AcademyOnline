
import React,{useState} from "react"
import './App.css';
import Home from "./components/home/home"
import {BrowserRouter,Route} from "react-router-dom"
import Courses_detail from "./components/courses_detail/courses_detail"
import Bar from "./bar/bar"
import StudentHome from "./bar/student-home/home/student-home"
import {studentDataExport} from "./components/home/signin/signin"

export const studentContext = React.createContext();
function App() {
  const [studentData,setStudentData] = useState("");
  const getStudent=(studentData)=>{
    setStudentData(studentData);
  }
  
  console.log("APP"+ (studentData) );
  return (
   
    <div className="App">
       <studentContext.Provider value={studentData}>
       <BrowserRouter>
       <Bar studentData={getStudent}/>
       <Route path="/" component={Home} exact/>
        <Route path="/courses/:course_id" component={Courses_detail} exact/>
        <Route path="/student-home/:username" component={StudentHome} exact/>
      </BrowserRouter>
      </studentContext.Provider>
    </div>
   
  );
}

export default App;


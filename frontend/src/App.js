
import React,{useEffect,useState} from "react"
import './App.css';
import Home from "./components/home/home"
import {BrowserRouter,Route} from "react-router-dom"
import Courses_detail from "./components/courses_detail/courses_detail"
import Bar from "./bar/bar"
import StudentHome from "./bar/student-home/home/student-home"
import AdminSignIn from "./components/admin/admin_signIn"
import AdminHome from "./components/admin/adminhome"
import AuthenticatedRoute from "./components/admin/authen/authenticatedRoute"
import NotFound from "./components/admin/authen/notFound"
import AdminSignInRoute from "./components/admin/adminSignInRoute"
import  EditForm from "./components/admin/courses/editForm"
import AuthenTeacherRoute from "./components/teacher/authen/authenTeacherRoute"
import TeacherSignIn from "./components/teacher/teacher_signIn/teacherSignIn"
import TeacherHome from "./components/teacher/teacher_home/teacherHome"

function App() {
  return (
   
    <div className="App"> 
       <BrowserRouter>
       {/* <div style={{display : localStorage.getItem("adminIsLogIn") == true ? "none" : "block"}}> */}
       <Bar />
       {/* </div> */}
       <Route path="/" component={Home} exact/>
        <Route path="/courses/:course_id/:student_id" component={Courses_detail} exact/>
        <Route path="/student-home/:username" component={StudentHome} exact/>
        <Route path="/teacher" component={TeacherSignIn} exact/>

        <AuthenticatedRoute
          path="/admin-home"
          exact
          component={AdminHome}
        
        />

        <AuthenticatedRoute
          path="/admin-home/edit-course-form/:course_id"
          exact
          component={EditForm} 
        />

        <AuthenTeacherRoute
          path="/teacher-home/:username"
          exact
          component={TeacherHome} 
        />  

        {/* <Route path="/admin" component={AdminSignIn}  exact/> */}
        <AdminSignInRoute path="/admin" component={AdminSignIn} />
    
        <Route path="/notfound" component={NotFound} exact/>
       
      </BrowserRouter>
    </div>
   
  );
}

export default App;


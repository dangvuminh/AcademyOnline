
import './App.css';
import Home from "./components/home/home"
import {BrowserRouter,Route} from "react-router-dom"
import Courses_detail from "./components/courses_detail/courses_detail"
import Bar from "./bar/bar"
import StudentHome from "./bar/student-home/home/student-home"

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Bar />
       <Route path="/" component={Home} exact/>
        <Route path="/courses/:course_id" component={Courses_detail} exact/>
        <Route path="/student-home/:username" component={StudentHome} exact/>
      </BrowserRouter>
    </div>
  );
}

export default App;

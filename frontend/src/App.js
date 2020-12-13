
import './App.css';
import Home from "./components/home/home"
import {BrowserRouter,Route} from "react-router-dom"
import Courses_detail from "./components/courses_detail/courses_detail"

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Route path="/" component={Home} exact/>
        <Route path="/courses/:course_id" component={Courses_detail} exact/>
      </BrowserRouter>
    </div>
  );
}

export default App;

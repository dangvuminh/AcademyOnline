import React,{useEffect,useState} from 'react'


export default function AdminSignIn(props) {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
   const [isLogIn,setIsLogIn] = useState(false);
    useEffect(()=>{
      console.log("Yo man");
      if(isLogIn == true)
      window.open("http://localhost:3000/admin-home","_parent");
    },[isLogIn])
    const handleSubmit = (e) => {
      e.preventDefault();
      if(username == "admin" && password == "admin"){
        localStorage.setItem("adminIsLogIn","true");
        setIsLogIn(true);
      }
    }

    return (
        <div>
            <form className="was-validated" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="uname">Username:</label>
          <input onChange={(e)=>{setUsername(e.target.value)}}
          type="text" className="form-control" id="uname" placeholder="Enter username" name="uname" required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <input onChange={(e)=>{setPassword(e.target.value)}}
          type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" required />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
    
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
        </div>
    )
}

import React,{useState,useEffect} from 'react'
import Axios from "axios"
import "../../../css/home/menu.css"


export default function Menu(props) {
    const [category,setCategory] =useState([]);
    
    useEffect(()=>{
        Axios.get('http://localhost:4000/api/categories').then((result)=>{
        setCategory(result.data);
        })
    },[])

    const getCategories=()=>{
        return category.map((item,index)=>{
        return<div> <li ley={index} onClick={()=>{getCoursesAPI(item.category_id)}}>
            <i style={{fontSize:'20px',marginRight:'5px'}} className="fa fa-angle-right"></i>
                        <span>{item.category_name}</span></li>
                        </div>
        })
    }

    const getCoursesAPI=(categoryID)=> {
        Axios.get(`http://localhost:4000/api/getCoursesByCategory/${categoryID}`).then((result)=>{
            props.courses(result.data);
        })
    }

   
    //-------------------------------Render_____________________________
    return (
        <div className="menu home_item">
            <div className ="menu_content">
            <h3>Menu</h3>
            <ul>{getCategories()}</ul>
            </div>
        </div>
    )
}

import React from 'react'
import {Route,Redirect} from "react-router-dom"

export default function AuthenTeacherRoute({ component: C, ...rest }) {

    return (
        <Route
        {...rest}
        render={props =>
          localStorage.getItem("teacherLogIn") == "true"
            ? <C {...props} />
            : <Redirect
                to={`/notfound`}
              />
            }
      />
    )
}

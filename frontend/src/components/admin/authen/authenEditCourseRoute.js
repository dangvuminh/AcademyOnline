import React from 'react'
import {Route,Redirect} from "react-router-dom"

export default function AuthenEditCourseRoute({ component: C, ...rest }) {

    return (
        <Route
        {...rest}
        render={props =>
          localStorage.getItem("adminIsLogIn") == "true"
            ? <C {...props} />
            : <Redirect
                to={`/notfound`}
              />
            }
      />
    )
}

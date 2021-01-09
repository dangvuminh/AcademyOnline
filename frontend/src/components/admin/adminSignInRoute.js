import React from 'react'
import {Route} from "react-router-dom"

export default function AdminSignInRoute({ component: C,appProps, ...rest }) {
    return (
        <Route
        {...rest}
        render={props =>
             <C {...props} {...appProps} />
            }
      />
    )
}

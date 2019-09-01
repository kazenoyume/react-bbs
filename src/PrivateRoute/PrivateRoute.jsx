import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withCookies } from 'react-cookie'

const PrivateRoute = props => {
  const { component: Component, cookies, ...rest } = props
  return (
    <Route
      {...rest}
      render={props => {
        const {
          location: { pathname }
        } = props
        const userID = cookies.get('userID') || ''
        if (pathname === '/login') {
          return userID ? <Redirect to="/" /> : <Component {...props} />
        }
        return userID ? <Component {...props} /> : <Redirect to="/login" />
      }}
    />
  )
}
export default withCookies(PrivateRoute)
import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { userService } from './user.service';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
        <Route {...rest} render={props => (userService.IsLogin() && restricted ? <Redirect to="/" /> : <Component {...props} />)} />
    )
}
export default PublicRoute;
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userService } from './user.service';

// handle the private routes
const PrivateRoute = ({ component: Component, restricted, ...rest }) => {
    return (
        <Route {...rest} render={props => (userService.IsLogin() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }, }}
        />)} />
    );
}
export default PrivateRoute;
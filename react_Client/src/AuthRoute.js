import React from 'react'
import { Route, Redirect } from 'react-router-dom'

class RoutePrivate extends React.Component {
  render (props) {
    return window.sessionStorage.getItem('UserToken')
      ? <Route
        {...props}
        path={this.props.path}
        component={this.props.component}
        />
      : <Redirect to='/login' />
  }
}

export default RoutePrivate;

/**
 * This is the entry point to the app
 */

// Make sure we have valid ES6 polyfills
import "babel-core/polyfill";

import React from "react";
import Router from "react-router";

var {Route, RouteHandler} = Router;

var App = React.createClass({
  render () {
    return (
      <div>
        <h1>Hello world!</h1>
        <RouteHandler/>
      </div>
    )
  }
});

var routes = <Route path='/' handler={App}></Route>;

// Start the router
Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});

/**
 * This is the entry point to the app
 */
import "./styles/main.less";

import React from "react";
import Router from "react-router";
import WelcomePage from "./welcome";
import GalaxyPage from "./galaxy/galaxyPage.jsx";

var {Route, RouteHandler, DefaultRoute} = Router;

var App = React.createClass({
  render () {
    return (
      <RouteHandler/>
    )
  }
});

var routes = (
    <Route path='/' handler={App}>
      <Route name='galaxy' path='/galaxy/:name' handler={GalaxyPage}/>
      <DefaultRoute name='welcome' handler={WelcomePage}/>
    </Route>
    );

// Start the router
Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById('app'));
});

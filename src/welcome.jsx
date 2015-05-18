import React from "react";

export default class WelcomePage extends React.Component {
  render() {
    return (
      <div className='container'>
        <h1>Welcome to the Code Galaxies, Commander</h1>
        <h2>Choose your destination:</h2>
        <ul>
          <li><a href='#/galaxy/npm'>npm</a></li>
          <li><a href='#/galaxy/bower'>Bower</a></li>
          <li><a href='#/galaxy/composer'>Composer</a></li>
          <li><a href='#/galaxy/rubygems'>RubyGems</a></li>
          <li><a href='#/galaxy/gosearch'>Go Search</a></li>
          <li><a href='#/galaxy/cpan'>cpan</a></li>
        </ul>
      </div>
    );
  }
}

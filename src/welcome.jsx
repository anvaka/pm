import React from "react";

export default class WelcomePage extends React.Component {
  render() {
    return (
      <div className='container'>
        <h1>Welcome to the Code Galaxies, Commander</h1>
        <h2>Choose your destination:</h2>
        <ul>
          <li><a href='#/galaxy/npm?cx=-1345&cy=-7006&cz=-6553&lx=0.621700613972938&ly=-0.6458651572907126&lz=0.30983196944957914&lw=0.31678177960626197&l=1'>npm</a></li>
          <li><a href='#/galaxy/bower'>Bower</a></li>
          <li><a href='#/galaxy/composer'>Composer</a></li>
          <li><a href='#/galaxy/rubygems'>RubyGems</a></li>
          <li><a href='#/galaxy/gosearch?l=1'>Go Search</a></li>
        </ul>
      </div>
    );
  }
}

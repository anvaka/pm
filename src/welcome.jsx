import React from "react";

export default class WelcomePage extends React.Component {
  render() {
    return (
      <div className='container'>
        <h1>Welcome to the Code Galaxies, Commander</h1>
        <h2>Choose your destination:</h2>
        <div className='list-group'>
          <a className='list-group-item' href='#/galaxy/npm?cx=-1345&cy=-7006&cz=-6553&lx=0.621700613972938&ly=-0.6458651572907126&lz=0.30983196944957914&lw=0.31678177960626197&l=1'>npm</a>
          <a className='list-group-item' href='#/galaxy/bower?l=1'>Bower</a>
          <a className='list-group-item' href='#/galaxy/composer?l=1'>Composer</a>
          <a className='list-group-item' href='#/galaxy/rubygems?l=1'>RubyGems</a>
          <a className='list-group-item' href='#/galaxy/gosearch?l=1'>Go Search</a>
        </div>
      </div>
    );
  }
}

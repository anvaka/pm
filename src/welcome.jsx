import React from "react";

export default class WelcomePage extends React.Component {
  render() {
    return (
      <div className='container'>
        <h1>Welcome to the Code Galaxies, Commander</h1>
        <h2>Choose your destination:</h2>
        <div className='list-group'>
          <a className='list-group-item' href='#/galaxy/bower?l=1'>Bower</a>
          <a className='list-group-item' href='#/galaxy/composer?l=1'>Composer</a>
          <a className='list-group-item' href='#/galaxy/rubygems?l=1'>RubyGems</a>
          <a className='list-group-item' href='#/galaxy/npm?cx=-1345&cy=-7006&cz=-6553&lx=0.621700613972938&ly=-0.6458651572907126&lz=0.30983196944957914&lw=0.31678177960626197&l=1'>npm</a>
          <a className='list-group-item' href='#/galaxy/gosearch?l=1'>Go Search</a>
          <a className='list-group-item' href='#/galaxy/debian?cx=-201&cy=-6170&cz=-6841&lx=0.5676&ly=-0.7456&lz=0.2400&lw=0.2536&ml=150&s=1.75&l=1'>Debian</a>
          <a className='list-group-item' href='#/galaxy/arch?cx=870&cy=-3968&cz=-2010&lx=0.7695&ly=-0.3554&lz=0.3109&lw=0.4299&ml=150&s=1.75&l=1&v=2015-07-29T02-30-00Z'>Arch</a>
          <a className='list-group-item' href='#/galaxy/cran?cx=-2482&cy=-5685&cz=-291&lx=0.2264&ly=-0.6790&lz=0.4330&lw=0.5480&ml=200&s=2.75&l=1'>R Language</a>
          <a className='list-group-item' href='#/galaxy/brew?cx=-803&cy=-3622&cz=-1640&lx=0.3774&ly=-0.7360&lz=0.4338&lw=0.3573&ml=200&s=2.75&l=1'>Homebrew</a>
        </div>
      </div>
    );
  }
}

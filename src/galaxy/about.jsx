import React from 'react';
export default require('maco').template(about);

function about() {
  return (
  <div  className='label about'>
     <a className='reset-color'
        target='_blank'
        href="https://github.com/anvaka/pm/tree/master/about#software-galaxies-documentation">About...</a>
  </div>
  );
}

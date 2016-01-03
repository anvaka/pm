import React from 'react';
export default require('maco').template(noWebGL, React);

function noWebGL() {
  return (
  <div  className='container'>
    <h3 className='error'>Could not initialize WebGL</h3>
    <p className='error-details'>
      Your browser does not seem to support WebGL.
      Find out how to get it <a href="http://get.webgl.org/">here</a>.
    </p>
  </div>
  );
}

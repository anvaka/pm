import React from 'react';
export default require('maco').template(help);

function help() {
  return (
  <div className='container navigation-help'>
    <h3>How to navigate this graph?</h3>
    <p className='error-details'>
      <table><tbody>
<tr>
<td align="right"><code>W</code></td>
<td align="left">Move forward</td>
<td align="right"><code>Up</code></td>
<td>Rotate up</td>
</tr>
<tr>
<td align="right"><code>S</code></td>
<td align="left">Move backward</td>
<td align="right"><code>Down</code></td>
<td>Rotate down</td>
</tr>
<tr>
<td align="right"><code>A</code></td>
<td align="left">Move left</td>
<td align="right"><code>Left</code></td>
<td>Rotate left</td>
</tr>
<tr>
<td align="right"><code>D</code></td>
<td align="left">Move right</td>
<td align="right"><code>Right</code></td>
<td>Rotate right</td>
</tr>
<tr>
<td align="right"><code>Q</code></td>
<td align="left">Roll right</td>
<td align="right"><code>R</code></td>
<td>Fly up</td>
</tr>
<tr>
<td align="right"><code>E</code></td>
<td align="left">Roll left</td>
<td align="right"><code>F</code></td>
<td>Fly down</td>
</tr>
<tr>
<td align="right"><code>L</code></td>
<td align="left">Toggle links</td>
<td align="right"><code>/</code></td>
<td>Focus search</td>
</tr>
</tbody></table>
    </p>
  </div>
  );
}

var React = require('react');
module.exports = require('maco')(tooltip);

function tooltip(x) {
  var name, style = {
    display : 'none'
  };
  var inDegree = 0, outDegree = 0;

  x.render = render;

  function render() {
    updateViewModel(x.props.model);

    return (
      <div style={style}
           className='node-hover-tooltip'>
        <span className='in-degree'>{inDegree} -&gt; </span>
          {name}
        <span className='out-degree'> -&gt; {outDegree}</span>
      </div>
    );
  }

  function updateViewModel(model) {
    if (model) {
      name = model.node.name;
      inDegree = model.node.in;
      outDegree = model.node.out;

      style.left = model.x,
      style.top = model.y - 35,
      style.display = 'block'
    } else {
      name = '';
      style.display = 'none';
    }
  }
}

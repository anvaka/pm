import React from 'react';

export default class HoverPreview extends React.Component {
  render() {
    var model = this.props.model;
    if (!model) return false;

    return (
      <div className='node-hover-list'>
        {model.total}
        <ul>
          {model.snippet.map(toRecord)}
        </ul>
      </div>
    );
  }
}

function toRecord(x) {
  return <li>{x}</li>;
}

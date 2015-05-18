import React from "react";

export default class GalaxyPage extends React.Component {
  componentWillReceiveProps() {
    //console.log(name);
  }

  render() {
    var name = this.props.params.name;
    return (
      <div>
        {name}
      </div>
    );
  }
}

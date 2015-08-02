import React from "react";

const prefix = 'https://raw.githubusercontent.com/wiki/anvaka/pm/images/';

export default class Destination extends React.Component {
  setHoverOn() {
    this.setState({ hover: true });
  }

  setHoverOff() {
    this.setState({ hover: false });
  }

  render() {
    let x = this;
    let props = x.props;
    let isHover = x.state ? x.state.hover : false;
    let imageSrc = prefix + props.media;
    if (isHover) imageSrc = imageSrc.replace(/_first\.png/, '_150.gif');

    return (
  <a className='media col-md-6 col-lg-4' href={props.href}
     onMouseEnter={x.setHoverOn.bind(x)} onMouseLeave={x.setHoverOff.bind(x)}>
    <div className='media-left'>
      <img className='media-object'
           width='150px'
           height='93px'
           src={imageSrc}
           alt={props.name}/>
    </div>
    <div className='media-body'>
      <h4 className='media-heading'>{props.name}</h4>
      {props.description}
    </div>
  </a>
    );
  }

}

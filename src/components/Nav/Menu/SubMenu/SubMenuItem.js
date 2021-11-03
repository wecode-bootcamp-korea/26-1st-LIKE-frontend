import React, { Component } from 'react';
import './SubMenuItem.scss';

export class SubMenuItem extends Component {
  render() {
    const { name } = this.props;

    return <li className="SubMenuItem">{name}</li>;
  }
}

export default SubMenuItem;

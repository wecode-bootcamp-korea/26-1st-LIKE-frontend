import React, { Component } from 'react';
import MiniCart from './MiniCart';

export class MiniCartModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  componentDidMount() {
    this.stopScrollBackground();
  }

  stopScrollBackground = () => {
    const { open } = this.state;
    if (open) document.body.style.overflow = 'hidden';
  };

  scrollBackground = () => {
    document.body.style.overflow = 'unset';
  };

  close = () => {
    this.setState({
      open: false,
    });
    this.scrollBackground();
  };

  render() {
    const { open } = this.state;
    return open && <MiniCart close={this.close} />;
  }
}

export default MiniCartModal;

import React, { Component } from 'react';
import MenuItem from './MenuItem';
import './MenuList.scss';

export class MenuList extends Component {
  render() {
    const { categories } = this.props;

    return (
      <div className="MenuList">
        <ul className="menuInner">
          {categories.map(category => {
            const { id, name, list } = category;
            return <MenuItem key={id} name={name} list={list} />;
          })}
        </ul>
      </div>
    );
  }
}

export default MenuList;
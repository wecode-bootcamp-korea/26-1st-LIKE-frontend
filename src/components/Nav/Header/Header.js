import React, { Component } from 'react';
import MenuList from './Menu/MenuList';
import { Link } from 'react-router-dom';
import {
  MdSearch,
  MdOutlineFavoriteBorder,
  MdOutlineShoppingBag,
} from 'react-icons/md';
import './Header.scss';

export class Header extends Component {
  render() {
    const { categories } = this.props;

    return (
      <div>
        <div className="Header">
          <nav>
            <MenuList categories={categories} />
            <div className="logo">
              <Link to="/main">
                <img src="/images/LogoLIKE.svg" alt="라이키 로고" />
              </Link>
            </div>
            <div className="iconGroup">
              <form>
                <div className="searchIcon">
                  <MdSearch />
                </div>
                <input placeholder="검색" type="search" />
              </form>
              <div className="icon">
                <MdOutlineFavoriteBorder />
              </div>
              <div className="icon">
                <MdOutlineShoppingBag />
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;

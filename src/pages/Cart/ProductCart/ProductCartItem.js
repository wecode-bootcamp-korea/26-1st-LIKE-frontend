import React, { Component } from 'react';

export class ProductCartItem extends Component {
  formatNumber = number => {
    return Number(number).toLocaleString('en-US');
  };

  render() {
    const { title, serial, price, size, quantity, thumbnail } = this.props;

    return (
      <li className="ProductCartItem">
        <div className="imageWrap">
          <img className="image" src={thumbnail} alt="내가 선택한 상품" />
        </div>
        <div className="productInfo">
          <div className="title">{title}</div>
          <div className="serial">스타일: {serial}</div>
          <div className="size">사이즈: {size}</div>
          <div className="quantity">수량: {quantity}</div>
        </div>
        <div className="optionWrap">옵션 변경</div>
        <div className="price">{this.formatNumber(price)}원</div>
        <div className="deleteBtn">X</div>
        <div />
        <div className="btn-box">
          <button className="btn">위시리스트에 추가</button>
          <button className="btn">나중에 추가</button>
        </div>
      </li>
    );
  }
}

export default ProductCartItem;

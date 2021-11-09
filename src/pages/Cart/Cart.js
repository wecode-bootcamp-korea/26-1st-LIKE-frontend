import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';
import ProductCart from './ProductCart/ProductCart';
import './Cart.scss';

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
    };
  }

  componentDidMount() {
    this.orderData();
  }

  orderData = () => {
    fetch('/data/order/orderData.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          orderData: data,
          totalPrice: this.calculateTotal(data),
          totalItemQuantity: data.length,
        });
      });
  };

  calculateTotal = list => {
    let totalPrice = list
      .map(order => Number(order.price))
      .reduce((accumulator, price) => accumulator + price);

    return totalPrice.toLocaleString('en-US');
  };

  render() {
    const { orderData, totalItemQuantity, totalPrice } = this.state;

    return (
      <div>
        <Nav />
        <div className="Cart">
          <main className="cartInner">
            <h2 className="cartTitle">장바구니</h2>
            <div className="cartNumber">
              <span>{totalItemQuantity}개 상품</span>
            </div>
            <div className="cartContainer">
              <div className="info">
                사용 가능한 쿠폰이 있습니다
                <br />
                아래 프로모 코드란에 입력하여 사용해주세요
              </div>
              <div className="myCart">
                <div className="myCartList">
                  <div className="productSelectAll">전체삭제</div>
                  <ProductCart orderData={orderData} />
                </div>
                <div className="myCartCheckOut">
                  <div className="checkoutList">
                    <div className="title">주문예정금액</div>
                    <div className="productInBox">
                      <div className="priceInfo">
                        <div className="itemPrice">
                          <span className="label">상품금액</span>
                          <span className="price">{totalPrice} 원</span>
                        </div>
                        <div className="deliveryPrice">
                          <span className="label">예상 배송비</span>
                          <span className="price">0 원</span>
                        </div>
                        <div className="salePrice">
                          <span className="label">상품 할인 금액</span>
                          <span className="price">0 원</span>
                        </div>
                        <div className="salePrice">
                          <span className="label">주문 할인 금액</span>
                          <span className="price">0 원</span>
                        </div>
                        <div className="totalPrice">
                          <span className="label">총 결제 예정 금액</span>
                          <span className="price">{totalPrice}원</span>
                        </div>
                        <button className="btn checkout">주문하기</button>
                      </div>
                    </div>
                  </div>
                  <div className="promoList">
                    <ul className="offerList">
                      <li className="offerItem">
                        <div className="marketingInfo">
                          *오퍼코드:
                          <span className="code">welcome2like2021</span>
                        </div>
                        <div className="subeMarketingInfo">
                          *사용 가능한 신규가입 쿠폰이 있습니다. (1만원 할인
                          적용되어 장바구니 전체에 5만원 이상 구매 시
                          적용됩니다.)
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Cart;

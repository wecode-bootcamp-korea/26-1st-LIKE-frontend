import React, { Component } from 'react';
import './Main.scss';
import COLOR_LISTS from './colorList';
import Products from './ProductsInfo/Products';
import { Link } from 'react-router-dom';
import { API } from '../../config';

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsInfo: [],
      selectedItemColor: [],
      baseUrl: API.baseUrl,
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { search, pathname } = location;
    const { search: prevSearch, pathname: prevPathname } = prevProps.location;

    if (pathname !== prevPathname || search !== prevSearch) {
      this.getProducts();
    }
  }

  getProducts = () => {
    const { baseUrl } = this.state;
    const { match, location } = this.props;
    const { category } = match.params;
    const { search } = location;

    const changeNumber = {
      shoes: '2',
      clothing: '3',
      sports: '4',
      supplies: '5',
    };

    const categoryPath = category
      ? '?main_category=' + changeNumber[category]
      : '';
    const queryString = search || '';

    fetch(baseUrl + '/products' + categoryPath + queryString)
      .then(res => res.json())
      .then(data => {
        this.setState({
          productsInfo: data.results.reverse(),
        });
      });
  };

  updateSize = e => {
    const { history, location } = this.props;
    const name = e.currentTarget.value;

    const currentQueryString = location.search;
    const url = new URLSearchParams(currentQueryString);

    const isSizeExist = url.getAll('size').includes(name);

    if (isSizeExist) {
      filterSizeExist();
    } else {
      filterSizeNotExist();
    }

    applyQueryStringToURL();

    function filterSizeExist() {
      const sizes = url.getAll('size');
      const isCertainSizeExist = sizes.includes(name);

      if (isCertainSizeExist) {
        const filteredSizes = sizes.filter(size => size !== name);

        url.delete('size');
        filteredSizes.forEach(size => url.append('size', size));
      }
    }

    function filterSizeNotExist() {
      url.append('size', name);
    }

    function applyQueryStringToURL() {
      const qs = url.toString();
      const query = `${url.toString() ? '?' : ''}` + qs;

      history.push('/products' + query);
    }
  };

  updateColor = e => {
    const { history, location } = this.props;
    const name = e.currentTarget.value;

    const currentQueryString = location.search;
    const url = new URLSearchParams(currentQueryString);

    const isSizeExist = url.getAll('color').includes(name);

    if (isSizeExist) {
      const colors = url.getAll('color');
      const isCertainSizeExist = colors.includes(name);

      if (isCertainSizeExist) {
        const filteredColors = colors.filter(color => color !== name);

        url.delete('color');
        filteredColors.forEach(color => url.append('color', color));
      }
    } else {
      url.append('color', name);
    }

    const query = url.toString() ? '?' + url.toString() : '';

    history.push('/products' + query);

    this.setState({ selectedItemColor: url.getAll('color') });
  };

  render() {
    const { productsInfo, selectedItemColor } = this.state;

    return (
      <div className="MainWrapper">
        <div className="sectionHeader">
          <div className="sectionTitle">
            <div className="sectionTitleCategory">
              <span className="categoryName">Men</span>
              <br />
              <br />
              <span>Men's 의류(12)</span>
            </div>

            <div className="sectionControl">
              <button>필터</button>
              <select name="list" className="productsFilter">
                <option value="newestOrder">신상품순</option>
                <option value="hightCostOrder">높은가격순</option>
                <option value="lowCostOrder">낮은가격순</option>
              </select>
            </div>
          </div>
        </div>

        <div className="contentsWrapper">
          <aside className="contentsSide">
            <div className="HorizontalLine" />
            <div className="colors">
              <span>색상</span>
              <ul className="colorLists">
                {COLOR_LISTS.map(color => {
                  return (
                    <li className="colorLayout" key={color.id}>
                      <label
                        className={`checkboxLabel ${
                          selectedItemColor.includes(color.color_name)
                            ? 'checked'
                            : ''
                        }`}
                        style={{ backgroundColor: color.colorProps }}
                      >
                        <input
                          onChange={this.updateColor}
                          type="checkbox"
                          value={color.color_name}
                        />
                      </label>
                      <span className="productColor">
                        {color.color_name.toUpperCase()}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="sizes">
              <div className="HorizontalLine" />
              <span>사이즈</span>
              <div className="sizeLists">
                <label>
                  <button
                    className="active"
                    onClick={this.updateSize}
                    value="230"
                    key="1"
                  >
                    230
                  </button>
                </label>
                <button onClick={this.updateSize} value="235">
                  235
                </button>
                <button onClick={this.updateSize} value="240">
                  240
                </button>
                <button onClick={this.updateSize} value="245">
                  245
                </button>
                <button onClick={this.updateSize} value="250">
                  250
                </button>
                <button onClick={this.updateSize} value="255">
                  255
                </button>
                <button onClick={this.updateSize} value="260">
                  260
                </button>
                <button onClick={this.updateSize} value="265">
                  265
                </button>
                <button onClick={this.updateSize} value="270">
                  270
                </button>
                <button onClick={this.updateSize} value="275">
                  275
                </button>
                <button onClick={this.updateSize} value="280">
                  280
                </button>
                <button onClick={this.updateSize} value="xs">
                  XS
                </button>
                <button onClick={this.updateSize} value="s">
                  S
                </button>
                <button onClick={this.updateSize} value="m">
                  M
                </button>
                <button onClick={this.updateSize} value="l">
                  L
                </button>
                <button onClick={this.updateSize} value="xl">
                  XL
                </button>
                <button onClick={this.updateSize} value="xxl">
                  XXL
                </button>
                <button onClick={this.updateSize} value="xxxl">
                  XXXL
                </button>
              </div>
              <div className="HorizontalLine" />
            </div>
          </aside>

          <main className="contentsBody">
            <div className="contentsLink">
              <div className="viewAll">
                <Link to="/products">
                  <button className="btn">
                    <span>전체 보기</span>
                  </button>
                </Link>
              </div>
              <div className="Shoes">
                <Link to="/products/shoes">
                  <button className="btn">
                    <span>신발</span>
                  </button>
                </Link>
              </div>
              <div className="Clothes">
                <Link to="/products/clothing">
                  <button className="btn">
                    <span>옷</span>
                  </button>
                </Link>
              </div>
              <div className="Supplies">
                <Link to="/products/supplies">
                  <button className="btn">
                    <span>용품</span>
                  </button>
                </Link>
              </div>
              <div className="Sports">
                <Link to="/products/sports">
                  <button className="btn">
                    <span>스포츠</span>
                  </button>
                </Link>
              </div>
            </div>

            <article className="productsMapping">
              {productsInfo &&
                productsInfo.map(product => {
                  return <Products key={product.id} productInfo={product} />;
                })}
            </article>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;

import React from 'react';
import axios from 'axios';
import * as qs from 'query-string';
import SearchBar from '../components/searchBar';

class Items extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loaded: false
    };

    this.init();
  }

  init() {
    let query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    if (query.search) {
      axios
        .get(`http://localhost:5000/api/items?q=${query.search}`)
        .then(response => {
          this.setState({
            items: response.data.items,
            loaded: true
          });
        });
    }
  }

  formatPrice(price) {
    return price.toLocaleString('pt-br', {
      useGrouping: false,
      minimumFractionDigits: 2
    });
  }

  render() {
    const { items, loaded } = this.state;

    let listItems;
    if (loaded) {
      listItems = items.map((productItem, index) => (
        <li key={'item' + index} className="item-list-item">
          <a href={`/items/${productItem.id}`} className="flex">
            <img src={productItem.picture} alt={productItem.title} />
            <p className="description">
              <span className="price">
                <span className="currency">R$</span>
                <span className="value">
                  {this.formatPrice(productItem.price)}
                </span>
              </span>
              <span>{productItem.title}</span>
            </p>
            <p className="address">{productItem.city}</p>
          </a>
        </li>
      ));
    }

    return (
      <div className="Items">
        <SearchBar />
        <div className="container">
          <div className="content">
            <ul className="item-list">{listItems}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Items;

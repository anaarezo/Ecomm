import React from 'react';
import axios from 'axios';
import SearchBar from '../components/searchBar';

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      loaded: false
    };

    this.init();
  }

  init() {
    let productID = this.props.match.params.id;
    axios.get(`http://localhost:5000/api/items/${productID}`).then(response => {
      this.setState({
        product: response.data,
        loaded: true
      });
    });
  }

  formatPrice(price) {
    return price.toLocaleString('pt-br', {
      useGrouping: false,
      minimumFractionDigits: 2
    });
  }

  render() {
    const { product, loaded } = this.state;
    let content;
    let priceInfo;

    if (loaded) {
      content = (
        <div className="detail-info">
          <img src={product.item.picture} alt="" />
          <h2>Descrição do produto</h2>
          <p>{product.item.description}</p>
        </div>
      );

      priceInfo = (
        <div className="price-info">
          <h5 className="item-condition">
            <span>{product.item.condition == 'new' ? 'Novo' : 'Usado'} </span>
            {product.item.sold_quantity} vendidos
          </h5>
          <h4 className="title">{product.item.title}</h4>
          <p className="price">
            <span className="currency">R$</span>
            <span className="value">
              {this.formatPrice(product.item.price)}
            </span>
          </p>
          <button className="buy-btn">Comprar</button>
        </div>
      );
    }

    return (
      <div className="ItemDetail">
        <SearchBar />
        <div className="container">
          <div className="content flex">
            <div className="col main-column">{content}</div>
            <div className="col price-column">{priceInfo}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetail;

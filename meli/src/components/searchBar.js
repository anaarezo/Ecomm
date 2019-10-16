import React from 'react';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.init();
  }

  init() {}

  onSubmit(e) {
    //e.preventDefault();
    //var url = window.location;
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }

  handleLogo(e) {}

  render() {
    return (
      <div className="SearchBar">
        <div className="container">
          <form
            action="/items"
            metho="GET"
            onSubmit={e => this.onSubmit(e)}
            className="flex"
          >
            <Link to="/" className="logo"></Link>
            <input
              type="text"
              name="search"
              id="search"
              value={this.state.value}
              placeholder="Busca"
              onChange={e => this.onChange(e)}
            />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;

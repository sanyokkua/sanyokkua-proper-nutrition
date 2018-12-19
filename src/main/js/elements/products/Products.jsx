import {CardPanel, Input} from 'react-materialize';
import ProductsList from './ProductsList'
import axios from "axios";

const React = require('react');
const ReactDOM = require('react-dom');

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      editable: true
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    let searchText = event.target.value;
    if (searchText) {
      axios.get('/products', {
            params: {
              name: searchText
            }
          })
          .then(response => {
            console.log(response);
            this.setState({list: response.data});
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  }

  componentDidMount() {
  }

  render() {
    return <div>
      <CardPanel className="blue darken-2 white-text">
        <nav className="red darken-1">
          <div className="nav-wrapper">
            <form>
              <div className="input-field">
                <Input id="search" type="search" required onChange={this.handleSearch}>
                  <label className="label-icon" htmlFor="search"><i className="material-icons large red-text">search</i></label>
                  <i className="material-icons indigo darken-4">close</i> </Input>
              </div>
            </form>
          </div>
        </nav>
        {this.state.list && this.state.list.length > 0 ? (<ProductsList productsList={this.state.list} editable={this.state.editable}/>) : ''}
      </CardPanel>

    </div>
  }
}

export default Products;

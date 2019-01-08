import {Button, CardPanel, Col, Input, Row} from 'react-materialize';
import ProductsList from './ProductsList'
import axios from "axios";
import ProductEdit from "./ProductEdit";

const React = require('react');
const ReactDOM = require('react-dom');

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      editable: true
    };
    this.loadDefaultData();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleLoadCsv = this.handleLoadCsv.bind(this);
    this.handleEditList = this.handleEditList.bind(this);
    this.handleDeleteFromList = this.handleDeleteFromList.bind(this);
  }

  loadDefaultData() {
    axios.get('/products')
        .then(response => {
          console.log(response);
          this.setState({list: response.data});
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  handleSearch(event, value) {
    let searchText = value;
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
    } else {
      this.loadDefaultData();
    }
  }

  handleCreate(product, event) {
    let newList = this.state.list;
    newList.push(product);
    this.setState({
      list: newList
    });
  }

  handleEditList(productsList, product, event) {
    console.log(product);
    console.log(event);
    let list = productsList;
    list.forEach((element, index) => {
      if(element.id === product.id) {
        list[index] = product;
      }
    });
    this.setState({
      list: list
    });
  }

  handleDeleteFromList(productsList, product, event){
    let filtered = productsList.filter(function (value, index, arr) {
      if(value.id !== product.id) {
        return value;
      }
    });
    this.setState({
      list: filtered
    });
  }

  handleLoadCsv(event, value) {
    console.log(event);
    console.log(value);
  }

  componentDidMount() {
  }

  render() {
    return <div>
      <CardPanel className="blue darken-2 white-text">
        <Row>
          <Col s={4}>
            <nav className="red darken-1">
              <div className="nav-wrapper">
                <form>
                  <div className="input-field">
                    <Input id="search" type="search" required onChange={this.handleSearch}>
                      <label className="label-icon" htmlFor="search"><i className="material-icons large red-text">search</i></label>
                      <i className="material-icons indigo darken-4">close</i></Input>
                  </div>
                </form>
              </div>
            </nav>
          </Col>
          {this.state.editable ? (<Col s={2}><ProductEdit isCreation={true} onEditClick={this.handleCreate} modalTrigger={<Button waves='green' className='green darken-1'>Create</Button>} currentProduct={null}/></Col>) : ''}
          {this.state.editable ? (<Col s={6}><Input waves='light' type="file" label="Load CSV" s={12} onChange={this.handleLoadCsv}/></Col>) : ''}
        </Row>
        {this.state.list && this.state.list.length > 0 ? (<ProductsList onDeleteFromList={this.handleDeleteFromList} onEditList={this.handleEditList} productsList={this.state.list} editable={this.state.editable}/>) : ''}
      </CardPanel>
    </div>
  }
}

export default Products;

import {Button, Collection, CollectionItem, Pagination} from 'react-materialize';

const React = require('react');

class ProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit(product, event) {
    console.log(product);
    console.log(event);
  }

  handleDelete(product, event) {
    console.log(product);
    console.log(event);
  }

  componentDidMount() {
  }

  render() {
    return !this.props.productsList || this.props.productsList.length < 1 ? ('') :
        (<div className="black-text">
          <Collection>
            {this.props.productsList.map((product) => {
              return <div key={product.id} className="black-text">
                <CollectionItem>
                  <div className="black-text"> {product.name} -- {product.energy}</div>
                  {this.props.editable ? (<div className='right-align'>
                    <Button waves='green' className='green darken-1' onClick={(e) => this.handleEdit(product, e)}>Edit</Button>
                    <Button waves='purple' className='red darken-1' onClick={(e) => this.handleDelete(product, e)}>Delete</Button>
                  </div>) : ''}
                </CollectionItem>
              </div>
            })}
          </Collection>
          <div className='container black-text '>
            <Pagination className='center-align' items={10} activePage={1} maxButtons={this.props.productsList.length / 10}/>
          </div>
        </div>)
  }
}

export default ProductsList;

import React                                                                    from 'react';
import { Collapsible, CollapsibleItem, Collection, CollectionItem, Pagination } from "react-materialize";
import PropTypes                                                                from "prop-types";

class DishesList extends React.Component {
    constructor(props) {
        super(props);
        this.id = 0;
        this.onProductSelect = this.onProductSelect.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }

    onProductSelect(product) {
        window.Materialize.toast("Product name: -- " + product.name, 1000);
    }

    onPageChange(pageNumber) {
        this.props.onPageChange(pageNumber);
    }

    render() {
        return <div>
            <Collapsible className="white">
                { this.props.dishList && this.props.dishList.length > 0 ? (this.props.dishList.map(value => {
                        return <CollapsibleItem key={ value.id } header={ value.name }>
                            <Collection>
                                { value.products.map(item => {
                                    return (<CollectionItem key={ this.id++ }>{ item.name }, { item.energy }</CollectionItem>)
                                })
                                }
                            </Collection>
                        </CollapsibleItem>
                    })

                ) : (null) }
            </Collapsible>
            <Pagination className='center-align' items={ this.props.totalPages } activePage={ this.props.currentPage } maxButtons={ 10 } onSelect={ this.onPageChange }/>
        </div>
    }
}

DishesList.propTypes = {
    text: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    dishList: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    activePage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onDishEdit: PropTypes.func.isRequired,
    onDishDelete: PropTypes.func.isRequired,
    onDishCreate: PropTypes.func.isRequired
};

export default DishesList;

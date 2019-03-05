import React                                               from "react";
import { Button, CardPanel, Col, Input, ProgressBar, Row } from "react-materialize";
import PropTypes                                           from "prop-types";
import ProductsList                                        from "./ProductsList"
import ProductEdit                                         from "./ProductEdit";
import ProductTypeSelect                                   from "./ProductTypeSelect";
import ProductTypes                                        from "./ProductTypes";
import UploadService                                       from "../../services/UploadService";
import ProductsService                                     from '../../services/ProductsService'
import ProductTypesService                                 from '../../services/ProductTypesService'
import Utils                                               from "../../utils/Utils";
import SearchForm                                          from "../common/SearchForm";
import TextPropType                                        from "../../utils/TextPropType";

class Products extends React.Component {
    constructor(props) {
        super(props);
        Utils.checkRequiredProperty(this.props.text, "text");
        Utils.checkRequiredProperty(this.props.editable, "editable");
        this.productService = new ProductsService();
        this.productTypeService = new ProductTypesService();
        this.state = {
            productsList: [],
            typesList: [],
            currentType: '',
            isLoading: false,
            currentPage: 0,
            totalPages: 0,
            search: '',
            numberOfRecords: this.props.numberOfRecords
        };
        this.loadTypes();
        this.loadAllData();
        this.handleSearch = this.handleSearch.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleLoadCsv = this.handleLoadCsv.bind(this);
        this.handleEditList = this.handleEditList.bind(this);
        this.handleDeleteFromList = this.handleDeleteFromList.bind(this);
        this.handlePageSelect = this.handlePageSelect.bind(this);
        this.handleChangeNumberOfRecords = this.handleChangeNumberOfRecords.bind(this);
        this.handleChangeProductType = this.handleChangeProductType.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleTypeCreate = this.handleTypeCreate.bind(this);
        this.handleTypeEdit = this.handleTypeEdit.bind(this);
        this.handleTypeDelete = this.handleTypeDelete.bind(this);
    }

    loadAllData() {
        this.productService.getProducts({currentPage: this.state.currentPage, search: this.state.search, currentType: this.state.currentType, numberOfRecords: this.state.numberOfRecords},
                                        result => this.setState({productsList: result.content, currentPage: result.currentPage, totalPages: result.totalPages}),
                                        error => console.log(error));
    }

    loadTypes() {
        this.productTypeService.getProductTypes(result => this.setState({typesList: result}), error => console.log(error));
    }

    handleSearch(value) {
        this.setState({search: value, currentPage: 0, totalPages: 0}, () => {
            this.loadAllData();
        });
    }

    handleCreate(product) {
        this.productService.createProduct(product, () => {
            this.loadAllData();
        }, error => console.log(error));
    }

    handleEditList(product) {
        this.productService.updateProduct(product, () => {
            this.loadAllData();
        }, error => console.log(error));
    }

    handleDeleteFromList(product) {
        this.productService.deleteProduct(product, () => {
            this.loadAllData();
        }, error => console.log(error));
    }

    handleLoadCsv(event) {
        const file = event.target.files[0];
        console.log("File: ", file);
        this.setState({isLoading: true});
        UploadService.uploadFile(file, () => {
            window.Materialize.toast('Uploaded successfully', 3000);
            this.setState({isLoading: false});
            this.loadTypes();
            this.loadAllData();
        }, () => {
            this.setState({isLoading: false});
            window.Materialize.toast('Error due uploading', 5000);
        });
    }

    handlePageSelect(page) {
        if (page) {
            this.setState({currentPage: page}, this.loadAllData);
        }
    }

    handleChangeNumberOfRecords(event, value) {
        this.setState({numberOfRecords: value}, this.loadAllData);
    }

    handleChangeProductType(value) {
        if (value) {
            this.setState({currentType: value, currentPage: 0, totalPages: 0}, this.loadAllData);
        }
    }

    handleRowClick(product) {
        if (product) {
            if (this.props.onProductRowClick) {
                this.props.onProductRowClick(product);
            } else {
                window.Materialize.toast(product.name, 1000);
            }
        }
    }

    handleTypeCreate(type, success, fail) {
        this.productTypeService.createProductType(type, () => {
            this.loadTypes();
            success();
        }, (error) => {
            console.log(error);
            fail();
        });
    }

    handleTypeEdit(type, success, fail) {
        this.productTypeService.updateProductType(type, () => {
            this.loadTypes();
            success();
        }, (error) => {
            console.log(error);
            fail();
        });
    }

    handleTypeDelete(type, success, fail) {
        this.productTypeService.deleteProductType(type, () => {
            this.loadTypes();
            success();
        }, (error) => {
            console.log(error);
            fail();
        });
    }

    render() {
        return <div>
            <CardPanel className="z-depth-4">
                <SearchForm onChange={ this.handleSearch }/>
                <Row/>
                { this.props.editable ? (
                    <Row>
                        <Col s={ 2 }>
                            <ProductEdit
                                text={ this.props.text }
                                typesList={ this.state.typesList }
                                isCreation={ true }
                                editorHeader={ this.props.text.products.buttonCreate }
                                onEditClick={ this.handleCreate }
                                modalTrigger={ <Button large={ true } waves='green' className='green darken-2'>{ this.props.text.products.buttonCreate }</Button> }
                                currentProduct={ null }
                            />
                        </Col>
                        <Col s={ 4 }>
                            <ProductTypes
                                onCreate={ this.handleTypeCreate }
                                onSave={ this.handleTypeEdit }
                                onDelete={ this.handleTypeDelete }
                                text={ this.props.text }
                                productTypes={ this.state.typesList }
                                modalTrigger={ <Button s={ 12 } large={ true } waves='green' className='green darken-2'>{ this.props.text.products.buttonProductTypes }</Button> }/>
                        </Col>
                        <Col s={ 6 }><Input waves='light' type="file" label={ this.props.text.products.buttonLoadCsv } s={ 12 } onChange={ this.handleLoadCsv }/></Col>
                    </Row>) : null }
                <Row/>
                { this.state.isLoading ? (<Row><Col s={ 12 }> <ProgressBar/> </Col></Row>) : null }
                <Row>
                    <Input s={ 6 } type="number" min="1" onChange={ this.handleChangeNumberOfRecords } label={ this.props.text.products.inputRecordsNumber } defaultValue={ this.state.numberOfRecords }/>
                    <ProductTypeSelect text={ this.props.text } valuesList={ this.state.typesList } onValueSelected={ this.handleChangeProductType }/>
                </Row>
                <Row/>
                { this.state.productsList && this.state.productsList.length > 0 ? (<ProductsList onDeleteFromList={ this.handleDeleteFromList }
                                                                                                 onEditList={ this.handleEditList }
                                                                                                 onPageChange={ this.handlePageSelect }
                                                                                                 onRowClick={ this.handleRowClick }
                                                                                                 text={ this.props.text }
                                                                                                 productsList={ this.state.productsList }
                                                                                                 typesList={ this.state.typesList }
                                                                                                 editable={ this.props.editable }
                                                                                                 totalPages={ this.state.totalPages }
                                                                                                 currentPage={ this.state.currentPage }/>) : null }
            </CardPanel>
        </div>
    }
}

Products.propTypes = {
    editable: PropTypes.bool.isRequired,
    text: PropTypes.oneOfType([TextPropType]).isRequired,
    numberOfRecords: PropTypes.number,
    onProductRowClick: PropTypes.func
};
export default Products;

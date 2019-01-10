import React                                               from "react";
import { Button, CardPanel, Col, Input, ProgressBar, Row } from "react-materialize";
import ProductsList                                        from "./ProductsList"
import ProductEdit                                         from "./ProductEdit";
import UploadService                                       from "../../services/UploadService";
import ProductTypeSelect                                   from "../product_types/ProductTypeSelect";
import ProductsService                                     from '../../services/ProductsService'
import ProductTypesService                                 from '../../services/ProductTypesService'
import ProductTypes                                        from "../product_types/ProductTypes";

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.productService = new ProductsService();
        this.productTypeService = new ProductTypesService();
        let editable = true;
        this.state = {
            productsList: [],
            typesList: [],
            currentType: '',
            editable: editable,
            isLoading: false,
            currentPage: 0,
            totalPages: 0,
            search: '',
            numberOfRecords: 10
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

    handleSearch(event, value) {
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
        let uploadService = new UploadService();
        this.setState({isLoading: true});
        uploadService.uploadFile(file, () => {
            window.Materialize.toast('Uploaded successfully', 3000);
            this.setState({isLoading: false});
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
            this.setState({currentType: value}, this.loadAllData);
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

    handleTypeCreate(type, successCallback, failCallback) {
        this.productTypeService.createProductType(type, () => {
            this.loadTypes();
            successCallback();
        }, (error) => {
            console.log(error);
            failCallback();
        });
    }

    handleTypeEdit(type, successCallback, failCallback) {
        this.productTypeService.updateProductType(type, () => {
            this.loadTypes();
            successCallback();
        }, (error) => {
            console.log(error);
            failCallback();
        });
    }

    handleTypeDelete(type, successCallback, failCallback) {
        this.productTypeService.deleteProductType(type, () => {
            this.loadTypes();
            successCallback();
        }, (error) => {
            console.log(error);
            failCallback();
        });
    }

    render() {
        return <div>
            <CardPanel className="z-depth-4">
                <div className="red darken-1 nav-wrapper">
                    <form>
                        <div className="input-field">
                            <Input id="search" type="search" required onChange={ this.handleSearch }>
                                <label className="label-icon" htmlFor="search"><i className="material-icons large black-text">Search</i></label>
                                <i className="material-icons indigo darken-4">close</i></Input>
                        </div>
                    </form>
                </div>
                { this.state.editable ? (
                    <Row>
                        <Col s={ 2 }><ProductEdit typesList={ this.state.typesList } isCreation={ true } onEditClick={ this.handleCreate } modalTrigger={ <Button large={ true } waves='green' className='green darken-1'>Create</Button> }
                                                  currentProduct={ null }/></Col>
                        <Col s={ 10 }><Input waves='light' type="file" label="Load CSV" s={ 12 } onChange={ this.handleLoadCsv }/></Col>
                    </Row>) : '' }
                <Row/>
                { this.state.isLoading ? (<Row><Col s={ 12 }> <ProgressBar/> </Col></Row>) : '' }
                <Row>
                    <Input s={ 6 } type="number" min="1" onChange={ this.handleChangeNumberOfRecords } label="Number of records for page" defaultValue={ this.state.numberOfRecords }/>
                    <ProductTypeSelect valuesList={ this.state.typesList } onValueSelected={ this.handleChangeProductType }/>
                </Row>
                { this.state.editable ? (
                    <Row>
                        <ProductTypes onCreate={ this.handleTypeCreate } onSave={ this.handleTypeEdit } onDelete={ this.handleTypeDelete } productTypes={ this.state.typesList }
                                      modalTrigger={ <Button s={ 12 } waves='green' className='green darken-2'>Product Types</Button> }/>
                    </Row>) : '' }
                <Row/>
                { this.state.productsList && this.state.productsList.length > 0 ? (<ProductsList onDeleteFromList={ this.handleDeleteFromList }
                                                                                                 onEditList={ this.handleEditList }
                                                                                                 onPageChange={ this.handlePageSelect }
                                                                                                 onRowClick={ this.handleRowClick }
                                                                                                 productsList={ this.state.productsList }
                                                                                                 typesList={ this.state.typesList }
                                                                                                 editable={ this.state.editable }
                                                                                                 totalPages={ this.state.totalPages }
                                                                                                 currentPage={ this.state.currentPage }/>) : '' }
            </CardPanel>
        </div>
    }
}

export default Products;

import axios                                               from "axios";
import React                                               from "react";
import { Button, CardPanel, Col, Input, ProgressBar, Row } from "react-materialize";
import ProductsList                                        from "./ProductsList"
import ProductEdit                                         from "./ProductEdit";
import UploadService                                       from "../../services/UploadService";
import ProductTypeSelect                                   from "./ProductTypeSelect";

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            types: [],
            currentType: '',
            editable: true,
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
    }

    loadAllData() {
        axios.get('/products', {params: {page: this.state.currentPage, name: this.state.search, currentType: this.state.currentType, numberOfRecords: this.state.numberOfRecords}})
             .then(response => {
                 let current = response.data.currentPage;
                 let total = response.data.totalPages;
                 let content = response.data.content;
                 this.setState({list: content, currentPage: current, totalPages: total});
             }).catch(function (error) {
            console.log(error);
        });
    }

    loadTypes(){
        axios.get('/types')
             .then(response => {
                 let current = response.data
                 this.setState({types: current});
             }).catch(function (error) {
            console.log(error);
        });
    }

    handleSearch(event, value) {
        this.setState({search: value, currentPage: 0, totalPages: 0}, () => {
            this.loadAllData();
        });
    }

    handleCreate(product) {
        let newList = this.state.list;
        newList.push(product);
        this.setState({list: newList});
    }

    handleEditList(productsList, product) {
        let list = productsList;
        list.forEach((element, index) => {
            if (element.id === product.id) {
                list[index] = product;
            }
        });
        this.setState({list: list});
    }

    handleDeleteFromList(productsList, product) {
        let filtered = productsList.filter(function (value) {
            if (value.id !== product.id) {
                return value;
            }
        });
        this.setState({list: filtered});
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
                        <Col s={ 2 }><ProductEdit isCreation={ true } onEditClick={ this.handleCreate } modalTrigger={ <Button large={ true } waves='green' className='green darken-1'>Create</Button> } currentProduct={ null }/></Col>
                        <Col s={ 10 }><Input waves='light' type="file" label="Load CSV" s={ 12 } onChange={ this.handleLoadCsv }/></Col>
                    </Row>) : '' }
                <Row/>
                { this.state.isLoading ? (<Row><Col s={ 12 }> <ProgressBar/> </Col></Row>) : '' }
                <Row>
                    <Input s={ 6 } type="number" min="1" onChange={ this.handleChangeNumberOfRecords } label="Number of records for page" defaultValue={ this.state.numberOfRecords }/>
                    <ProductTypeSelect valuesList={ this.state.types } onValueSelected={ this.handleChangeProductType }/>
                </Row>
                <Row/>
                { this.state.list && this.state.list.length > 0 ? (<ProductsList onDeleteFromList={ this.handleDeleteFromList }
                                                                                 onEditList={ this.handleEditList }
                                                                                 onPageChange={ this.handlePageSelect }
                                                                                 productsList={ this.state.list }
                                                                                 editable={ this.state.editable }
                                                                                 totalPages={ this.state.totalPages }
                                                                                 currentPage={ this.state.currentPage }/>) : '' }
            </CardPanel>
        </div>
    }
}

export default Products;

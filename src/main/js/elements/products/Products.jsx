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
import SearchForm                                          from "../other/SearchForm";

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
    text: PropTypes.shape({
                              general: PropTypes.shape({
                                                           tabUser: PropTypes.string.isRequired,
                                                           tabUserProfile: PropTypes.string.isRequired,
                                                           tabProducts: PropTypes.string.isRequired,
                                                           tabDishes: PropTypes.string.isRequired,
                                                           tabLogout: PropTypes.string.isRequired,
                                                           tabEditMode: PropTypes.string.isRequired
                                                       }).isRequired,
                              calculator: PropTypes.shape({
                                                              age: PropTypes.string.isRequired,
                                                              height: PropTypes.string.isRequired,
                                                              weight: PropTypes.string.isRequired,
                                                              gender: PropTypes.string.isRequired,
                                                              genderMale: PropTypes.string.isRequired,
                                                              genderFemale: PropTypes.string.isRequired,
                                                              activity: PropTypes.string.isRequired,
                                                              formula: PropTypes.string.isRequired,
                                                              benedict: PropTypes.string.isRequired,
                                                              mifflin: PropTypes.string.isRequired,
                                                              low: PropTypes.string.isRequired,
                                                              medium: PropTypes.string.isRequired,
                                                              high: PropTypes.string.isRequired,
                                                              very_high: PropTypes.string.isRequired,
                                                              buttonCalculate: PropTypes.string.isRequired,
                                                              modalHeaderCalculate: PropTypes.string.isRequired,
                                                              modalResultText: PropTypes.string.isRequired,
                                                              modalButtonCancel: PropTypes.string.isRequired
                                                          }).isRequired,
                              products: PropTypes.shape({
                                                            buttonCreate: PropTypes.string.isRequired,
                                                            buttonProductTypes: PropTypes.string.isRequired,
                                                            buttonLoadCsv: PropTypes.string.isRequired,
                                                            buttonEdit: PropTypes.string.isRequired,
                                                            buttonDelete: PropTypes.string.isRequired,
                                                            inputRecordsNumber: PropTypes.string.isRequired,
                                                            selectType: PropTypes.string.isRequired,
                                                            tableHeadName: PropTypes.string.isRequired,
                                                            tableHeadEnergy: PropTypes.string.isRequired,
                                                            tableHeadType: PropTypes.string.isRequired,
                                                            tableHeadActions: PropTypes.string.isRequired,
                                                            modalEditProductHeadCreate: PropTypes.string.isRequired,
                                                            modalEditProductHeadEdit: PropTypes.string.isRequired,
                                                            modalEditProductInputName: PropTypes.string.isRequired,
                                                            modalEditProductInputEnergy: PropTypes.string.isRequired,
                                                            modalEditProductSelectType: PropTypes.string.isRequired,
                                                            modalEditProductButtonCancel: PropTypes.string.isRequired,
                                                            modalEditTypeHeader: PropTypes.string.isRequired,
                                                            modalEditTypeButtonCancel: PropTypes.string.isRequired,
                                                            modalEditTypeInputName: PropTypes.string.isRequired,
                                                            modalEditTypeButtonCreate: PropTypes.string.isRequired,
                                                            modalEditTypeButtonSave: PropTypes.string.isRequired,
                                                            modalEditTypeTableHeadName: PropTypes.string.isRequired,
                                                            modalEditTypeTableHeadEdit: PropTypes.string.isRequired,
                                                            modalEditTypeTableHeadDelete: PropTypes.string.isRequired
                                                        }).isRequired,
                              dishes: PropTypes.shape({
                                                          buttonCreate: PropTypes.string.isRequired,
                                                          tableHeadName: PropTypes.string.isRequired,
                                                          tableHeadEnergy: PropTypes.string.isRequired,
                                                          tableHeadAmount: PropTypes.string.isRequired,
                                                          buttonEdit: PropTypes.string.isRequired,
                                                          buttonDelete: PropTypes.string.isRequired,
                                                          modalEditHeader: PropTypes.string.isRequired,
                                                          modalEditTotalEnergyText: PropTypes.string.isRequired,
                                                          modalEditInputProductName: PropTypes.string.isRequired,
                                                          modalEditTableHeaderName: PropTypes.string.isRequired,
                                                          modalEditTableHeaderEnergy: PropTypes.string.isRequired,
                                                          modalEditTableHeaderAmount: PropTypes.string.isRequired,
                                                          modalEditTableHeaderDelete: PropTypes.string.isRequired,
                                                          modalEditTableInputAmount: PropTypes.string.isRequired,
                                                          modalEditButtonCancel: PropTypes.string.isRequired,
                                                          modalEditButtonSave: PropTypes.string.isRequired
                                                      }).isRequired,
                              userProfile: PropTypes.shape({
                                                               inputAge: PropTypes.string.isRequired,
                                                               inputHeight: PropTypes.string.isRequired,
                                                               inputWeight: PropTypes.string.isRequired,
                                                               inputLogin: PropTypes.string.isRequired,
                                                               inputEmail: PropTypes.string.isRequired,
                                                               inputPassword: PropTypes.string.isRequired,
                                                               inputConfirmPassword: PropTypes.string.isRequired,
                                                               selectGender: PropTypes.string.isRequired,
                                                               selectGenderMale: PropTypes.string.isRequired,
                                                               selectGenderFemale: PropTypes.string.isRequired,
                                                               buttonEdit: PropTypes.string.isRequired,
                                                               buttonCancel: PropTypes.string.isRequired,
                                                               buttonEditProfile: PropTypes.string.isRequired,
                                                               buttonUpdate: PropTypes.string.isRequired,
                                                               validationSuccessAge: PropTypes.string.isRequired,
                                                               validationSuccessHeight: PropTypes.string.isRequired,
                                                               validationSuccessWeight: PropTypes.string.isRequired,
                                                               validationSuccessLogin: PropTypes.string.isRequired,
                                                               validationSuccessEmail: PropTypes.string.isRequired,
                                                               validationSuccessPassword: PropTypes.string.isRequired,
                                                               validationSuccessPasswordConfirm: PropTypes.string.isRequired,
                                                               validationErrorAge: PropTypes.string.isRequired,
                                                               validationErrorHeight: PropTypes.string.isRequired,
                                                               validationErrorWeight: PropTypes.string.isRequired,
                                                               validationErrorLogin: PropTypes.string.isRequired,
                                                               validationErrorEmail: PropTypes.string.isRequired,
                                                               validationErrorPassword: PropTypes.string.isRequired,
                                                               validationErrorPasswordConfirm: PropTypes.string.isRequired,
                                                               validationErrorPasswordAndConfirmDiff: PropTypes.string.isRequired,
                                                               validationErrorPasswordLength: PropTypes.string.isRequired,
                                                               userInfoTitle: PropTypes.string.isRequired
                                                           })
                          }).isRequired,
    numberOfRecords: PropTypes.number,
    onProductRowClick: PropTypes.func
};
export default Products;

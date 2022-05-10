import React from 'react';
import PropTypes from 'prop-types';

import { Product } from './product';
import { ProductDescription } from './productDescription';
import './shop.css';


export class Shop extends React.Component {

    static propTypes = {
        welcome: PropTypes.string.isRequired,
        tableHeader: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            count: PropTypes.string.isRequired,
            control: PropTypes.string.isRequired,
        }),
        initProducts: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                url: PropTypes.string.isRequired,
                count: PropTypes.number.isRequired,
            })
        ),
    };

    state = {
        products: this.props.initProducts,
        productDescriptionMode: null,
        selectedProduct: {
            id: null,
            row: null,
            title: null,
            price: null,
            url: null,
            count: null,
        },
        disableDeleteButtons: false,
        disableShopActions: false,
    };

    clickedRow = (obj) => {
        this.setState({ selectedProduct: obj, productDescriptionMode: 'view', disableDeleteButtons: false});
    };

    isRowClicked = (rowCode) => {
        return this.state.selectedProduct.id === rowCode;
    };

    deleteRow = (rowNum, id) => {
        let deletionConfirmed = confirm(`Вы действительно хотите ударить ${rowNum} строку?`);
        if (deletionConfirmed) this.setState(prevState => ({ products: prevState.products.filter((el, ind) => ind !== rowNum - 1) }));
        if (this.state.selectedProduct && this.state.selectedProduct.id === id) this.setState({ selectedProduct: { id: null, row: null, title: null, price: null, url: null, count: null }, productDescriptionMode: null});
    };

    editedRow = (obj) => {
        this.setState({ selectedProduct: obj, productDescriptionMode: 'edit', disableDeleteButtons: true });
    };

    editProductDescription = (obj) => {
        this.setState(prevState => ({ products: prevState.products.map(el => (el.id === obj.id) ? el = obj : el), productDescriptionMode: 'view', disableShopActions: false, disableDeleteButtons: false }));
    };

    cancelEditingProduct = () => {
        this.setState({ productDescriptionMode: 'view', disableShopActions: false, disableDeleteButtons: false});
    };

    disableShopActions = () => {
        this.setState({ disableShopActions: true });
    };

    isRowDisabled = () => {
        return this.state.disableShopActions;
    };

    isDeleteDisabled = () => {
        return this.state.disableDeleteButtons;
    };

    render() {
        const tableHeaderCode =
            <div key={this.props.tableHeader.id} className='ShopRow shopHeaderRow'>
                <div className='productCell ShopHeaderCell'>{this.props.tableHeader.id}</div>
                <div className='productCell ShopHeaderCell'>{this.props.tableHeader.title}</div>
                <div className='productCell ShopHeaderCell'>{this.props.tableHeader.price}</div>
                <div className='productCell ShopHeaderCell'>{this.props.tableHeader.url}</div>
                <div className='productCell ShopHeaderCell'>{this.props.tableHeader.count}</div>
                <div className='productCell ShopHeaderCell'>{this.props.tableHeader.control}</div>
            </div>;

        const productCode = this.state.products.map((el, ind) =>
            <Product key={el.id}
                id={el.id}
                row={ind + 1}
                title={el.title}
                price={el.price}
                url={el.url}
                count={el.count}
                cbSelectRow={this.clickedRow}
                isSelected={this.isRowClicked(el.id)}
                cbDeleteRow={this.deleteRow}
                cbEditRow={this.editedRow}
                isFullyDisabled={this.isRowDisabled()}
                isDeleteDisabled={this.isDeleteDisabled()} />
        );

        const productDescriptionCode =
            <ProductDescription key={this.state.selectedProduct.id}
                id={this.state.selectedProduct.id}
                row={this.state.selectedProduct.row}
                title={this.state.selectedProduct.title}
                price={this.state.selectedProduct.price}
                url={this.state.selectedProduct.url}
                count={this.state.selectedProduct.count}
                mode={this.state.productDescriptionMode} 
                cbSaveProduct={this.editProductDescription}
                cbCancelEditingProduct={this.cancelEditingProduct}
                cbDisableProductRow={this.disableShopActions}
                />;

        return (
            <React.Fragment>
                <div className='ShopWelcome'>
                    {this.props.welcome}
                </div>
                <div className={`${this.state.disableShopActions ? `disable ` : ``}ShopFrame`}>
                    {tableHeaderCode}
                    {productCode}
                    <div>
                        <input type='button' className={`${this.state.disableShopActions ? `buttonDisabled` : ``}`} name='addProduct' value='Добавить новый товар' /* onClick={this.editRow} */ />
                    </div>
                </div>
                {productDescriptionCode}
            </React.Fragment>
        )
    }
};
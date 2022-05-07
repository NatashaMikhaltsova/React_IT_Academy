import React from 'react';
import PropTypes from 'prop-types';

import Product from './product';
import './shop.css';


class Shop extends React.Component {

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
        clickedRowKey: null,
        products: this.props.initProducts,
    };

    clickedRow = (id) => {
        this.setState({ clickedRowKey: id });
    };

    isRowClicked = (rowCode) => {
        return this.state.clickedRowKey === rowCode;
    };

    deleteRow = (rowNum) => {
        let deletionConfirmed = confirm(`Вы действительно хотите ударить ${rowNum} строку?`);
        if (deletionConfirmed) this.setState(prevState => ({ products: prevState.products.filter((el, ind) => ind !== rowNum - 1) }));
    };

    render() {
        const tableHeaderCode =
            <div key={this.props.tableHeader.id} className='ShopRow'>
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
                cbDeleteRow={this.deleteRow} />
        );

        return (
            <React.Fragment>
                <div className='ShopWelcome'>
                    {this.props.welcome}
                </div>
                <div className='ShopFrame'>
                    {tableHeaderCode}
                    {productCode}
                </div>
            </React.Fragment>
        )
    }
};

export default Shop;
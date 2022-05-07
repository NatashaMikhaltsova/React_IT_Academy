import React from 'react';
import PropTypes from 'prop-types';

import './product.css';

class Product extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        row: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        cbSelectRow: PropTypes.func.isRequired,
        isSelected: PropTypes.bool.isRequired,
        cbDeleteRow: PropTypes.func.isRequired,
    };

    rowClicked = (e) => {
        if (this.props.cbSelectRow) this.props.cbSelectRow(this.props.id);
    };

    deleteClickedRow = (e) => {
        e.stopPropagation();
        if (this.props.cbDeleteRow) this.props.cbDeleteRow(this.props.row);
    };

    render() {
        return (
            <div key={this.props.id} className={`${this.props.isSelected ? `productSelected ` : ``}ShopRow`} onClick={this.rowClicked}>
                <div className='productId productCell'>{this.props.row}</div>
                <div className='productTitle productCell'>{this.props.title}</div>
                <div className='productPrice productCell'>{this.props.price}</div>
                <div className='productImg productCell'><img src={this.props.url} /></div>
                <div className='productCount productCell'>{this.props.count}</div>
                <div className='productCell'><input type='button' name='productDelete' className='productDelete' value='Delete' onClick={this.deleteClickedRow} /></div>
            </div>
        )
    };
};

export default Product;
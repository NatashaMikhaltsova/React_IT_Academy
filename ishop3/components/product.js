import React from 'react';
import PropTypes from 'prop-types';

import './product.css';

export class Product extends React.Component {
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
        cbEditRow: PropTypes.func.isRequired,
        isDisabled: PropTypes.bool.isRequired,
    };

    rowClicked = () => {
        if (this.props.cbSelectRow) this.props.cbSelectRow({ id: this.props.id, row: this.props.row, title: this.props.title, price: this.props.price, url: this.props.url, count: this.props.count });
    };

    deleteClickedRow = (e) => {
        e.stopPropagation();
        if (this.props.cbDeleteRow) this.props.cbDeleteRow(this.props.row, this.props.id);
    };

    editRow = (e) => {
        e.stopPropagation();
        if (this.props.cbEditRow) this.props.cbEditRow({ id: this.props.id, row: this.props.row, title: this.props.title, price: this.props.price, url: this.props.url, count: this.props.count });
    };

    render() {
        return (
            <div key={this.props.id} className={`${this.props.isSelected ? `productSelected ` : ``}ShopRow`} onClick={this.rowClicked}>
                <div className='productId productCell'>{this.props.row}</div>
                <div className='productTitle productCell'>{this.props.title}</div>
                <div className='productPrice productCell'>{this.props.price}</div>
                <div className='productImg productCell'><img src={this.props.url} /></div>
                <div className='productCount productCell'>{this.props.count}</div>
                <div className={`${this.props.isDisabled ? `buttonDisabled ` : ``}productCell`}><input type='button' name='productDelete' className='productDelete' value='Delete' onClick={this.deleteClickedRow} /></div>
                <div className={`${this.props.isDisabled ? `buttonDisabled ` : ``}productCell`}><input type='button' name='productEdit' className='productEdit' value='Edit' onClick={this.editRow} /></div>
            </div>
        )
    };
};
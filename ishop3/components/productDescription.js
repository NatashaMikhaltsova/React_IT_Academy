import React from "react";
import PropTypes from "prop-types";

import './productDescription.css';

export class ProductDescription extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        row: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        url: PropTypes.string,
        count: PropTypes.number,
        mode: PropTypes.string,
        cbAddProduct: PropTypes.func,
        cbSaveProduct: PropTypes.func,
    };

    state = {
        productProperties: {
            id: this.props.id,
            row: this.props.row,
            title: this.props.title,
            price: this.props.price,
            url: this.props.url,
            count: this.props.count,
        },
    };

    handleChanges = (e) => {
        let fields = {...this.state.productProperties};
        fields[e.target.id] = e.target.value;
        this.setState({ productProperties: fields });
    }

    checkTitleValid = () => {
        if (this.state.productProperties.title.trim() === '') {
            return <span className='productDescriprionInvalid'>{'Введите название товара'}</span>
        }
    };

    checkPriceValid = () => {
        if (this.state.productProperties.price == '') {
            return <span className='productDescriprionInvalid'>{'Введите цену товара'}</span>
        } else if (isNaN(this.state.productProperties.price)) {
            return <span className='productDescriprionInvalid'>{'Введенное значение должно быть числом'}</span>
        }
    };

    checkUrlValid = () => {
        let findUrl = this.state.productProperties.url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (this.state.productProperties.url.trim() === '') {
            return <span className='productDescriprionInvalid'>{'Введите url для товара'}</span>
        } else if (findUrl === null) {
            return <span className='productDescriprionInvalid'>{'Введенное значение должно быть корректной ссылкой'}</span>
        }
    };

    checkCountValid = () => {
        if (this.state.productProperties.count == '') {
            return <span className='productDescriprionInvalid'>{'Введите количество товара'}</span>
        } else if (!(Number.isInteger(+this.state.productProperties.count))) {
            return <span className='productDescriprionInvalid'>{'Введенное значение должно быть целым числом'}</span>
        }
    };

    saveProductDescription = () => {
        if(this.props.cbSaveProduct) this.props.cbSaveProduct(this.state.productProperties);
    }

    render() {
        if (this.props.mode === 'view') {
            return (
                <div className="ProductDescriprionBlock">
                    <h1>{this.props.title}</h1>
                    <div>
                        <span>Цена: </span>
                        <span>{this.props.price}</span>
                    </div>
                    <div>
                        <span>Ссылка на фото: </span>
                        <span>{this.props.url}</span>
                    </div>
                    <div>
                        <span>Количество: </span>
                        <span>{this.props.count}</span>
                    </div>
                </div>
            )
        }
        else if (this.props.mode === 'edit') {
            return (
                <div className="ProductDescriprionBlock">
                    <h1>{this.props.title}</h1>
                    <div>
                        <span>Row: </span>
                        <span>{this.state.productProperties.row}</span>
                    </div>
                    <div>
                        <label htmlFor="title">Название: </label>
                        <input type="text" id="title" name="title" value={this.state.productProperties.title} onChange={this.handleChanges} />
                        {this.checkTitleValid()}
                    </div>
                    <div>
                        <label htmlFor="price">Цена: </label>
                        <input type="text" id="price" name="price" value={this.state.productProperties.price} onChange={this.handleChanges}/>
                        {this.checkPriceValid()}
                    </div>
                    <div>
                        <label htmlFor="url">Ссылка на фото: </label>
                        <input type="text" id="url" name="url" value={this.state.productProperties.url} onChange={this.handleChanges}/>
                        {this.checkUrlValid()}
                    </div>
                    <div>
                        <label htmlFor="count">Количество: </label>
                        <input type="text" id="count" name="count" value={this.state.productProperties.count} onChange={this.handleChanges}/>
                        {this.checkCountValid()}
                    </div>
                    <div>
                        <input type='button' name='productDescriptionSave' value='Save' onClick={this.saveProductDescription} />
                    </div>
                </div>
            )
        }
        else {
            return (null)
        }
    }
}
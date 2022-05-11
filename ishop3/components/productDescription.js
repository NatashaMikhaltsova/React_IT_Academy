import React from "react";
import PropTypes from "prop-types";

import './productDescription.css';

export class ProductDescription extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        row: PropTypes.number,
        initTitle: PropTypes.string,
        initPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        initUrl: PropTypes.string,
        initCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        mode: PropTypes.string,
        cbAddProduct: PropTypes.func,
        cbSaveProduct: PropTypes.func,
        cbCancelEditingProduct: PropTypes.func,
        cbDisableProductRow: PropTypes.func,
    };

    state = {
        productProperties: {
            id: this.props.id,
            row: this.props.row,
            title: this.props.initTitle,
            price: this.props.initPrice,
            url: this.props.initUrl,
            count: this.props.initCount,
        },
        errors: {},
        formIsValid: true,
    };

    handleChanges = (e) => {
        let fields = { ...this.state.productProperties };
        fields[e.target.id] = e.target.value;
        this.setState({ productProperties: fields }, this.fieldsValidation);
        if (this.props.cbDisableProductRow) this.props.cbDisableProductRow();
    };

    fieldsValidation = () => {
        let fields = this.state.productProperties;
        const validUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        let errors = {};
        let formIsValid = true;
        if (!fields.title) {
            formIsValid = false;
            errors.title = "Введите название товара";
        }
        if (!fields.price) {
            formIsValid = false;
            errors.price = "Введите цену товара";
        }
        if (!fields.url) {
            formIsValid = false;
            errors.url = "Введите url для товара";
        }
        if (fields.url && fields.url.match(validUrl) === null) {
            formIsValid = false;
            errors.incorrectUrl = "Введенное значение должно быть корректной ссылкой";
        }
        if (!fields.count) {
            formIsValid = false;
            errors.count = "Введите количество товара";
        }
        if (fields.count && !(Number.isInteger(+this.state.productProperties.count))) {
            formIsValid = false;
            errors.integer_count = "Введенное значение должно быть целым числом";
        }
        this.setState({ formIsValid: formIsValid, errors: errors });
    };

    saveProductDescription = () => {
        this.state.formIsValid && this.setState(prevState => ({ productProperties: { ...prevState.productProperties, price: +prevState.productProperties.price, count: +prevState.productProperties.count } }), this.updateSaveProps);
    };

    updateSaveProps = () => {
        if (this.props.cbSaveProduct) this.props.cbSaveProduct(this.state.productProperties);
    };

    cancelProductDescription = () => {
        this.setState({ productProperties: { id: this.props.id, row: this.props.row, title: this.props.initTitle, price: this.props.initPrice, url: this.props.initUrl, count: this.props.initCount } });
        if (this.props.cbCancelEditingProduct) this.props.cbCancelEditingProduct();
    };

    addProductDescription = () => {
        this.state.formIsValid && this.setState(prevState => ({ productProperties: { ...prevState.productProperties, price: +prevState.productProperties.price, count: +prevState.productProperties.count } }), this.updateAddedProps);
    };

    updateAddedProps = () => {
        if (this.props.cbAddProduct) this.props.cbAddProduct(this.state.productProperties);
    };

    componentDidMount() {
        this.fieldsValidation();
    }

    render() {
        if (this.props.mode === 'view') {
            return (
                <div className="ProductDescriprionBlock">
                    <h1>{this.state.productProperties.title}</h1>
                    <div>
                        <span>Цена: </span>
                        <span>{this.state.productProperties.price}</span>
                    </div>
                    <div>
                        <span>Ссылка на фото: </span>
                        <span>{this.state.productProperties.url}</span>
                    </div>
                    <div>
                        <span>Количество: </span>
                        <span>{this.state.productProperties.count}</span>
                    </div>
                </div>
            )
        }
        else if (this.props.mode === 'edit') {
            return (
                <div className="ProductDescriprionBlock">
                    <h1>{this.props.initTitle}</h1>
                    <div>
                        <span>Row: </span>
                        <span>{this.state.productProperties.row}</span>
                    </div>
                    <div>
                        <label htmlFor="title">Название: </label>
                        <input type="text" className='productDescriprionInput' id="title" name="title" value={this.state.productProperties.title} onChange={this.handleChanges} />
                        {this.state.errors.title && <span className='productDescriprionInvalid'>{this.state.errors.title}</span>}
                    </div>
                    <div>
                        <label htmlFor="price">Цена: </label>
                        <input type="number" className='productDescriprionInput' id="price" name="price" value={this.state.productProperties.price} onChange={this.handleChanges} />
                        {this.state.errors.price && <span className='productDescriprionInvalid'>{this.state.errors.price}</span>}
                    </div>
                    <div>
                        <label htmlFor="url">Ссылка на фото: </label>
                        <input type="text" className='productDescriprionInput' id="url" name="url" value={this.state.productProperties.url} onChange={this.handleChanges} />
                        {this.state.errors.url && <span className='productDescriprionInvalid'>{this.state.errors.url}</span>}
                        {this.state.errors.incorrectUrl && <span className='productDescriprionInvalid'>{this.state.errors.incorrectUrl}</span>}
                    </div>
                    <div>
                        <label htmlFor="count">Количество: </label>
                        <input type="number" className='productDescriprionInput' id="count" name="count" value={this.state.productProperties.count} onChange={this.handleChanges} />
                        {this.state.errors.count && <span className='productDescriprionInvalid'>{this.state.errors.count}</span>}
                        {this.state.errors.integer_count && <span className='productDescriprionInvalid'>{this.state.errors.integer_count}</span>}
                    </div>
                    <div>
                        <input type='button' className={`${this.state.formIsValid ? `` : `disable buttonDisabled`}`} name='productDescriptionSave' value='Save' onClick={this.saveProductDescription} />
                        <input type='button' name='productDescriptionCancel' value='Cancel' onClick={this.cancelProductDescription} />
                    </div>
                </div>
            )
        }
        else if (this.props.mode === 'add') {
            return (
                <div className="ProductDescriprionBlock">
                    <h1>Добавьте новый продукт</h1>
                    <div>
                        <span>Row: </span>
                        <span>{this.props.row}</span>
                    </div>
                    <div>
                        <label htmlFor="title">Название: </label>
                        <input type="text" className='productDescriprionInput' id="title" name="title" value={this.state.productProperties.title} onChange={this.handleChanges} />
                        {this.state.errors.title && <span className='productDescriprionInvalid'>{this.state.errors.title}</span>}
                    </div>
                    <div>
                        <label htmlFor="price">Цена: </label>
                        <input type="number" className='productDescriprionInput' id="price" name="price" value={this.state.productProperties.price} onChange={this.handleChanges} />
                        {this.state.errors.price && <span className='productDescriprionInvalid'>{this.state.errors.price}</span>}
                    </div>
                    <div>
                        <label htmlFor="url">Ссылка на фото: </label>
                        <input type="text" className='productDescriprionInput' id="url" name="url" value={this.state.productProperties.url} onChange={this.handleChanges} />
                        {this.state.errors.url && <span className='productDescriprionInvalid'>{this.state.errors.url}</span>}
                        {this.state.errors.incorrectUrl && <span className='productDescriprionInvalid'>{this.state.errors.incorrectUrl}</span>}
                    </div>
                    <div>
                        <label htmlFor="count">Количество: </label>
                        <input type="number" className='productDescriprionInput' id="count" name="count" value={this.state.productProperties.count} onChange={this.handleChanges} />
                        {this.state.errors.count && <span className='productDescriprionInvalid'>{this.state.errors.count}</span>}
                        {this.state.errors.integer_count && <span className='productDescriprionInvalid'>{this.state.errors.integer_count}</span>}
                    </div>
                    <div>
                        <input type='button' className={`${this.state.formIsValid ? `` : `disable buttonDisabled`}`} name='productDescriptionAdd' value='Добавить' onClick={this.addProductDescription} />
                        <input type='button' name='productDescriptionCancel' value='Cancel' onClick={this.cancelProductDescription} />
                    </div>
                </div>
            )
        }
        else {
            return (null)
        }
    }
}
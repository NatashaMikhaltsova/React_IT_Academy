const React = require('react');
const Product = require('./product');
require('./shop.css');
require('./product.css');

const Shop = React.createClass({
    displayName: 'Shop',

    getDefaultProps: function () {
        return { welcome: 'Добро пожаловать в наш интернет-магазин' };
    },

    propTypes: {
        welcome: React.PropTypes.string,
        tableHeader: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            title: React.PropTypes.string.isRequired,
            price: React.PropTypes.string.isRequired,
            url: React.PropTypes.string.isRequired,
            count: React.PropTypes.string.isRequired,
            control: React.PropTypes.string.isRequired,
        }),
        initProducts: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.number.isRequired,
                title: React.PropTypes.string.isRequired,
                price: React.PropTypes.number.isRequired,
                url: React.PropTypes.string.isRequired,
                count: React.PropTypes.number.isRequired,
            })
        ),
    },

    getInitialState: function () {
        return {
            clickedRowKey: null,
            products: this.props.initProducts,
        }
    },

    clickedRow: function (id) {
        this.setState({ clickedRowKey: id });
    },

    isRowClicked: function (rowCode) {
        return this.state.clickedRowKey === rowCode;
    },

    deleteRow: function (rowNum) {
        let deletionConfirmed = confirm(`Вы действительно хотите ударить ${rowNum} строку?`);
        if (deletionConfirmed) {
            this.setState(prevState => {
                return { products: prevState.products.filter((el, ind) => ind !== rowNum - 1) }
            });
        };
    },

    render: function () {
        const welcomeCode = React.DOM.div({ className: "ShopWelcome" }, this.props.welcome);
        const tableHeaderCode = React.DOM.div({ key: this.props.tableHeader.id, className: 'ShopRow' },
            React.DOM.div({ className: "productCell ShopHeaderCell" }, this.props.tableHeader.id),
            React.DOM.div({ className: "productCell ShopHeaderCell" }, this.props.tableHeader.title),
            React.DOM.div({ className: "productCell ShopHeaderCell" }, this.props.tableHeader.price),
            React.DOM.div({ className: "productCell ShopHeaderCell" }, this.props.tableHeader.url),
            React.DOM.div({ className: "productCell ShopHeaderCell" }, this.props.tableHeader.count),
            React.DOM.div({ className: "productCell ShopHeaderCell" }, this.props.tableHeader.control),
        );

        const productCode = this.state.products.map((el, ind) =>
            React.createElement(Product, {
                key: el.id,
                id: el.id,
                row: ind + 1,
                title: el.title,
                price: el.price,
                url: el.url,
                count: el.count,
                cbSelectRow: this.clickedRow,
                isSelected: this.isRowClicked(el.id),
                cbDeleteRow: this.deleteRow,
            })
        );

        return React.DOM.div(null, welcomeCode, React.DOM.div({ className: "ShopFrame" }, tableHeaderCode, productCode));
    },
});

module.exports = Shop;
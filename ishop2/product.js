const Product = React.createClass({
    displayName: 'Product',

    propTypes: {
        id: React.PropTypes.number.isRequired,
        row: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        url: React.PropTypes.string.isRequired,
        count: React.PropTypes.number.isRequired,
        cbClickedRow: React.PropTypes.func.isRequired,
        isSelected: React.PropTypes.bool.isRequired,
        cbDeletedRow: React.PropTypes.func.isRequired,
    },

    rowClicked: function (e) {
        if (e.target.name !== 'productDelete') this.props.cbClickedRow(this.props.id);
    },

    deleteClickedRow: function () {
        this.props.cbDeletedRow(this.props.row);
    },

    render: function () {
        const productCode = React.DOM.div({ key: this.props.id, className: `${this.props.isSelected ? `productSelected ` : ``}ShopRow`, onClick: this.rowClicked },
            React.DOM.div({ className: "productId productCell" }, this.props.row),
            React.DOM.div({ className: "productTitle productCell" }, this.props.title),
            React.DOM.div({ className: "productPrice productCell" }, this.props.price),
            React.DOM.div({ className: "productImg productCell" }, React.DOM.img({ src: this.props.url })),
            React.DOM.div({ className: "productCount productCell" }, this.props.count),
            React.DOM.div({ className: "productCell" }, React.DOM.input({ type: 'button', name: 'productDelete', className: 'productDelete', value: 'Delete', onClick: this.deleteClickedRow })),
        );
        return React.DOM.div(null, productCode);
    },
});
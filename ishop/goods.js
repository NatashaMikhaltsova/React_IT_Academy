const productTable = React.createClass({
    displayName: 'productTable',

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
        }),
        product: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.number.isRequired,
                title: React.PropTypes.string.isRequired,
                price: React.PropTypes.number.isRequired,
                url: React.PropTypes.string.isRequired,
                count: React.PropTypes.number.isRequired,
            })
        ),
    },

    render: function () {
        const welcomeCode = React.DOM.div({ className: "productTableWelcome" }, this.props.welcome);
        const tableHeaderCode = React.DOM.div({ key: this.props.tableHeader.id, className: 'productTableRow' },
            React.DOM.div({ className: "productCell productTableHeaderCell" }, this.props.tableHeader.id),
            React.DOM.div({ className: "productCell productTableHeaderCell" }, this.props.tableHeader.title),
            React.DOM.div({ className: "productCell productTableHeaderCell" }, this.props.tableHeader.price),
            React.DOM.div({ className: "productCell productTableHeaderCell" }, this.props.tableHeader.url),
            React.DOM.div({ className: "productCell productTableHeaderCell" }, this.props.tableHeader.count)
        );
        const productCode = this.props.product.map(el => {
            return React.DOM.div({ key: el.id, className: 'productTableRow' },
                React.DOM.div({ className: "productId productCell" }, el.id),
                React.DOM.div({ className: "productTitle productCell" }, el.title),
                React.DOM.div({ className: "productPrice productCell" }, el.price),
                React.DOM.div({ className: "productImg productCell" }, React.DOM.img({ src: el.url })),
                React.DOM.div({ className: "productCount productCell" }, el.count)
            )
        });
        return React.DOM.div(null, welcomeCode, React.DOM.div({ className: "productTableFrame" }, tableHeaderCode, productCode));
    },
});
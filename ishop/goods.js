const GoodsTable = React.createClass({
    displayName: 'GoodsTable',

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
        goods: React.PropTypes.arrayOf(
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
        const welcomeCode = React.DOM.div({ className: "GoodsTableWelcome" }, this.props.welcome);
        const tableHeaderCode = React.DOM.div({ key: this.props.tableHeader.id, className: 'GoodsTableRow' },
            React.DOM.div({ className: "GoodsTableCell GoodsTableHeaderCell" }, this.props.tableHeader.id),
            React.DOM.div({ className: "GoodsTableCell GoodsTableHeaderCell" }, this.props.tableHeader.title),
            React.DOM.div({ className: "GoodsTableCell GoodsTableHeaderCell" }, this.props.tableHeader.price),
            React.DOM.div({ className: "GoodsTableCell GoodsTableHeaderCell" }, this.props.tableHeader.url),
            React.DOM.div({ className: "GoodsTableCell GoodsTableHeaderCell" }, this.props.tableHeader.count)
        );
        const goodsCode = this.props.goods.map(el => {
            return React.DOM.div({ key: el.id, className: 'GoodsTableRow' },
                React.DOM.div({ className: "goodsId GoodsTableCell" }, el.id),
                React.DOM.div({ className: "goodsTitle GoodsTableCell" }, el.title),
                React.DOM.div({ className: "goodsPrice GoodsTableCell" }, el.price),
                React.DOM.div({ className: "GoodsTableImg GoodsTableCell" }, React.DOM.img({ src: el.url })),
                React.DOM.div({ className: "goodsCount GoodsTableCell" }, el.count)
            )
        });
        return React.DOM.div(null, welcomeCode, React.DOM.div({ className: "GoodsTableFrame" }, tableHeaderCode, goodsCode));
    },
});
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
        initGoods: React.PropTypes.arrayOf(
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
            goods: this.props.initGoods,
            highlightedRow: null,
        }
    },

    clickedRow: function (id) {
        this.setState({ clickedRowKey: id, highlightedRow: id });
    },

    isRowClicked: function (rowCode) {
        return this.state.clickedRowKey === rowCode;
    },

    deleteRow: function (rowId, rowNum) {
        this.setState({ rowToDelete: rowId });
        let deletionConfirmed = confirm(`Вы действительно хотите ударить ${rowNum} строку?`);
        if (deletionConfirmed) {
            this.setState(prevState => {
                prevState.goods.splice(rowNum - 1, 1);
                return { goods: prevState.goods, clickedRowKey: prevState.clickedRowKey }
            });
        };
    },

    render: function () {
        const welcomeCode = React.DOM.div({ className: "ShopWelcome" }, this.props.welcome);
        const tableHeaderCode = React.DOM.div({ key: this.props.tableHeader.id, className: 'ShopRow' },
            React.DOM.div({ className: "GoodsTableCell ShopHeaderCell" }, this.props.tableHeader.id),
            React.DOM.div({ className: "GoodsTableCell ShopHeaderCell" }, this.props.tableHeader.title),
            React.DOM.div({ className: "GoodsTableCell ShopHeaderCell" }, this.props.tableHeader.price),
            React.DOM.div({ className: "GoodsTableCell ShopHeaderCell" }, this.props.tableHeader.url),
            React.DOM.div({ className: "GoodsTableCell ShopHeaderCell" }, this.props.tableHeader.count),
            React.DOM.div({ className: "GoodsTableCell ShopHeaderCell" }, this.props.tableHeader.control),
        );

        const goodsCode = this.state.goods.map((el, ind) =>
            React.createElement(GoodsTable, {
                key: el.id,
                id: el.id,
                row: ind + 1,
                title: el.title,
                price: el.price,
                url: el.url,
                count: el.count,
                cbClickedRow: this.clickedRow,
                isSelected: this.isRowClicked(el.id),
                cbDeletedRow: this.deleteRow,
            })
        );


        return React.DOM.div(null, welcomeCode, React.DOM.div({ className: "ShopFrame" }, tableHeaderCode, goodsCode));
    },
});
const GoodsTable = React.createClass({
    displayName: 'GoodsTable',

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
        if (e.target.name !== 'GoodsDelete') this.props.cbClickedRow(this.props.id);
    },

    deleteClickedRow: function () {
        this.props.cbDeletedRow(this.props.row);
    },

    render: function () {
        const goodsCode = React.DOM.div({ key: this.props.id, className: `${this.props.isSelected ? `GoodsTableSelected ` : ``}ShopRow`, onClick: this.rowClicked },
            React.DOM.div({ className: "GoodsTableId GoodsTableCell" }, this.props.row),
            React.DOM.div({ className: "GoodsTableTitle GoodsTableCell" }, this.props.title),
            React.DOM.div({ className: "GoodsTablePrice GoodsTableCell" }, this.props.price),
            React.DOM.div({ className: "GoodsTableImg GoodsTableCell" }, React.DOM.img({ src: this.props.url })),
            React.DOM.div({ className: "GoodsTableCount GoodsTableCell" }, this.props.count),
            React.DOM.div({ className: "GoodsTableCount GoodsTableCell" }, React.DOM.input({ type: 'button', name: 'GoodsDelete', className: 'GoodsDelete', value: 'Delete', onClick: this.deleteClickedRow })),
        );
        return React.DOM.div(null, goodsCode);
    },
});
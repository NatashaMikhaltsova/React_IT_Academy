const Filter = React.createClass({
    displayName: 'Filter',

    propTypes: {
        initArray: React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired,
        ),
    },

    getInitialState: function () {
        return {
            finalArray: this.props.initArray,
            filterText: '',
            sortFlag: false,
        }
    },

    sortFlagChanged: function (e) {
        this.setState({ sortFlag: e.target.checked }, this.processList);
    },

    filterStrChanged: function (e) {
        this.setState({ filterText: e.target.value }, this.processList);
    },

    clearSettings: function () {
        this.setState({ sortFlag: false, filterText: "" }, this.processList)
    },

    processList: function () {
        let strArr = [...this.props.initArray];
        if (this.state.filterText) strArr = strArr.filter(el => el.includes(this.state.filterText));
        if (this.state.sortFlag) strArr.sort();
        this.setState({ finalArray: strArr });
    },

    render: function () {
        const filterBlock = React.DOM.div({ className: "filterControls" },
            React.DOM.label({ className: 'FilterCheckbox' },
                React.DOM.span(null, 'Sort'),
                React.DOM.input({ type: 'checkbox', name: 'sortingCheckbox', checked: this.state.sortFlag, onChange: this.sortFlagChanged })
            ),
            React.DOM.label({ className: 'FilterText' },
                React.DOM.span(null, 'Filter By:'),
                React.DOM.input({ type: 'text', name: 'filterText', value: this.state.filterText, onChange: this.filterStrChanged })
            ),
            React.DOM.input({ type: 'button', name: 'clearSorting', className: 'FilterClear', value: 'Clear', onClick: this.clearSettings })
        );

        const stringsBlockCode = this.state.finalArray.map((el, ind) => {
            return React.DOM.div({ key: ind, className: 'FilterString' }, el)
        });
        return React.DOM.div(null, filterBlock, React.DOM.div({ className: "FilterStringsBlock" }, stringsBlockCode));
    }
});
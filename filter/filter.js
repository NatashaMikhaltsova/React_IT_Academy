const Filter = React.createClass({
    displayName: 'Filter',

    propTypes: {
        initArray: React.PropTypes.arrayOf(
            React.PropTypes.string.isRequired,
        ),
    },

    getInitialState: function () {
        return {
            currentArray: this.props.initArray,
            filterText: '',
            nonSortedArray: this.props.initArray,
            markCheckbox: false,
        }
    },

    filterSettings: function (elem) {
        elem.persist();
        if (elem.target.name === 'filterText') {
            this.setState({ filterText: elem.target.value });
            this.setState(prevState => { return { currentArray: this.props.initArray.filter(el => el.includes(prevState.filterText)) } });
            this.setState(prevState => { return { nonSortedArray: prevState.currentArray } });
        }
        if (elem.target.name === 'sortingCheckbox') {
            this.setState(prevState => { return { markCheckbox: !(prevState.markCheckbox) } });
        }
        if (elem.target.name === 'clearSorting') {
            this.setState({ currentArray: this.props.initArray, filterText: '', markCheckbox: false });
            this.setState(prevState => { return { nonSortedArray: prevState.currentArray } });
        }
        this.setState(prevState => { return { currentArray: (prevState.markCheckbox ? [...prevState.currentArray].sort() : prevState.nonSortedArray) } });
    },

    render: function () {
        const filterBlock = React.DOM.div({ className: "filterControls" },
            React.DOM.label({ className: 'FilterCheckbox' },
                React.DOM.span(null, 'Sort'),
                React.DOM.input({ type: 'checkbox', name: 'sortingCheckbox', checked: this.state.markCheckbox, onClick: this.filterSettings })
            ),
            React.DOM.label({ className: 'FilterText' },
                React.DOM.span(null, 'Filter By:'),
                React.DOM.input({ type: 'text', name: 'filterText', value: this.state.filterText, onChange: this.filterSettings })
            ),
            React.DOM.input({ type: 'button', name: 'clearSorting', className: 'FilterClear', value: 'Clear', onClick: this.filterSettings })
        );

        const stringsBlockCode = this.state.currentArray.map((el, ind) => {
            return React.DOM.div({ key: ind, className: 'FilterString' }, el
            )
        });
        return React.DOM.div(null, filterBlock, React.DOM.div({ className: "FilterStringsBlock" }, stringsBlockCode));
    },
});
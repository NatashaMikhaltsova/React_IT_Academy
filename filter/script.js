const initArray = ['california', 'everything', 'aboveboard', 'washington', 'basketball', 'weathering', 'characters', 'literature', 'contraband', 'appreciate'];

ReactDOM.render(
    React.createElement(Filter, { initArray: initArray }),
    document.getElementById('filterBlock')
);
import React from 'react';
import ReactDOM from 'react-dom';
import { RainbowFrame } from './RainbowFrame/rainbowFrame';

const colors = ['red', 'orange', 'yellow', 'green', '#00BFFF', 'blue', 'purple'];
const text = 'Hello!';

ReactDOM.render(
    <RainbowFrame colors={colors} text={text} />,
    document.getElementById('block')
);
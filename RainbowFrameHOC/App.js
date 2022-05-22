import React from 'react';
import ReactDOM from 'react-dom';
import { WithRainbowFrame } from './WithRainbowFrame/WithRainbowFrame';
import { DoubleButton } from './DoubleButton/DoubleButton';

const colors = ['red', 'orange', 'yellow', 'green', '#00BFFF', 'blue', 'purple'];
const WithRainbowFrameDB = WithRainbowFrame(colors)(DoubleButton);

ReactDOM.render(
    <React.Fragment>
        <DoubleButton caption1="однажды" caption2="пору" cbPressed={num => alert(num)}> в студёную зимнюю </DoubleButton>
        <WithRainbowFrameDB caption1="я из лесу" caption2="мороз" cbPressed={num => alert(num)}> вышел, был сильный </WithRainbowFrameDB>
    </React.Fragment>,
    
    document.getElementById('block')
);
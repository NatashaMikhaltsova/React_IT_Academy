import React from 'react';
import ReactDOM from 'react-dom';
import { BrParsing } from './brParsing/BrParsing';

const text = "первый<br>второй<br/>третий<br />последний";

ReactDOM.render(
    <BrParsing text={text} />,
    document.getElementById('block')
);
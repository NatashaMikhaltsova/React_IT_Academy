import React from 'react';
import PropTypes from 'prop-types';

import './rainbowFrame.css';

export class RainbowFrame extends React.Component {

    static propTypes = {
        colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    };

    render() {
        let result = this.props.children;
        this.props.colors.forEach(color => {
            result =
                <div style={{ border: "solid 5px " + color, padding: "10px" }}>
                    {result}
                </div>
        });
        return result;
    }
};
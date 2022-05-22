import React from 'react';
import PropTypes from 'prop-types';

export class DoubleButton extends React.Component {

    static propTypes = {
        caption1: PropTypes.string.isRequired,
        caption2: PropTypes.string.isRequired,
        cbPressed: PropTypes.func.isRequired,
    }

    clickFirstButton = () => this.props.cbPressed(1);
    clickSecondButton = () => this.props.cbPressed(2);

    render() {
        return (
            <div>
                <input type="button" value={this.props.caption1} onClick={this.clickFirstButton} />
                {this.props.children}
                <input type="button" value={this.props.caption2} onClick={this.clickSecondButton} />
            </div>
        )
    }
};
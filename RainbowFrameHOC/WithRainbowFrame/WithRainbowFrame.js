import React from 'react';

import './WithRainbowFrame.css';

export const WithRainbowFrame = colors => Component => props => {
    let result = <Component {...props} />;
        colors.forEach(color => {
            result =
                <div style={{ border: "solid 5px " + color, padding: "5px" }}>
                    {result}
                </div>
        });
        return result;
}
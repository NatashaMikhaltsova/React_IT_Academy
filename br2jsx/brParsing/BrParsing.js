import React from 'react';
import './BrParsing.css';

export class BrParsing extends React.Component {
    render() {
        let arr = this.props.text.split(/<br.?\/?>/g);

        return (
            <div className='brParsing'>
                {this.props.text.split(/<br.?\/?>/g).map((el, ind) => 
                <React.Fragment key={ind}>
                    {el}
                    {(ind != (arr.length - 1)) && <br />}
                </React.Fragment>)}
            </div>
        )
    }
};
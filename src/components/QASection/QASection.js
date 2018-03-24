import React, { Component } from 'react';
import { H1, H2 } from '../../theme/types';

class QASection extends Component {

    render(){
        const {
            question,
            answer,
            imageURL
        } = this.props;
        return (
            <div>
                <H1>{question}</H1>
                <H2>{answer}</H2>
            </div>
        )
    }
}

export default QASection;
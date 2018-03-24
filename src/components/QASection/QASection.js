import React, {Component} from 'react';
import {H1, H2} from '../../theme/types';
import {RevealP} from '../../containers/Home/Home.style';
import {Flex} from '../../theme/grid';

class QASection extends Component {

    render() {
        const {
            question,
            answer,
            imageURL,
            justify,
            align
        } = this.props;
        return (
            <Flex align={align} justify={justify}>
                <Flex column width="90%">
                    <H1>{question}</H1>
                    <img src={imageURL} height='400px' width='400px'/>
                    <H2>{answer}</H2>
                </Flex>
                <div>
                    <p>
                        <span>
                        Next Questios
                    </span>
                    </p>
                </div>
            </Flex>
        )
    }
}

export default QASection;
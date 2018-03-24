import React, {Component} from 'react';
import {H1, H2} from '../../theme/types';
import {QASection, QAImage} from './QASection.style';

class Section extends Component {

    render() {
        const {
            question,
            answer,
            imageURL,
        } = this.props;
        return (
                <QASection column>
                    <H1>{question}</H1>
                    <QAImage>
                        <img src={imageURL}/>
                    </QAImage>
                    <H2>{answer}</H2>
                </QASection>
        )
    }
}

export default Section;
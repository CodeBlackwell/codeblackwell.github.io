import React, {Component} from 'react';
import {H1, H2} from '../../theme/types';
import {QASection, QAImage, Question, Answer } from './QASection.style';

class Section extends Component {

    render() {
        const {
            question,
            answer,
            imageURL,
        } = this.props;
        return (
                <QASection column>
                    <Question>{question}</Question>
                    <QAImage>
                        <img src={imageURL}/>
                    </QAImage>
                    <Answer>{answer}</Answer>
                </QASection>
        )
    }
}

export default Section;
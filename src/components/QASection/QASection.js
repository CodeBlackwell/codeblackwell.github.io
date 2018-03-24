import React, {Component} from 'react';
import {H1, H2} from '../../theme/types';
import {RevealP} from '../../containers/Home/Home.style';
import {QASection, QAImage} from './QASection.style';

class Section extends Component {

    render() {
        const {
            question,
            answer,
            imageURL,
        } = this.props;
        return (
                <QASection column width="90vw">
                    <H1>{question}</H1>
                    <QAImage imageURL={imageURL}/>
                    <H2>{answer}</H2>
                </QASection>
        )
    }
}

export default Section;
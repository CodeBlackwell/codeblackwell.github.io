import React, {Component, PropTypes} from 'react';
import styled from 'styled-components';
import { Container } from '../../theme/grid';

const Image = styled.img`
    width: 100%;
    height: 20%;
    `;

export default class Home extends Component {
    static propTypes = {};

    render() {
        return (
            <Container>
                <div>
                    <Image src={require('../../assets/Me.jpg')} alt="Me"/>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus interdum nulla est,
                        et mattis leo pellentesque malesuada. Vivamus sodales accumsan orci, nec malesuada nisi
                        molestie quis. Donec turpis lectus, congue sit amet sem tempus, varius auctor ex. Sed est
                        nulla, consectetur sit amet dignissim ac, vulputate at leo. Sed dignissim eleifend risus a
                        pellentesque. Cras imperdiet tortor non nisi placerat lobortis. Sed non orci tincidunt
                        ante mollis ultricies sit amet sed tortor. Vivamus at enim tellus. Aliquam erat volutpat.
                    </p>
                </div>
            </Container>
        )
    }
}
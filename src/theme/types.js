import styled from 'styled-components';
import { orange, tomato } from './variables';
import media from './media';

export const A = styled.a`
    color: ${orange};
    text-decoration: none;
    display: block;
    
    &:after {
        
        content: ' ';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 10%;
        width: 100%;
        background-color: ${orange};
    }
`;

export const Title = styled.h1`
    position: fixed;
    margin-top: 25px;
    ${media.phone`
        margin-top: 100px;
        font-size: 1.1em;
        margin-left: 8px;
    `}
    ${media.giant`
        margin-top: 2px;
        font-size: 1.4em;
    `}
    color: ${tomato}
`;

export const [ H1, H2, H3, H4, H5, H6, P, Blockquote, Code] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote', 'code']
.map( tag => styled[tag]`
    ${ ({align}) =>
        align && `text-align: ${align};
        `}
`);
import styled, {css} from 'styled-components';
import {Flex} from '../../theme/grid';
import { H2, H1 } from '../../theme/types';
import media from '../../theme/media';

export const Question = styled(H1)`
    ${media.phone`
        font-size: 1.1em;
        margin-top: -20px;
    `}
`;

export const Answer = styled(H2)`
    ${media.phone`
        font-size: 1.1em;
        margin-right: 16px;
    `}
`;

export const QASection = styled(Flex)`
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    ${media.desktop`
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    `}
    ${media.tablet`
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    `}
    ${media.phone`
    margin-top: 100px;
    margin-left: 15px;
    margin-right: 50px;
    margin-bottom: 100px;
    `}
    > img {
        width: 50%;
        height: 50%;
        margin: 0 0 20px 50px;
    }
    
`;

export const QAImage = styled.div`
    
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    > img {
        height: 60vh;
        width: 75vw;
        max-width: 600px;
        justify-self: right;
    }
    text-align: center;
    color: white;
    
    font-size: 2em;
    
    h1 {
    margin-bottom: 0;
    }
`;
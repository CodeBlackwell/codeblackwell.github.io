import styled, {css} from 'styled-components';
import {Flex} from '../../theme/grid';
import {H2, H1} from '../../theme/types';
import media from '../../theme/media';

export const Question = styled(H1)`
    ${media.tablet`
        font-size: 1.3em;
        margin-top: -5vh;
        margin-bottom: auto;
    `}
    ${media.phone`
        font-size: 1em;
        margin-top: -5vh;
        margin-bottom: auto;
    `}
`;

export const Answer = styled(H2)`
    ${media.tablet`
        font-size: 1em;
        margin-right: 12vw;
        
    `}
    ${media.phone`
        font-size: .8em;
        margin-right: 3vw;
        
    `}
`;

export const QASection = styled(Flex)`
    ${media.desktop`
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    `}
    ${media.tablet`
    margin: 15vh 0 0 7.5vw;
    `}
    ${media.phone`
    margin: 14vh 10vw;
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
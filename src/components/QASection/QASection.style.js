import styled, {css} from 'styled-components';
import {Flex} from '../../theme/grid';
import media from '../../theme/media'

export const QASection = styled(Flex)`
    margin-top: 150px;
    margin-left: 100px;
    margin-right: 50px;
    margin-bottom: 100px;
    ${media.desktop`
    margin-top: 150px;
    margin-left: 100px;
    margin-right: 50px;
    margin-bottom: 100px;
    `}
    ${media.tablet`
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0x;
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
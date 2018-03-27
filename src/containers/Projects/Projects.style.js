import styled from 'styled-components';
import { purple, tomato, orange } from '../../theme/variables';
import media from '../../theme/media';

export const Polaroid = styled.div`
    display: inline-block;
    overflow: hidden;
    > img {
        display: inline-block;
        border: .5px solid black;
        margin: 10px;
        height: 30vh;
        width: 30vh;
    }
    :hover {
            transform: scale(1.05);
            transition: transform 1s;
    }
    
    > h2 {
        padding: 20px 0 20px 0;
        border: 1px dotted black;
        border-radius: 10px;
    }
    background-color: ${purple};
    text-align: center;
    padding: 0 10px 0 10px;        
    border: 2px solid black;
    box-shadow: 2px 2px ${tomato};
    ${media.phone`
        margin-top: -3vh;
    `}

`;

export const Index = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
    h1 {
        font-size: 4em;
        margin: 0;
        font-weight: bold;
        color: ${orange};
        opacity: 0.4;
    }
    ${media.phone`
        margin-left: 
    `}
`;
import styled from 'styled-components';
import { purple, tomato, orange } from '../../theme/variables';
import media from '../../theme/media';
import { Relative } from '../../theme/grid';

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
        margin: 17vh -1.5vh;
        transform: scale(.8);
        :hover {
            transform: scale(.9);
            transition: transform 1s;
    }
    `}

`;

export const IndexContainer = styled(Relative)`
    h1 {
        display: inline-block;
    }
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
        margin: -18vh 4vw;
        h1 {
            font-size: 3em;
            margin: 2.8vh 0vh;
        }
    `}
`;

export const ProjectDescription = styled.article`
    ${media.phone`
        margin: -19vh 20vw 0 1vh;
        color: ${orange};
    `}
`;
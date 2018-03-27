import styled, { css } from 'styled-components';
import media from '../../theme/media';

//@formatter-off
export const Image = styled.img`
    width: 100%;
    height: 20%;
`;

export const HeroImage = styled.div`
    height: 100vh;
    
    background-image: url('${require('../../assets/Me.jpg')}');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: flex-end;
    
    text-align: center;
    color: white;
    
    font-size: 2em;
    
    h1 {
    margin-bottom: 0;
    }
    ${media.phone`
        h1 {
            font-size: 1.1em;
            margin: 8vh 0vh -5vh;
        }
        h2 {
            font-size: .8em;
            margin: 36vh 10vw;
        }
    `}
`;

export const RevealP = styled.p`
    position: relative;
    &:after {
        content: '  ';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        
        transform-origin: left;
        transform: rotateY(90deg);
        
        transition: transform 1s;
    }
    
    ${({ hide }) => hide && css`
        &:after {
            transform: rotateY(0deg);
        }
    `}
`;


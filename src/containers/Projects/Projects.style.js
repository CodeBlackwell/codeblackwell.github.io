import styled from 'styled-components';

export const Polaroid = styled.div`
    display: inline-block;
    > img {
        height: 40vh;
        width: 40vh;
        padding: 15px 10px 10px 10px;
    }
    &:hover {
        & > img {
            transform: scale(1.2);   
        }
    }
    background-color: tan;
    text-align: center;
    padding: 0 10px 0 10px;        
    border: 2px solid black;
    box-shadow: 2px 2px grey;

`;
import styled from 'styled-components';

export const Polaroid = styled.div`
    display: inline-block;
    overflow: hidden;
    > img {
        display: inline-block;
        height: 40vh;
        width: 40vh;
        padding: 15px 10px 10px 10px;
    }
    :hover {
        & > img {
            transform: scale(1.4);   
        }
    }
    
    > h2 {
        padding: 20px 0 20px 0;
        border: 1px dotted black;
        border-radius: 10px;
    }
    background-color: tan;
    text-align: center;
    padding: 0 10px 0 10px;        
    border: 2px solid black;
    box-shadow: 2px 2px grey;

`;
import styled from 'styled-components';
import { orange } from './variables';

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

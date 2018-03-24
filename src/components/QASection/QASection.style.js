import styled, {css} from 'styled-components';
import { Flex } from '../../theme/grid';

export const QASection = styled(Flex)`
    margin-top: 100px;
    margin-left: 100px;
    margin-right: 50px;
    margin-bottom: 100px;
    > img {
        width: 50%;
        height: 50%;
    
    }
`;

export const QAImage = styled.div`
    height: 60vh;
    width: 75vw;
    background-image: url('${require('../../assets/Me.jpg')}');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    
    text-align: center;
    color: white;
    
    font-size: 2em;
    
    h1 {
    margin-bottom: 0;
    }
`;
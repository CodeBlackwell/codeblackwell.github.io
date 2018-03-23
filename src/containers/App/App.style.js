import styled from 'styled-components';
import { midnight } from '../../theme/variables';


//@TODO: background-image: url({'my.picture.com'})
export const Background = styled.div`
    position: fixed;
    left: 10vw;
    width: 80vw;
    top: 10vh;
    height: 80vh;
    background-color: ${midnight};
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
    z-index: -99;
`;
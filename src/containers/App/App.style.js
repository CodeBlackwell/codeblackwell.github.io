import styled from 'styled-components';
import { midnight } from '../../theme/variables';
import media from '../../theme/media';


//@TODO: background-image: url({'my.picture.com'})
export const Background = styled.div`
    position: fixed;
    left: 6vw;
    width: 80vw;
    top: 10vh;
    height: 80vh;
    background-color: ${midnight};
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    z-index: -99;
`;
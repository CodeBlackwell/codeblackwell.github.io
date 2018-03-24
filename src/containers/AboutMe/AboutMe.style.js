import styled, { css } from 'styled-components';
import { tomato } from '../../theme/variables';
import { Relative, Flex } from '../../theme/grid';

export const Title = styled.h1`
    position: fixed;
    margin-top: 25px;
    color: ${tomato}
`;

export const VideoContainer = styled(Relative)`
    align-self: right;
    width: 90vh;
    flex-shrink: 0;
    flex-grow: 0;
`;

export const RevealQASection = styled(Flex)`
    position: relative;
    &:after {
        content: ' ';
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
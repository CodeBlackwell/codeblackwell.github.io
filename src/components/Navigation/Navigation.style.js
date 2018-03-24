import styled from 'styled-components';
import { Link } from 'react-router';

import { Flex } from '../../theme/grid';
import { midnight } from '../../theme/variables';

export const NavigationContainer = styled(Flex)`
    position: fixed;
    z-index: 99;
    right: 0;
    right: 2em;
    top: 1.8em;
`;

export const NavItem = styled(Link)`
    margin-right: 30px;
    font-size: 1.5em;
    cursor: pointer;
    &:hover {
        color: white;
        background-color: ${midnight}
    }
`;
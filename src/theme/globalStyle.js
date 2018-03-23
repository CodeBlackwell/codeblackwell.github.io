import { injectGlobal } from 'styled-components';
import { tomato } from './variables';

injectGlobal`
    @import url('https://fonts.googleapis.com/css?family=VT323');
    
    body {
        font-family: 'VT323', monospace;
        font-size: 24px;
    }
    
    h1, h2, h3 {
        font-weight: normal;
        color: ${tomato};
    }
`;
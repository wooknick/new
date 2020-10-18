import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset};
    *{
        box-sizing: border-box;
    }
    body{
        font-size: 16px;
        font-weight: 300;
    }
    a{
        text-decoration: none;
    }
    input:focus{
        outline: none;
    }
    span.highlight{
        color: white;
        background: rgba(0,74,39,0.4);
    }
`;

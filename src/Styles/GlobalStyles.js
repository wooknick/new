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
`;

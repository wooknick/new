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
        /* background: #B3C5BA; */
        background: rgba(0, 92, 67, 1);
    }
    span:not(.highlight){
        /* opacity: 0.8; */
    }
    span.word{
        line-height: 2rem;
        display: inline-block;
        padding-right: 0.3em;
        vertical-align: center;
    }
    div.text-area{
        /* word-break: keep-all; */
        height: 450px;
        overflow: scroll;
        border: 1px solid black;
        padding: 1rem;
        cursor: pointer;
    }
    div.select-area{
        border: 1px solid red;
    }
`;

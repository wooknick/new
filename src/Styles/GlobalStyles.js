import { createGlobalStyle, keyframes } from "styled-components";
import reset from "styled-reset";

const bounceKeyframes = keyframes`
0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-30px);}
    60% {transform: translateY(-20px);}
`;

export default createGlobalStyle`
    ${reset};
    *{
        box-sizing: border-box;
    }
    html{
        font-size: 21px;
        /* font-family: 'Nanum Myeongjo', serif; */
        font-family: 'Noto Sans KR', sans-serif;
        width: 100%;
    }
    body{
        font-weight: 300;
        width: 100%;
        /* min-height: 100vh; */
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
    span.word{
        line-height: 2rem;
        display: inline-block;
        padding-right: 0.3em;
        vertical-align: center;
    }
    div.text-area{
        width: 100%;
        display: flex;
        justify-content: center;
        user-select: none;
    }
    div.text-wrapper{
        width: 100%;
        height: 100%;
        overflow: scroll;
        max-width: 740px;
        padding: 1rem;
        cursor: pointer;
        &::-webkit-scrollbar {
            display: none;
            }
    }
    div.select-area{
        /* border: 1px solid red; */
    }
    .not-applied{
        border-radius: 0px;
        background: #ffffff;
        box-shadow: 5px 5px 10px #e6e6e6, -5px -5px 10px #ffffff;
    }
    .applied{
        border-radius: 0px;
        background: #ffffff;
        box-shadow: inset 5px 5px 10px #e6e6e6, inset -5px -5px 10px #ffffff;
    }

    .focus-word{
    animation-duration: 1s;
    animation-name: ${bounceKeyframes};
    }
`;

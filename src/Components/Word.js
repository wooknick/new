import React from "react";
import styled, { css } from "styled-components";

const Highlight = (bgColor, size) => css`
  /* color: white; */
  background: ${bgColor};
  /* opacity: 1; */
  font-size: ${size};
`;

const Normal = css`
  color: black;
  background: none;
  font-size: 1rem;
  /* opacity: 0.1; */
`;

const NotFocus = css`
  color: black;
  background: none;
  font-size: 1rem;
  opacity: 0.2;
`;

const Span = styled.span`
  line-height: 2rem;
  display: inline-block;
  padding-right: 0.3em;
  vertical-align: center;
  transition: all 0.1s ease-in-out;
  ${(props) =>
    props.score === 0
      ? Normal
      : Highlight(props.highlightColor, props.highlightSize)}
  ${(props) => (props.focusOn && props.score < props.showLevel ? NotFocus : "")}
`;

const Word = ({ id, text, score, showLevel, focusOn }) => {
  const bgColor = [
    "white",
    "rgba(250, 255, 110, 0.5)",
    "rgba(250, 255, 110, 0.75)",
    "rgba(250, 255, 110, 1)",
  ];
  const size = ["1rem", "1.2rem", "1.4rem", "1.6rem"];
  const tScore =
    showLevel !== undefined && showLevel < score ? showLevel : score;
  return (
    <Span
      id={id}
      data-score={score}
      data-showlevel={showLevel}
      className="word"
      score={tScore}
      highlightColor={bgColor[tScore]}
      highlightSize={size[tScore]}
      focusOn={focusOn}
      showLevel={showLevel}
    >
      {text}
    </Span>
  );
};

export default Word;

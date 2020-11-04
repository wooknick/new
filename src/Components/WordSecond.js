import React from "react";
import styled, { css } from "styled-components";

const Highlight = (bgColor, size) => css`
  /* color: white; */
  /* background: ${bgColor}; */
  opacity: 1;
  font-size: ${size};
`;

const Normal = (bgColor, size) => css`
  /* color: ${bgColor === "white" ? "black" : "white"}; */
  /* background: ${bgColor}; */
  opacity: 1;
  font-size: ${size};
`;

const Previous = css`
  color: black;
  background: none;
  /* opacity: 0.1; */
`;

const Span = styled.span`
  line-height: 2rem;
  display: inline-block;
  padding-right: 0.3em;
  vertical-align: center;
  transition: all 0.1s ease-in-out;
  ${(props) =>
    props.score >= props.level
      ? Highlight(props.highlightColor, props.highlightSize)
      : props.score === props.level - 1
      ? Normal(props.normalColor, props.normalSize)
      : Previous}
`;

const Word = ({ id, text, score, level }) => {
  // const bgColor = ["white", "#b3c5ba", "#86aa94", "#518e68"];
  const bgColor = [
    "white",
    "rgba(0, 92, 67, 0.5)",
    "rgba(0, 92, 67, 0.75)",
    "rgba(0, 92, 67, 1)",
  ];
  const size = ["1rem", "1.4rem", "1.8rem", "2rem"];
  return (
    <Span
      id={id}
      data-score={score}
      className="word"
      score={score}
      level={level}
      highlightColor={bgColor[score]}
      normalColor={bgColor[level - 1]}
      normalSize={size[level - 1]}
      highlightSize={size[score]}
    >
      {text}
    </Span>
  );
};

export default Word;

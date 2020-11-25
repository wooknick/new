import React from "react";
import styled, { css } from "styled-components";

const Highlight = (score, size, weight) => css`
  /* color: white; */
  background: ${(props) => props.theme.bgColor[score]};
  /* opacity: 1; */
  font-size: ${size};
  /* font-weight: ${weight}; */
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
  transition: all 0.2s ease-in-out;
  ${(props) =>
    props.score === 0
      ? Normal
      : Highlight(props.score, props.highlightSize, props.highlightWeight)}
  ${(props) => (props.focusOn && props.score < props.showLevel ? NotFocus : "")}
`;

const Word = ({ id, text, score, showLevel, focusOn }) => {
  const bgColor = ["white", "#FBED28", "#FAD234", "#FFBD38"];
  // const bgColor = [
  //   "white",
  //   "rgba(250, 255, 110, 0.2)",
  //   "rgba(250, 255, 110, 0.5)",
  //   "rgba(250, 255, 110, 1)",
  // ];
  const size = ["1rem", "1.15rem", "1.3rem", "1.45rem"];
  const weight = [300, 400, 500, 700];
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
      highlightWeight={weight[tScore]}
      focusOn={focusOn}
      showLevel={showLevel}
    >
      {text}
    </Span>
  );
};

export default Word;

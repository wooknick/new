import React from "react";
import styled, { css } from "styled-components";

const Highlight = css`
  color: white;
  background: #b3c5ba;
  opacity: 1;
  transition: all 0.2s linear;
`;

const Normal = css`
  color: black;
  background: none;
  opacity: 1;
  transition: all 0.2s linear;
`;

const Previous = css`
  color: black;
  background: none;
  opacity: 0.2;
  transition: all 0.2s linear;
`;

const Span = styled.span`
  line-height: 2rem;
  display: inline-block;
  padding-right: 0.3em;
  vertical-align: center;
  ${(props) =>
    props.score >= props.level
      ? `${Highlight}`
      : props.score === props.level - 1
      ? `${Normal}`
      : `${Previous}`}
`;

const Word = ({ id, text, score, level }) => {
  return (
    <Span
      id={id}
      data-score={score}
      className="word"
      score={score}
      level={level}
    >
      {text}
    </Span>
  );
};

export default Word;

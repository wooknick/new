import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Span = styled.span`
  line-height: 2rem;
  display: inline-block;
  padding-right: 0.3em;
  vertical-align: center;
`;

const Word = ({ id, data, isTouchMoving, selection }) => {
  const [text, setText] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (data) {
      setText(data[id][0]);
      setScore(data[id][1]);
    }
  }, [data, id]);

  const handleTouch = (e) => {
    console.log("2");
    console.log(isTouchMoving.current);
    if (!isTouchMoving.current) {
      const selected = selection.getSelection();
      if (selected.includes(e.target)) {
        selection.removeFromSelection(e.target);
        e.target.classList.remove("highlight");
      } else {
        selection.select(e.target);
        selection.keepSelection();
        e.target.classList.add("highlight");
      }
    }
    isTouchMoving.current = false;
  };

  const handleClick = (e) => {
    console.log("click");
    setScore((v) => v + 1);
    const selected = selection.getSelection();
    console.log(selected);
    if (selected.includes(e.target)) {
      selection.removeFromSelection(e.target);
      e.target.classList.remove("highlight");
    } else {
      selection.select(e.target);
      selection.keepSelection();
      e.target.classList.add("highlight");
    }
  };

  return (
    <Span
      id={id}
      data-score={score}
      className="word"
      onTouchEnd={handleTouch}
      onClick={handleClick}
    >
      {text}
      {score}
    </Span>
  );
};

export default Word;

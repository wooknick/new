import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Selection from "@simonwep/selection-js";
import { sonagi } from "../data";
import Word from "../Components/Word";
import Histogram from "../Components/Histogram";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100vw;
  max-width: 480px;
  min-height: 80vh;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 2rem;
`;

const DepthInfo = styled.div`
  width: 100%;
  max-width: 480px;
  height: 70px;
  border: 1px solid grey;
  margin-top: 10px;
  margin-left: 2rem;
  margin-right: 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

  label {
    display: flex;
    align-items: center;
  }
  label > div {
    text-align: center;
    width: 50px;
  }
`;

const Fourth = () => {
  const data = sonagi;
  const [text, setText] = useState([]);
  const [level, setLevel] = useState(1);
  const target = useRef();
  const selection = useRef();

  useEffect(() => {
    // init
    let idx = 0;
    const newText = data[idx].split(/\s/g).map((item, idx) => [item, 0]);
    setText(newText);
  }, [data]);

  useEffect(() => {
    if (selection.current) {
      selection.current.clearSelection();
      const selected = document.querySelectorAll(
        `.word[data-score='${level}']`
      );
      selection.current.select([...selected]);
      selection.current.keepSelection();
    }
  }, [level]);

  useEffect(() => {
    selection.current = new Selection({
      class: "select-area",
      frame: document,
      startThreshold: 5,
      disableTouch: false,
      mode: "touch",
      tapMode: "native",
      singleClick: true,
      selectables: ["span.word"],
      startareas: ["html"],
      boundaries: ["div.text-area"],
      selectionAreaContainer: "body",
      scrollSpeedDivider: 10,
      manualScrollSpeed: 750,
    });
  }, []);

  useEffect(() => {
    const handleStart = (evt) => {
      const {
        changed: { added },
      } = evt;
      for (const el of added) {
        if (el.dataset.score === level - 1) {
          el.classList.add("highlight");
        }
      }
    };
    const handleMove = (evt) => {
      const {
        changed: { removed, added },
      } = evt;
      const selected = selection.current.getSelection();
      for (const el of added) {
        if (Number(el.dataset.score) === level - 1) {
          el.classList.add("highlight");
        }
      }
      for (const el of removed) {
        if (!selected.includes(el)) {
          el.classList.remove("highlight");
        }
      }
    };
    const handleStop = (evt) => {
      const {
        selected,
        changed: { removed },
      } = evt;
      const nextText = text;
      for (const el of selected) {
        if (Number(el.dataset.score) === level - 1) {
          nextText[el.id][1] = level;
        }
      }
      for (const el of removed) {
        if (Number(el.dataset.score) === level) {
          nextText[el.id][1] = level - 1;
        }
      }
      selection.current.keepSelection();
      setText([...nextText]);
    };

    selection.current.on("start", handleStart);
    selection.current.on("move", handleMove);
    selection.current.on("stop", handleStop);

    return () => {
      selection.current.off("start", handleStart);
      selection.current.off("move", handleMove);
      selection.current.off("stop", handleStop);
    };
  }, [level, text]);

  const handleCheck = (e) => {
    setLevel(Number(e.target.value));
  };

  return (
    <Wrapper>
      <div ref={target} className="text-area">
        {text.map((item, idx) => {
          if (item[0] === "<br/>") {
            return <br key={idx} />;
          } else {
            return (
              <Word
                key={idx}
                id={idx}
                text={item[0]}
                score={item[1]}
                level={level}
              />
            );
          }
        })}
      </div>
      <DepthInfo>
        <div>
          <label for="level1">
            <div>1</div>
            <input
              type="radio"
              value="1"
              name="level"
              id="level1"
              onChange={handleCheck}
              checked={level === 1}
            />
          </label>
        </div>
        <div>
          <label for="level2">
            <div>2</div>
            <input
              type="radio"
              value="2"
              name="level"
              id="level2"
              onChange={handleCheck}
              checked={level === 2}
            />
          </label>
        </div>
        <div>
          <label for="level3">
            <div>3</div>
            <input
              type="radio"
              value="3"
              name="level"
              id="level3"
              onChange={handleCheck}
              checked={level === 3}
            />
          </label>
        </div>
      </DepthInfo>
      <Histogram data={text} />
    </Wrapper>
  );
};

export default Fourth;

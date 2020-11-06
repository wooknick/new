import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Selection from "@simonwep/selection-js";
import { sonagi, news } from "../data";
import Word from "../Components/WordSecond";
import Histogram from "../Components/HistogramSecond";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100vw;
  max-width: 480px;
  min-height: 80vh;
  padding: 0 0rem;
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

const Second = () => {
  const data = news;
  const [text, setText] = useState([]);
  const [mainScore, setMainScore] = useState(0);
  const [mode, setMode] = useState(1); // 0: default, 1: create, 2: delete
  const target = useRef();
  const selection = useRef();
  const MAX_SCORE = 3;

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
        `.word[data-score='${mainScore}']`
      );
      selection.current.select([...selected]);
      selection.current.keepSelection();
    }
  }, [mainScore]);

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
    const isForbidden =
      mode === 0 || // 노말모드이거나
      (mode === 1 && mainScore === MAX_SCORE) || // 추가모드인데 이미 맥스스코어이거나
      (mode === 2 && mainScore === 0) // 삭제모드인데 제로 스코어거나
        ? true
        : false;

    const handleBeforeStart = ({ inst, oe: { target } }) => {
      if (target.dataset["score"] !== undefined) {
        console.log(Number(target.dataset["score"]));
        setMainScore(Number(target.dataset["score"]));
      }
    };
    const handleStart = ({ inst }) => {
      if (isForbidden) {
        return;
      }
      inst.clearSelection();
    };
    const handleMove = ({ changed: { removed, added } }) => {
      if (isForbidden) {
        return;
      }
      for (const el of added) {
        const elScore = Number(el.dataset.score);
        if (elScore === mainScore) {
          el.classList.add("highlight");
        }
      }
      for (const el of removed) {
        el.classList.remove("highlight");
      }
    };
    const handleStop = (evt) => {
      if (isForbidden) {
        return;
      }
      const { inst, selected } = evt;
      console.log("stop&selected", selected);
      const nextText = text;
      for (const el of selected) {
        const elScore = Number(el.dataset.score);
        if (mode === 1) {
          if (elScore === mainScore && elScore < MAX_SCORE) {
            nextText[el.id][1] = mainScore + 1;
          }
        } else if (mode === 2) {
          console.log("delete");
          if (elScore === mainScore && elScore > 0) {
            nextText[el.id][1] = mainScore - 1;
          }
        }
      }
      // selection.current.keepSelection();
      // inst.clearSelection();
      // console.log(inst.getSelection());
      // selection.current.destroy();
      setText([...nextText]);
    };

    selection.current.on("beforestart", handleBeforeStart);
    selection.current.on("start", handleStart);
    selection.current.on("move", handleMove);
    selection.current.on("stop", handleStop);

    return () => {
      selection.current.off("beforestart", handleBeforeStart);
      selection.current.off("start", handleStart);
      selection.current.off("move", handleMove);
      selection.current.off("stop", handleStop);
    };
  }, [mainScore, mode, text]);

  useEffect(() => {
    if (mode === 0) {
      selection.current.disable();
    } else {
      selection.current.enable();
    }
  }, [mode]);

  const handleMode = (e) => {
    setMode(Number(e.target.value));
  };

  return (
    <Wrapper>
      <div ref={target} className="text-area">
        {text.map((item, idx) => {
          if (item[0] === "<br/>") {
            return <br key={idx} />;
          } else {
            return <Word key={idx} id={idx} text={item[0]} score={item[1]} />;
          }
        })}
      </div>
      <DepthInfo>
        <div>
          <label>
            <div>Normal</div>
            <input
              type="radio"
              value={0}
              name="mode"
              id="modeNormal"
              onChange={handleMode}
              checked={mode === 0}
            />
          </label>
        </div>
        <div>
          <label>
            <div>Create</div>
            <input
              type="radio"
              value={1}
              name="mode"
              id="modeCreate"
              onChange={handleMode}
              checked={mode === 1}
            />
          </label>
        </div>
        <div>
          <label>
            <div>Delete</div>
            <input
              type="radio"
              value={2}
              name="mode"
              id="modeDelete"
              onChange={handleMode}
              checked={mode === 2}
            />
          </label>
        </div>
      </DepthInfo>

      <Histogram data={text} />
    </Wrapper>
  );
};

export default Second;

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Selection from "@simonwep/selection-js";
import { sonagi, news } from "../data";
import Word from "../Components/Word";
import Draggable from "react-draggable";
import Histogram from "../Components/Histogram";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  min-height: 80vh;
  padding: 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 2rem;
`;

const Control = styled.div`
  width: 200px;
  height: 150px;
  border: 1px solid #d6d6d6;
  background-color: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 200px;
  right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0px;
  background: #ffffff;
  box-shadow: 5px 5px 10px #e6e6e6, -5px -5px 10px #ffffff;
  div.title:hover {
    cursor: default;
  }
`;

const Button = styled.div`
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.9rem;
  &:hover {
    cursor: pointer;
  }
  &:active {
    border-radius: 0px;
    background: #ffffff;
    box-shadow: inset 5px 5px 10px #e6e6e6, inset -5px -5px 10px #ffffff;
  }
`;
const Create = () => {
  const data = news;
  const [text, setText] = useState([]);
  const [mainScore, setMainScore] = useState(0);
  const [funcOn, setFuncOn] = useState(false);
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
      // const selected = document.querySelectorAll(
      //   `.word[data-score='${mainScore}']`
      // );
      // selection.current.select([...selected]);
      // selection.current.keepSelection();
    }
  }, [mainScore]);

  useEffect(() => {
    selection.current = new Selection({
      class: "select-area",
      frame: document,
      startThreshold: 10,
      disableTouch: false,
      mode: "touch",
      tapMode: "native",
      singleClick: true,
      selectables: ["span.word"],
      startareas: ["html"],
      boundaries: ["div.text-area"],
      selectionAreaContainer: "body",
      scrollSpeedDivider: 100,
      manualScrollSpeed: 750,
    });
  }, []);

  useEffect(() => {
    const isForbidden =
      (mode === 1 && mainScore === MAX_SCORE) || // 추가모드인데 이미 맥스스코어이거나
      (mode === 2 && mainScore === 0) // 삭제모드인데 제로 스코어거나
        ? true
        : false;

    const handleBeforeStart = ({ inst, selected, oe: { target } }) => {
      for (const el of selected) {
        el.classList.remove("selected");
        inst.removeFromSelection(el);
      }
      if (target.dataset["score"] !== undefined) {
        setMainScore(Number(target.dataset["score"]));
      }
    };
    const handleStart = ({ inst, selected }) => {
      for (const el of selected) {
        el.classList.remove("selected");
        inst.removeFromSelection(el);
      }
      inst.clearSelection();
    };
    const handleMove = ({ changed: { removed, added } }) => {
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

    const handleStop = ({ selected, oe: { ctrlKey, metaKey, altKey } }) => {
      const nextText = text;
      for (const el of selected) {
        const elScore = Number(el.dataset.score);
        if (ctrlKey || metaKey) {
          if (elScore === mainScore && elScore < MAX_SCORE) {
            nextText[el.id][1] = mainScore + 1;
          }
        } else if (altKey) {
          if (elScore === mainScore && elScore > 0) {
            nextText[el.id][1] = mainScore - 1;
          }
        }
        el.classList.remove("highlight");
      }
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
  }, [funcOn, mainScore, mode, text]);

  useEffect(() => {
    if (mode === 0) {
      selection.current.disable();
    } else {
      selection.current.enable();
    }
  }, [mode]);

  const handleMode = (e) => {
    setMode(Number(e.target.dataset.value));
  };

  const handleFuncOnOff = (e) => {
    setFuncOn((v) => !v);
  };

  const handleSave = (e) => {
    localStorage.setItem("prehighlight", JSON.stringify(text));
  };

  return (
    <Wrapper>
      <div ref={target} className="text-area">
        <div className="text-wrapper">
          {text.map((item, idx) => {
            if (item[0] === "<br/>") {
              return <br key={idx} />;
            } else {
              return <Word key={idx} id={idx} text={item[0]} score={item[1]} />;
            }
          })}
        </div>
      </div>
      <Draggable bounds="body">
        <Control className="box">
          <div className="title">하이라이트</div>
          <Button className="not-applied" onClick={handleSave}>
            저장
          </Button>
          {/* <Button
            className={funcOn ? "applied" : "not-applied"}
            onClick={handleFuncOnOff}
            onTouchEnd={handleFuncOnOff}
          >
            {funcOn ? "켜짐" : "꺼짐"}
          </Button>
          <Button
            data-value={1}
            className={funcOn && mode === 1 ? "applied" : "not-applied"}
            onClick={handleMode}
            onTouchEnd={handleMode}
          >
            단계 업
          </Button>
          <Button
            data-value={2}
            className={funcOn && mode === 2 ? "applied" : "not-applied"}
            onClick={handleMode}
            onTouchEnd={handleMode}
          >
            단계 다운
          </Button>

          <Histogram data={text} /> */}
        </Control>
      </Draggable>
    </Wrapper>
  );
};

export default Create;

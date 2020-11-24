import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Selection from "@simonwep/selection-js";
import Draggable from "react-draggable";
import Word from "../Components/Word";
import Compress from "../Components/Compress";
import Histogram from "../Components/Histogram";
import { sonagi, news } from "../data";

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
  bottom: 150px;
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

const CompressWrapper = styled.div`
  width: 130px;
  height: 500px;
  border: 1px solid #d6d6d6;
  background-color: rgba(255, 255, 255, 1);
  position: fixed;
  top: 100px;
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
  const [start, setStart] = useState(-1);
  const [usage, setUsage] = useState([0, 0, 0]);
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
      setStart(Number(target.id));
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
    const handleMove = ({
      selected,
      changed: { removed, added },
      oe: { target: tg },
    }) => {
      for (const el of added) {
        const elScore = Number(el.dataset.score);
        if (elScore === mainScore) {
          el.classList.add("highlight");
        }
      }
      for (const el of removed) {
        el.classList.remove("highlight");
      }
      if (removed.length + added.length) {
        const allEl = document.querySelectorAll(".word");
        let from = Number(selected[0].id);
        let to = Number(selected[selected.length - 1].id);
        const end = tg.classList.contains("word") ? Number(tg.id) : from;
        if (end < start && from !== end) {
          from = end;
          to = start;
        } else if (start < end && from !== start) {
          from = start;
          to = end;
        }
        const target = Array.from(allEl).slice(from, to < 0 ? from : to + 1);
        for (const el of allEl) {
          el.classList.remove("highlight");
        }
        for (const el of target) {
          el.classList.add("highlight");
        }
      }
    };

    const handleStop = ({ oe: { ctrlKey, metaKey, altKey } }) => {
      const nextText = text;
      const highlighted = document.querySelectorAll("span.highlight");
      for (const el of highlighted) {
        const elScore = Number(el.dataset.score);
        if (ctrlKey || metaKey) {
          if (elScore < MAX_SCORE) {
            nextText[el.id][1] = nextText[el.id][1] + 1;
          }
        } else if (altKey) {
          if (elScore > 0) {
            nextText[el.id][1] = nextText[el.id][1] - 1;
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
  });

  useEffect(() => {
    if (text.length > 0) {
      const first = text.filter((item) => item[1] >= 1);
      const second = text.filter((item) => item[1] >= 2);
      const third = text.filter((item) => item[1] >= 3);
      const fDelta = Math.floor((first.length / text.length) * 100);
      const sDelta = Math.floor((second.length / text.length) * 100);
      const tDelta = Math.floor((third.length / text.length) * 100);
      setUsage([fDelta, sDelta, tDelta]);
    }
  }, [text]);

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
              return <br key={idx} id={idx} className="word" />;
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
      <Draggable handle="strong" bounds="body">
        <CompressWrapper className="box no-cursor">
          <Compress data={usage} />
        </CompressWrapper>
      </Draggable>
    </Wrapper>
  );
};

export default Create;

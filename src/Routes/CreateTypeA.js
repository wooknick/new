import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Selection from "@simonwep/selection-js";
import Draggable from "react-draggable";
import { withRouter } from "react-router-dom";
import Word from "../Components/Word";
import Compress from "../Components/Compress";
import { news } from "../data";

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 3rem;
  width: 100%;
  min-height: 80vh;
  padding: 0 0;
  display: flex;
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
  bottom: 50px;
  right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0px;
  background: #ffffff;
  box-shadow: 5px 5px 10px #e6e6e6, -5px -5px 10px #ffffff;
  &:hover {
    cursor: move;
  }
`;

const CompressWrapper = styled.div`
  width: 130px;
  height: 500px;
  border: 1px solid #d6d6d6;
  background-color: rgba(255, 255, 255, 1);
  position: fixed;
  top: calc((100vh - 500px) / 2);
  left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0px;
  background: #ffffff;
  box-shadow: 5px 5px 10px #e6e6e6, -5px -5px 10px #ffffff;
  z-index: 3;
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

const CreateTypeA = withRouter(({ history }) => {
  const data = news;
  const [text, setText] = useState([]);
  const [mainScore, setMainScore] = useState(0);
  const [start, setStart] = useState(-1);
  const [usage, setUsage] = useState([0, 0, 0]);
  const target = useRef();
  const selection = useRef();
  const MAX_SCORE = 3;

  useEffect(() => {
    // init
    let idx = 0;
    const newText = data[idx].split(/\s/g).map((item, idx) => [item, 0]);
    const fetchText = localStorage.getItem("highlighttypea");
    if (fetchText) {
      const preHighlight = JSON.parse(fetchText);
      setText(preHighlight.map((item) => [...item, 0]));
    } else {
      setText(newText);
    }
  }, [data]);

  useEffect(() => {
    if (selection.current) {
      selection.current.clearSelection();
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

  const handleSave = (e) => {
    localStorage.setItem("highlighttypea", JSON.stringify(text));
    history.push("/result/a");
  };

  const handleReset = (e) => {
    let idx = 0;
    const newText = data[idx].split(/\s/g).map((item, idx) => [item, 0]);
    setText(newText);
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
          <div className="title">텍스트 요약</div>
          <Button className="not-applied" onClick={handleReset}>
            모두 지우기
          </Button>
          <Button className="not-applied" onClick={handleSave}>
            저장 후 결과 확인
          </Button>
        </Control>
      </Draggable>
      <Draggable handle="strong" bounds="body">
        <CompressWrapper className="box no-cursor">
          <Compress data={usage} />
        </CompressWrapper>
      </Draggable>
    </Wrapper>
  );
});

export default CreateTypeA;

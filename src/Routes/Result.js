import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { news } from "../data";
import Word from "../Components/Word";
import Draggable from "react-draggable";
import Histogram from "../Components/Histogram";

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 3rem;
  width: 100%;
  min-height: 80vh;
  padding: 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 2rem;
`;

const LevelControl = styled.div`
  width: 200px;
  height: 380px;
  border: 1px solid #d6d6d6;
  background-color: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 230px;
  right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0px;
  background: #ffffff;
  box-shadow: 5px 5px 10px #e6e6e6, -5px -5px 10px #ffffff;
  z-index: 3;
  &:hover {
    cursor: move;
  }
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
  z-index: 3;
  &:hover {
    cursor: move;
  }
`;

const HistogramWrapper = styled.div`
  width: 400px;
  height: 150px;
  border: 1px solid #d6d6d6;
  background-color: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 50px;
  left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0px;
  background: #ffffff;
  box-shadow: 5px 5px 10px #e6e6e6, -5px -5px 10px #ffffff;
  user-select: none;
  z-index: 3;
  div.title:hover {
    cursor: move;
  }
`;

const Button = styled.div`
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.8rem;
  &:hover {
    cursor: pointer;
  }
`;

const Result = withRouter(({ history }) => {
  const data = news;
  const [text, setText] = useState([]);
  const [funcOn, setFuncOn] = useState(true);
  const [focusOn, setFocusOn] = useState(false);
  const [mode, setMode] = useState(0); // 보여줄 score를 의미. -1일 경우는 아직 사용 안함
  const target = useRef();

  useEffect(() => {
    // init
    const newText = data[0].split(/\s/g).map((item, idx) => [item, 0]);
    const fetchText = localStorage.getItem("highlight");
    if (fetchText) {
      const preHighlight = JSON.parse(fetchText);
      setText(preHighlight.map((item) => [...item, 0]));
    } else {
      setText(newText);
    }
  }, [data]);

  const handleMode = (e) => {
    if (funcOn) {
      const eMode = Number(e.target.dataset.value);
      setMode(eMode);
    }
  };

  const handleFocusOnOff = (e) => {
    if (funcOn) {
      setFocusOn((v) => !v);
    }
  };

  const focusWord = (idx) => {
    const element = document.getElementById(idx);
    const customOffset = 250;
    const elementPosition = element.getBoundingClientRect().top;

    window.scrollTo({
      top: window.pageYOffset + elementPosition - customOffset,
      behavior: "smooth",
    });

    element.classList.add("focus-word");
    element.onanimationend = (e) => {
      e.target.classList.remove("focus-word");
    };
  };

  const handleBack = (e) => {
    history.push("/create");
  };

  return (
    <Wrapper>
      <div ref={target} className="text-area">
        <div className="text-wrapper">
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
                  showLevel={mode}
                  focusOn={focusOn}
                />
              );
            }
          })}
        </div>
      </div>
      <Draggable bounds="body">
        <LevelControl className="box">
          <div className="title">중첩 단계별 보기</div>
          <Button
            data-value={3}
            className={funcOn && mode === 3 ? "applied" : "not-applied"}
            onClick={handleMode}
          >
            중첩 3단계
          </Button>

          <Button
            data-value={2}
            className={funcOn && mode === 2 ? "applied" : "not-applied"}
            onClick={handleMode}
          >
            중첩 2단계
          </Button>
          <Button
            data-value={1}
            className={funcOn && mode === 1 ? "applied" : "not-applied"}
            onClick={handleMode}
          >
            중첩 1단계
          </Button>

          <Button
            data-value={0}
            className={funcOn && mode === 0 ? "applied" : "not-applied"}
            onClick={handleMode}
          >
            원본
          </Button>
          <Button
            className={funcOn && focusOn ? "applied" : "not-applied"}
            onClick={handleFocusOnOff}
          >
            선택된 단계만 보기
          </Button>
        </LevelControl>
      </Draggable>
      <Draggable handle="strong" bounds="body">
        <HistogramWrapper className="box no-cursor">
          <strong>
            <div className="title">요약 히스토그램</div>
          </strong>
          <Histogram data={text} focusWord={focusWord} />
        </HistogramWrapper>
      </Draggable>
      <Draggable bounds="body">
        <Control className="box">
          <div className="title">텍스트 요약</div>
          <Button className="not-applied" onClick={handleBack}>
            다시하기
          </Button>
        </Control>
      </Draggable>
    </Wrapper>
  );
});

export default Result;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Word from "../Components/Word";
import Timer from "../Components/Timer";
import { exit, news, avengers } from "../data";

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 3rem;
  width: 100%;
  min-height: 80vh;
  padding: 0 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  line-height: 2rem;
`;

const Text = styled.div`
  width: 50%;
  height: calc(100vh - 6rem - 10px);
  overflow: scroll;
  user-select: none;
  padding: 2rem;
  /* &::-webkit-scrollbar {
    display: none;
  } */
`;

const TextAreaWrapper = styled.div`
  width: 50%;
  height: calc(100vh - 6rem - 10px);
  padding: 2rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: calc(100% - 50px);
  padding: 2rem;
  font-size: 0.8rem;
  font-family: "Nanum Myeongjo", serif;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Button = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.9rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  user-select: none;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const Create = () => {
  const data = exit;
  const [text, setText] = useState([]);
  const [shouldStart, setShouldStart] = useState(false);

  useEffect(() => {
    // init
    let idx = 0;
    const newText = data[idx].split(/\s/g).map((item, idx) => [item, 0]);
    setText(newText);
  }, [data]);

  const startProcess = () => {
    setShouldStart(true);
  };
  const stopProcess = () => {
    setShouldStart(false);
  };

  return (
    <Wrapper>
      <Text>
        {text.map((item, idx) => {
          if (item[0] === "<br/>") {
            return <br key={idx} id={idx} className="word" />;
          } else {
            return <Word key={idx} id={idx} text={item[0]} score={item[1]} />;
          }
        })}
      </Text>
      <TextAreaWrapper>
        <TextArea disabled={!shouldStart}></TextArea>
        <Button onClick={stopProcess}>저장하고 끝내기</Button>
      </TextAreaWrapper>
      <Timer startProcess={startProcess} shouldStart={shouldStart} />
    </Wrapper>
  );
};

export default Create;

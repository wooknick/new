import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 150px;
  height: 40px;
  position: fixed;
  top: 10px;
  right: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 2px solid black;
  margin-right: 2rem;
  background-color: white;
  z-index: 10;
`;

const Time = styled.div`
  user-select: none;
`;

const Button = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

const Timer = ({ startProcess, shouldStart }) => {
  const [start, setStart] = useState(false);
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");
  const s = useRef();
  const time = useRef();

  const handleTimer = () => {
    if (!start) {
      time.current = 0;
      setStart(true);
      startProcess();
    }
  };

  useEffect(() => {
    if (start) {
      s.current = setInterval(() => {
        time.current = time.current + 1;
        setMinute(`${Math.floor(time.current / 60)}`.padStart(2, 0));
        setSecond(`${time.current % 60}`.padStart(2, 0));
      }, 1000);
    }
  }, [start]);

  useEffect(() => {
    if (!shouldStart) {
      clearInterval(s.current);
    }
  }, [shouldStart]);

  return (
    <Wrapper onClick={handleTimer}>
      {start ? (
        <Time>
          {minute}:{second}
        </Time>
      ) : (
        <Button>시작하기</Button>
      )}
    </Wrapper>
  );
};

export default Timer;

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { sonagi } from "../data";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100vw;
  max-width: 480px;
  height: 80vh;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 2rem;
`;

const First = () => {
  const [text, setText] = useState("");
  const data = sonagi;
  const target = useRef();
  useEffect(() => {
    let idx = 0;
    setText(data[idx++ % data.length]);
  }, [data]);
  useEffect(() => {
    target.current.innerHTML = text;
  }, [text]);
  return <Wrapper ref={target}></Wrapper>;
};

export default First;

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
  useEffect(()=>{
    document.addEventListener("selectstart", ()=>{
      if(window.getSelection().toString() !== ""){
        console.log(window.getSelection().toString());
        const highlighting = document.createElement('span');
        highlighting.classList.add("highlight");
        try{
          window.getSelection().getRangeAt(0).surroundContents(highlighting);
          console.log(window.getSelection().getRangeAt(0))
        }catch(e){
          console.log(e);
          console.log(window.getSelection().getRangeAt(0))
        }
      }
    })

    return ()=>{
      window.removeEventListener("mouseup", {});
    }
  }, []);
  return <Wrapper >
    <span ref={target}></span>
  </Wrapper>;
};

export default First;

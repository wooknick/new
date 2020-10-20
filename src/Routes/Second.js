import React, { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { sonagi } from "../data";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100vw;
  max-width: 480px;
  height: 80vh;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 2rem;
`;

const Second = () => {
  const [text, setText] = useState([]);
  const [clicked, setClicked] = useState(false);
  const data = sonagi;
  const target = useRef();
  const consoleRef = useRef();

  useEffect(() => {
    let idx = 0;
    const newText = data[idx].split(/\s/g).map((item, idx) => [item, 0]);
    console.log(newText);
    setText(newText);
  }, [data]);

  useEffect(() => {
    console.log(text);
  }, [text])

  useEffect(() => {
    window.addEventListener("mousedown", () => {
      setClicked(true);
    })
    return () => {
      window.removeEventListener("mousedown");
    }
  }, [])

  useEffect(() => {
    window.addEventListener("mouseup", () => {
      setClicked(false);
    })
    return () => {
      window.removeEventListener("mouseup");
    }
  }, [])

  // useEffect(() => {
  //   window.addEventListener("touchmove", (e) => {
  //     console.log(e.target.innerText);
  //     e.target.classList.add("highlight");
  //   })
  //   return () => {
  //     window.removeEventListener("touchmove");
  //   }
  // }, [])

  const handleOnClick = (e) => {
    e.target.classList.add("highlight");
  };

  const handleOnMouseEnter = (e) => {
    if (clicked) {
      console.log(e.target.innerText);
      e.target.classList.add("highlight");
    }
  }

  const handleTouch = (e) => {
    console.log(e.target.innerText);
    // consoleRef.current.innerHTML = e.target.innerText;
    e.target.classList.add("highlight");
    console.log(e);
    console.log(e.touches[0].clientX, e.touches[0].clientY);
    const pointer = document.createElement("div");
    pointer.classList.add("pointer");
    target.current.appendChild(pointer);
  }

  return <Wrapper >
    <div ref={consoleRef}></div>
    <span ref={target} >
      {text.map((item, idx) => {
        if (item[0] === "<br/>") {
          return <br key={idx} />;
        } else {
          return <React.Fragment key={idx}><span onMouseDown={handleOnClick} onClick={handleOnClick} onTouchStart={handleTouch} onMouseEnter={handleOnMouseEnter} className="word" id={idx} key={idx}>{item[0]} </span></React.Fragment>
        }
      })}
    </span>
  </Wrapper>;
};

export default Second;

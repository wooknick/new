import React, { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Selection from "@simonwep/selection-js";
import { sonagi } from "../data";
import Word from "../Components/Word";

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

const DepthInfo = styled.div`
  width: 480px;
  height: 200px;
  border: 1px solid grey;
  margin-top: 50px;
`;

const Fourth = () => {
  const [text, setText] = useState([]);
  const [reverseSelect, setReverseSelect] = useState(false);
  const data = sonagi;
  const target = useRef();
  const consoleRef = useRef();
  const isTouchMoving = useRef();
  const selectionRef = useRef();

  useEffect(() => {
    console.log(text);
  }, [text]);
  useEffect(() => {
    // init
    let idx = 0;
    const newText = data[idx].split(/\s/g).map((item, idx) => [item, 0]);
    setText(newText);
    isTouchMoving.current = false;
  }, [data]);

  selectionRef.current = new Selection({
    class: "select-area",
    frame: document,
    startThreshold: 5,
    disableTouch: false,
    mode: "touch",
    tapMode: "native",
    singleClick: false,
    selectables: ["span.word"],
    startareas: ["html"],
    boundaries: ["div.text-area"],
    selectionAreaContainer: "body",
    scrollSpeedDivider: 10,
    manualScrollSpeed: 750,
  });

  selectionRef.current
    .on("beforestart", (evt) => {})
    .on("start", (evt) => {
      const {
        changed: { added },
      } = evt;
      for (const el of added) {
        el.classList.add("highlight");
      }
    })
    .on("move", (evt) => {
      const {
        changed: { removed, added },
      } = evt;
      const selected = selectionRef.current.getSelection();
      for (const el of added) {
        el.classList.add("highlight");
      }
      for (const el of removed) {
        if (!selected.includes(el)) {
          el.classList.remove("highlight");
        }
      }
    })
    .on("stop", (evt) => {
      const { selected } = evt;
      for (const el of selected) {
        const nextText = text;
        if (nextText[el.id]) {
          nextText[el.id][1]++;
          setText(nextText);
        }
      }
      selectionRef.current.keepSelection();
      isTouchMoving.current = true;
    });

  return (
    <Wrapper>
      <div ref={consoleRef}></div>
      <div ref={target} className="text-area">
        {text.map((item, idx) => {
          if (item[0] === "<br/>") {
            return <br key={idx} />;
          } else {
            return (
              <Word
                key={idx}
                id={idx}
                data={text}
                isTouchMoving={isTouchMoving}
                selection={selectionRef.current}
              />
            );
          }
        })}
      </div>
      <DepthInfo>
        <span></span>
      </DepthInfo>
    </Wrapper>
  );
};

export default Fourth;

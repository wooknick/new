import React, { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Selection from "@simonwep/selection-js"
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

const Third = () => {
  const [text, setText] = useState([]);
  const [reverseSelect, setReverseSelect] = useState(false);
  const data = sonagi;
  const target = useRef();
  const consoleRef = useRef();
  const isTouchMoving = useRef();

  useEffect(() => {
    // init
    let idx = 0;
    const newText = data[idx].split(/\s/g).map((item, idx) => [item, 0]);
    setText(newText);
    isTouchMoving.current = false;
  }, [data]);

  const selection = new Selection({
    class: 'select-area',
    frame: document,
    startThreshold: 5,
    disableTouch: false,
    mode: 'touch',
    tapMode: 'native',
    singleClick: false,
    selectables: ["span.word"],
    startareas: ['html'],
    boundaries: ['div.text-area'],
    selectionAreaContainer: 'body',
    scrollSpeedDivider: 10,
    manualScrollSpeed: 750
  });

  selection.on('beforestart', evt => {
  }).on('start', evt => {
    const { changed: { added } } = evt;
    for (const el of added) {
      el.classList.add("highlight");
    }
  }).on('move', evt => {
    const { changed: { removed, added } } = evt;
    const selected = selection.getSelection();
    for (const el of added) {
      el.classList.add("highlight");
    }
    for (const el of removed) {
      if (!selected.includes(el)) {
        el.classList.remove("highlight");
      }
    }
  }).on('stop', evt => {
    selection.keepSelection();
    isTouchMoving.current = true;
  });

  const handleTouch = (e) => {
    console.log("2");
    console.log(isTouchMoving.current);
    if (!isTouchMoving.current) {
      const selected = selection.getSelection();
      if (selected.includes(e.target)) {
        selection.removeFromSelection(e.target);
        e.target.classList.remove("highlight");
      } else {
        selection.select(e.target);
        selection.keepSelection();
        e.target.classList.add("highlight");
      }
    }
    isTouchMoving.current = false;
  }

  const handleClick = (e) => {
    console.log("click");
    const selected = selection.getSelection();
    console.log(selected);
    if (selected.includes(e.target)) {
      selection.removeFromSelection(e.target);
      e.target.classList.remove("highlight");
    } else {
      selection.select(e.target);
      selection.keepSelection();
      e.target.classList.add("highlight");
    }
  }

  return <Wrapper >
    <div ref={consoleRef}></div>
    <div ref={target} className="text-area">
      {text.map((item, idx) => {
        if (item[0] === "<br/>") {
          return <br key={idx} />;
        } else {
          return <React.Fragment key={idx}><span onTouchEnd={handleTouch} onClick={handleClick} className="word" id={idx} key={idx}>{item[0]} </span></React.Fragment>
        }
      })}
    </div>
  </Wrapper>;
};

export default Third;

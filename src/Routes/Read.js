import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Selection from "@simonwep/selection-js";
import { sonagi, news } from "../data";
import Word from "../Components/Word";
import Draggable from "react-draggable";

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
  height: 300px;
  border: 1px solid #d6d6d6;
  background-color: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 100px;
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
`;

const MiniButtonWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const MiniButton = styled.div`
  width: 47%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.9rem;
  &:hover {
    cursor: pointer;
  }
`;

const DUMMY_TEXT = `[["미국",0],["대통령",0],["선거",0],["결과",0],["민주당",1],["조",2],["바이든",2],["후보의",2],["당선이",2],["유력하다.",2],["미",0],["언론들에",0],["따르면",0],["5일",0],["오전(현지시간)",0],["현재",0],["바이든은",1],["264명의",1],["선거인단",1],["대의원을",1],["확보,",1],["당선에",1],["필요한",1],["270명을",1],["채우는",1],["데는",1],["문제가",1],["없을",1],["것으로",1],["예상됐다.",0],["이로써",0],["지난",0],["4년간",0],["세계를",0],["곤혹스럽게",0],["한",0],["도널드",0],["트럼프",0],["대통령의",0],["일방적인",0],["국정",0],["운영은",0],["퇴장하게",0],["됐다.",0],["바이든은",0],["선거",0],["과정에서",0],["트럼프의",0],["미국",0],["우선주의,",0],["반세계화,",0],["보호무역,",0],["반이민",0],["등과",0],["결별하고",0],["자유주의",0],["국제질서",0],["회복에",0],["나서겠다고",0],["공약했다.",0],["국제사회의",0],["희망대로",0],["바이든이",0],["미국을",0],["정상화하기를",0],["기대한다.",0],["<br/>",0],["바이든",1],["후보의",1],["첫",1],["번째",1],["과제는",1],["트럼프",1],["대외정책의",1],["전환이다.",1],["핵심은",1],["‘미국",2],["우선주의’를",2],["종식시키는",2],["것이다.",1],["바이든과",0],["민주당은",0],["트럼프가",0],["훼손한",0],["동맹관계를",0],["재건해",0],["미국의",0],["영향력을",0],["강화하는",0],["방향의",0],["다자주의를",0],["강조한",0],["바",0],["있다.",0],["세계보건기구(WHO),",0],["유엔",0],["인권위원회,",0],["파리기후변화협정",0],["등",0],["트럼프가",0],["탈퇴한",0],["국제기구와",0],["협정",0],["복귀도",0],["천명했다.",0],["바이든은",0],["지난",0],["4일",0],["“취임",0],["전까지",0],["파리협정에",0],["다시",0],["가입하겠다”고",0],["밝혔다.",0],["파리협정",1],["재가입은",1],["기후변화",2],["및",2],["환경",2],["중시",2],["정책을",2],["펼치겠다는",1],["메시지이다.",1],["트럼프",0],["정부의",0],["과오를",0],["되돌린다는",0],["점에서",0],["다행스럽다.",0],["바이든은",0],["2050년까지",0],["100%",0],["청정에너지",0],["전환과",0],["온실가스",0],["감축",0],["목표를",0],["높이는",0],["등",0],["기후변화",0],["및",0],["환경",0],["정책에",0],["큰",0],["변화를",0],["예고했다.",0],["지구촌",0],["최대",0],["과제인",0],["환경",0],["문제",0],["해결에",0],["지도국가로서",0],["앞장서야",0],["한다.",0],["<br/>",0],["경제·통상",1],["정책에서는",1],["보호무역주의",2],["장벽을",2],["낮추는",2],["것이",1],["과제다.",1],["물론",0],["바이든",0],["시대에도",0],["자국",0],["우선주의",0],["기조는",0],["크게",0],["달라지지",0],["않아",0],["보호무역주의가",0],["지속될",0],["가능성이",0],["없지",0],["않다.",0],["하지만",0],["무역자유·개방경제를",0],["강화하겠다는",0],["약속은",0],["지켜야",0],["한다.",0],["“중국에",0],["대한",0],["접근은",0],["미국의",0],["국익에",0],["따를",0],["것”이라고",0],["밝혀",0],["대중",1],["강경",1],["노선은",1],["그대로",1],["유지될",0],["것으로",0],["전망된다.",0],["<br/>",0],["바이든은",0],["그동안",0],["주한미군",1],["철수와",1],["과도한",1],["방위비를",1],["부담시키는",1],["것에",1],["반대하는",1],["입장을",1],["보였다.",1],["방위비분담금",0],["협상",0],["등에서",0],["한·미동맹을",0],["존중하겠다는",0],["약속에",0],["기대를",0],["건다.",0],["특히",0],["방위비분담금",0],["협상을",0],["주한미군",0],["철수와",0],["연계하지",0],["않겠다는",0],["약속은",0],["반드시",0],["지켜야",0],["한다.",0],["대북정책,",0],["특히",0],["북한의",1],["비핵화",1],["협상은",1],["재조정이",1],["불가피해",1],["보인다.",0],["바이든은",0],["그동안",0],["여러",0],["차례",0],["트럼프의",0],["톱다운",0],["방식을",0],["폐기하고",0],["실무협상을",0],["통한",0],["원칙적",0],["접근을",0],["강조했다.",0],["하지만",0],["이런",0],["변화가",0],["북핵",0],["문제",0],["해결을",0],["뒤로",0],["미루는",0],["데로",0],["이어져서는",0],["안",0],["된다.",0],["버락",0],["오바마",0],["행정부의",0],["2인자였던",0],["바이든",0],["후보가",0],["당시처럼",0],["‘전략적",0],["인내’",0],["정책으로",0],["후퇴해서는",0],["안",0],["된다는",0],["말이다.",0],["그때와",0],["달리",0],["북한이",0],["핵을",0],["보유하고",0],["미",0],["본토까지",0],["도달할",0],["수",0],["있는",0],["기술을",0],["보유하고",0],["있음을",0],["인정해야",0],["한다.",0],["우려스러운",0],["것은",0],["미·중",0],["갈등에",0],["따른",0],["압박이다.",0],["바이든은",0],["동맹과",1],["유대",1],["강화를",1],["통해",1],["중국을",2],["견제한다는",2],["전략을",1],["세워놓고",0],["있다.",0],["대중",0],["포위망에",0],["한국을",0],["편입시키려고",0],["해서는",0],["안",0],["된다.",0],["<br/>",0],["청와대는",0],["5일",0],["국가안전보장회의(NSC)",0],["상임위원회를",0],["열어",0],["“한·미동맹을",0],["바탕으로",0],["한반도",0],["평화프로세스",0],["진전을",0],["위한",0],["노력에",0],["빈틈이",0],["없도록",0],["하겠다”고",0],["밝혔다.",0],["대선",0],["국면이",0],["정리되지",0],["않은",0],["미국의",0],["불확실성에",0],["적절히",0],["대응하면서",0],["새",0],["정부와",0],["협력을",0],["모색해야",0],["한다.",0],["트럼프",1],["때와",1],["다르게",1],["남북관계",1],["진전과",1],["한·미동맹의",1],["균형을",1],["맞추는",1],["데도",1],["더욱",0],["유의할",0],["필요가",0],["있다.",0]]`;

const Third = () => {
  const data = news;
  const [text, setText] = useState([]);
  const [mainScore, setMainScore] = useState(0);
  const [funcOn, setFuncOn] = useState(true);
  const [focusOn, setFocusOn] = useState(false);
  const [mode, setMode] = useState(-1); // 보여줄 score를 의미. -1일 경우는 아직 사용 안함
  const [tMode, setTMode] = useState(-1);
  const target = useRef();
  const selection = useRef();
  const MAX_SCORE = 3;

  useEffect(() => {
    // init
    const fetchText = localStorage.getItem("prehighlight");
    let preHighlight;
    if (fetchText) {
      preHighlight = JSON.parse(fetchText);
    } else {
      preHighlight = JSON.parse(DUMMY_TEXT);
    }
    // let idx = 0;
    // const newText = data[idx].split(/\s/g).map((item, idx) => {
    //   if (preHighlight.includes(idx)) {
    //     return [item, 1, true];
    //   } else {
    //     return [item, 0, true];
    //   }
    // });
    setText(preHighlight.map((item) => [...item, 0]));
  }, [data]);

  // useEffect(() => {
  //   if (selection.current) {
  //     selection.current.clearSelection();
  //     const selected = document.querySelectorAll(
  //       `.word[data-score='${mainScore}']`
  //     );
  //     selection.current.select([...selected]);
  //     selection.current.keepSelection();
  //   }
  // }, [mainScore]);

  useEffect(() => {
    selection.current = new Selection({
      class: "select-area",
      frame: document,
      startThreshold: 5,
      disableTouch: false,
      mode: "touch",
      tapMode: "native",
      singleClick: true,
      selectables: ["span.word"],
      startareas: ["html"],
      boundaries: ["div.text-area"],
      selectionAreaContainer: "body",
      scrollSpeedDivider: 10,
      manualScrollSpeed: 750,
    });
  }, []);

  useEffect(() => {
    const handleBeforeStart = ({ inst, oe: { target } }) => {
      if (target.dataset["score"] !== undefined) {
        setMainScore(Number(target.dataset["score"]));
      }
    };
    const handleStart = ({ inst }) => {
      inst.clearSelection();
    };
    const handleMove = ({ changed: { removed, added } }) => {
      // for (const el of added) {
      //   el.classList.add("highlight");
      // }
      // for (const el of removed) {
      //   el.classList.remove("highlight");
      // }
    };
    const handleStop = (evt) => {
      if (!funcOn) {
        return;
      }
      const { selected } = evt;
      const nextText = text;
      for (const el of selected) {
        const elScore = Number(el.dataset.score);
        const elShowLevel = Number(el.dataset.showlevel);
        if (elShowLevel < MAX_SCORE && elScore !== 0) {
          nextText[el.id][2] = elShowLevel + 1;
        }
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
  }, [funcOn, text]);

  const handleMode = (e) => {
    if (funcOn) {
      const eMode = Number(e.target.dataset.value);
      if (eMode === mode) {
        setMode(-1);
      } else {
        setMode(eMode);
      }
    }
  };

  const handleFuncOnOff = (e) => {
    if (funcOn) {
      setTMode(mode);
      setMode(-1);
    } else {
      setMode(tMode);
    }
    setFuncOn((v) => !v);
  };

  const handleFocusOnOff = (e) => {
    if (funcOn) {
      setFocusOn((v) => !v);
    }
  };

  const getDummyText = () => {
    localStorage.setItem("prehighlight", DUMMY_TEXT);
    const preHighlight = JSON.parse(DUMMY_TEXT);
    setText(preHighlight.map((item) => [...item, 0]));
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
                  showLevel={mode > -1 ? mode : item[2] * funcOn}
                  focusOn={focusOn}
                />
              );
            }
          })}
        </div>
      </div>
      <Draggable bounds="body">
        <Control className="box">
          <div className="title" onDoubleClick={getDummyText}>
            하이라이트
          </div>
          <Button
            className={funcOn ? "applied" : "not-applied"}
            onClick={handleFuncOnOff}
          >
            {funcOn ? "ON" : "OFF"}
          </Button>
          <MiniButtonWrapper>
            <MiniButton
              data-value={0}
              className={funcOn && mode === 0 ? "applied" : "not-applied"}
              onClick={handleMode}
            >
              기본
            </MiniButton>
            <MiniButton
              data-value={1}
              className={funcOn && mode === 1 ? "applied" : "not-applied"}
              onClick={handleMode}
            >
              ★
            </MiniButton>
            <MiniButton
              data-value={2}
              className={funcOn && mode === 2 ? "applied" : "not-applied"}
              onClick={handleMode}
            >
              ★★
            </MiniButton>
            <MiniButton
              data-value={3}
              className={funcOn && mode === 3 ? "applied" : "not-applied"}
              onClick={handleMode}
            >
              ★★★
            </MiniButton>
          </MiniButtonWrapper>
          <Button
            className={funcOn && focusOn ? "applied" : "not-applied"}
            onClick={handleFocusOnOff}
          >
            하이라이트만 보기
          </Button>
          {/* <Histogram data={text} /> */}
        </Control>
      </Draggable>
    </Wrapper>
  );
};

export default Third;

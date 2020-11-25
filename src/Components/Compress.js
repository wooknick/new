import React, { useState } from "react";
import styled from "styled-components";
import { Resizable } from "re-resizable";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0px 4px;
`;

const Title = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: move;
  }
`;

const Gauges = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: space-around;
  hr {
    margin: 0;
  }
`;

const GaugeTitle = styled.div`
  width: 100%;
  height: 50px;
  padding-bottom: 20px;
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GaugePercent = styled.div`
  position: relative;
  top: -30px;
`;

const Usage = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const UsageGraph = styled.div`
  width: 50px;
  height: ${(props) => props.data * 4}px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.bgColor[props.score]};
  transition: height 1s linear;
  ${(props) =>
    props.over &&
    "border: 1px solid rgb(255, 113, 94); width: 52px; color: rgb(255, 113, 94);"};
`;

const Target = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Compress = ({ data }) => {
  const [targetCompress, setTagetCompress] = useState(30);
  const [visibleTargetCompress, setVisibleTargetCompress] = useState(30);
  const [targetCompressDelta, setTargetCompressDelta] = useState(0);

  const targetStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 92, 67, 1)",
    fontSize: "0.8rem",
  };

  const resiszeStopHandle = (_, __, ___, delta) => {
    setTagetCompress(targetCompress + delta.height / 4);
  };
  const resiszeHandle = (_, __, ___, delta) => {
    if (delta.height / 4 !== targetCompressDelta) {
      setTargetCompressDelta(delta.height / 4);
      setVisibleTargetCompress(targetCompress + delta.height / 4);
    }
  };
  return (
    <Wrapper>
      <strong>
        <Title className="cursor">요약률</Title>
      </strong>
      <Gauges>
        <Usage>
          <GaugeTitle>현재</GaugeTitle>
          <UsageGraph data={data[0]} score={1} over={data[0] > targetCompress}>
            <GaugePercent>{data[0]}%</GaugePercent>
          </UsageGraph>
          <UsageGraph data={data[1]} score={2}></UsageGraph>
          <UsageGraph data={data[2]} score={3}></UsageGraph>
        </Usage>
        <hr />
        <Target>
          <GaugeTitle>목표</GaugeTitle>
          <Resizable
            style={targetStyle}
            defaultSize={{ width: 50, height: 120 }}
            enable={{
              top: true,
              right: false,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
            minHeight={40}
            maxHeight={360}
            snap={{ y: [40, 80, 120, 160, 200, 240, 280, 320, 360, 400] }}
            onResizeStop={resiszeStopHandle}
            onResize={resiszeHandle}
          >
            <GaugePercent>{visibleTargetCompress}%</GaugePercent>
          </Resizable>
        </Target>
      </Gauges>
    </Wrapper>
  );
};

export default Compress;

import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  max-width: 480px;
  height: 80px;
  padding: 0 2rem;
  margin-top: 10px;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #d6d6d6;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Bar = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: ${(props) => props.theme.bgColor[props.bgColorScore]};
  &:hover {
    border: 1px solid red;
  }
`;

const Histogram = ({ data, focusWord }) => {
  const [useData, setUseData] = useState([]);
  useEffect(() => {
    if (data.length > 0) {
      setUseData([...data.filter((item) => item[0] !== "<br/>")]);
    }
  }, [data]);

  const bgColor = [
    "rgba(254, 255, 224, 1)",
    "rgba(254, 255, 224, 1)",
    "rgba(253, 255, 178, 1)",
    "rgba(250, 255, 110, 1)",
  ];

  const onClickHandle = (e) => {
    const idx = e.target.dataset.idx;
    focusWord(idx);
  };

  return (
    <Wrapper>
      <Contents>
        {data.length > 0 &&
          useData.map((item, idx) => (
            <Bar
              key={idx}
              data-idx={idx}
              height={item[1] * 20 + 5}
              width={data.length / useData.length}
              bgColorScore={item[1] === 0 ? 1 : item[1]}
              onClick={onClickHandle}
            />
          ))}
      </Contents>
    </Wrapper>
  );
};

export default Histogram;

import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";

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
  border: 1px solid grey;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Bar = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: #b3c5ba;
`;

const Histogram = ({ data }) => {
  const [useData, setUseData] = useState([]);
  useEffect(() => {
    if (data.length > 0) {
      setUseData([...data.filter((item) => item[0] !== "<br/>")]);
    }
  }, [data]);

  return (
    <Wrapper>
      <Contents>
        {data.length > 0 &&
          useData.map((item, idx) => (
            <Bar
              key={idx}
              height={item[1] * 20 + 5}
              width={380 / useData.length}
            />
          ))}
      </Contents>
    </Wrapper>
  );
};

export default Histogram;

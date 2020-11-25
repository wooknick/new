import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

const Home = () => {
  return <Wrapper>사용하지 않는 주소입니다</Wrapper>;
};

export default Home;

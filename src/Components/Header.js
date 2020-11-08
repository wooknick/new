import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Header = styled.header`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #d6d6d6;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
    display: flex;
    justify-content: center;
  }
  &:nth-child(2) {
    min-width: 300px;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const Span = styled.span`
  font-size: 1.1em;
  &:hover {
    cursor: pointer;
  }
`;

export default withRouter(({ history }) => {
  const whereAmI = history.location.pathname;
  const toggleMenu = () => {
    if (whereAmI === "/read") {
      history.push("/create");
    } else {
      history.push("/read");
    }
  };
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn></HeaderColumn>
        <HeaderColumn>
          하이라이트{" "}
          <Span onClick={toggleMenu}>
            {whereAmI === "/read" ? "리딩" : "생성"}
          </Span>{" "}
          프로토타입
        </HeaderColumn>
        <HeaderColumn></HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});

import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Header = styled.header`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #808080;
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

export default withRouter(({ history }) => {
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn></HeaderColumn>
        <HeaderColumn>New Digital Book</HeaderColumn>
        <HeaderColumn></HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});

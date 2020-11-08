import React, { useState } from "react";
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
  &:last-of-type {
    display: flex;
    justify-content: flex-end;
    padding-right: 2em;
    div {
      &:hover {
        cursor: pointer;
      }
    }
  }
  &:first-child {
    margin-right: auto;
    text-align: left;
    display: flex;
    justify-content: center;
  }
`;

const Span = styled.span`
  font-size: 1.1em;
  &:hover {
    cursor: pointer;
  }
`;

const PopUp = styled.div`
  width: 600px;
  height: 320px;
  position: fixed;
  top: 4rem;
  right: 2rem;
  border: 1px solid #d8d8d8;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.7rem;
  line-height: 180%;
  padding-left: 1rem;
  box-shadow: 5px 5px 10px #e6e6e6, -5px -5px 10px #ffffff;
`;

export default withRouter(({ history }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  const whereAmI = history.location.pathname;
  const toggleMenu = () => {
    if (whereAmI === "/read") {
      history.push("/create");
    } else {
      history.push("/read");
    }
  };

  const popupToggle = () => {
    setPopupOpen((v) => !v);
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
        <HeaderColumn>
          {whereAmI !== "/read" && <div onClick={popupToggle}>사용법</div>}
        </HeaderColumn>
      </HeaderWrapper>
      {whereAmI !== "/read" && popupOpen && (
        <PopUp>
          <div>[ 기본 사용법 ]</div>
          <div>0. 하이라이트는 어절 단위로 구분됩니다.</div>
          <div>
            1. 키보드와 마우스 조작을 통해 하이라이트를 추가 및 삭제할 수
            있습니다.
          </div>
          <div>
            2. 이미 하이라이트 된 텍스트에서 드래그를 시작하면 하이라이트가
            중첩됩니다.
          </div>
          <div>3. 하이라이트 중첩은 최대 세 번까지 가능합니다.</div>
          <div>
            4. 드래그를 시작한 텍스트와 같은 중첩단계의 텍스트들만 범위에
            포함시킬 수 있습니다.
          </div>
          <br />
          <div>[ 조작법 ]</div>
          <div>컨트롤 키(커맨드) + 드래그 : 하이라이트 추가</div>
          <div>알트(옵션) + 드래그 : 하이라이트 삭제</div>
        </PopUp>
      )}
    </Header>
  );
});

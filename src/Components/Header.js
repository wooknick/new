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
  z-index: 10;
  div.exit {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 10px;
    border-right: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    &:hover {
      cursor: pointer;
    }
  }
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
          텍스트 요약{" "}
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
          <div>[ 효율적인 요약을 위한 기본 사용법 ]</div>
          <div>0. 본 시스템의 기본 단위는 어절 단위입니다.</div>
          <div>
            1. 중요하다고 생각되는 내용을 선택하세요. <br />
            선택된 내용은 자동으로 하이라이트가 적용됩니다.
          </div>
          <div>
            2. 더 중요하다고 생각되는 내용은 한 번 더 선택하세요. 하이라이트가
            중첩되어 더욱 강하게 나타납니다. 중첩은 최대 세 번 까지 가능합니다.
          </div>
          <div>
            3. 원본을 얼만큼 압축하고 싶나요? 목표 게이지를 직접 드래그하여
            목표를 설정하세요.
          </div>
          <div>4. 중요하다고 생각되는 내용을 선택하여 요약을 진행하세요.</div>
          <br />
          <div>[ 조작법 ]</div>
          <div>컨트롤 키 + 드래그 : 하이라이트 추가</div>
          <div>알트 + 드래그 : 하이라이트 삭제</div>
          <div className="exit" onClick={popupToggle}>
            X
          </div>
        </PopUp>
      )}
    </Header>
  );
});

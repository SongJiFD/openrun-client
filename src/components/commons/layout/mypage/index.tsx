import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { BG_GRADATION } from "../../../../commons/cssConst";
import { userInfoValue } from "../../store";
import * as s from "./mypage.styles";
export default function LayoutMyPage() {
  const tabs = ["MY", "내가 쓴 글", "찜목록", "포인트 정산 ", "포인트 충전"];
  const address = [
    "/myPage/",
    "/myPage/writtenBoards/",
    "/myPage/favoriteList/",
    "/myPage/settlementList/",
    "/myPage/paymentPoint/",
  ];
  const router = useRouter();
  const [userInfo] = useRecoilState(userInfoValue);
  const [color, setColor] = useState(Array(tabs.length).fill(false));
  const [isClick, setIsClick] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onClickMoveToPageWithColor = (event: string, index: number) => () => {
    setIsClick(true);
    router.push(event);
    const allFalse = Array(7).fill(false);
    setColor(allFalse);
    allFalse[index] = true;
    setColor(allFalse);
  };

  const onClickMoveToPage = (event: string) => () => {
    router.push(event);
  };

  return (
    <s.Wrapper>
      <s.ProfileWrapper>
        <s.ProfileUser>
          {userInfo?.profileImg ? (
            <s.ProfileImg
              src={`https://storage.googleapis.com/openrun-sub/${userInfo?.profileImg}`}
            />
          ) : (
            <s.ProfileImg
              src={`https://storage.googleapis.com/openrun-sub/profile/2022-09-21/54776adb-634b-43da-8b90-ebe9ef19c6e8/origin/Smile-Emoticon-Transparent-PNG.png`}
            />
          )}

          <s.ProfileDetail width="70%">
            <s.Text size="1.5rem" color="#333" weight="400">
              안녕하세요 {userInfo?.nickName}님
            </s.Text>
            <s.UserInfoEdit onClick={onClickMoveToPage(`/myPage/editAccount`)}>
              내정보 수정
            </s.UserInfoEdit>
          </s.ProfileDetail>
        </s.ProfileUser>

        <s.UserDetail>
          <s.userInfoNumbers>
            <s.Text size="1.5rem" color="#333" weight="700">
              {userInfo?.boardTotal}
            </s.Text>
            <s.Text size="0.7rem" color="#333" weight="400">
              작성한 게시글
            </s.Text>
          </s.userInfoNumbers>
          <s.DivideLine />

          <s.DivideLine />
          <s.userInfoNumbers>
            <s.Text size="1.5rem" color="#333" weight="700">
              {userInfo?.point}
            </s.Text>
            <s.Text size="0.7rem" color="#333" weight="400">
              포인트
            </s.Text>
          </s.userInfoNumbers>
        </s.UserDetail>
      </s.ProfileWrapper>

      <s.MenuWrapper>
        <s.Menus>
          {isClick
            ? tabs.map((el, index) => (
                <s.Menu
                  onClick={onClickMoveToPageWithColor(address[index], index)}
                  color={color[index] ? "transparent" : "#333"}
                  bg={color[index] ? BG_GRADATION : "none"}
                  weight={color[index] ? "700" : "400"}
                >
                  {el}
                </s.Menu>
              ))
            : tabs.map((el, index) => (
                <s.Menu
                  onClick={onClickMoveToPageWithColor(address[index], index)}
                  color={
                    router.asPath === address[index] ? "transparent" : "#333"
                  }
                  bg={router.asPath === address[index] ? BG_GRADATION : "none"}
                  weight={router.asPath === address[index] ? "700" : "400"}
                >
                  {el}
                </s.Menu>
              ))}
        </s.Menus>
      </s.MenuWrapper>
      <s.DivideLineHorizontal color="#656565" />
    </s.Wrapper>
  );
}

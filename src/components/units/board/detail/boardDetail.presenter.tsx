import * as s from "./boardDetail.styles";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Map from "../../../../commons/maps-detail/map.container";
import Dompurify from "dompurify";
import { AiOutlineCheckCircle } from "react-icons/ai";
import LiveChat from "../../../../commons/liveChat/liveChat.container";
import Timer from "../../../../commons/timer";
import { AiOutlineClockCircle, AiOutlineEllipsis } from "react-icons/ai";
import { BsChatFill, BsChat } from "react-icons/bs";
import { BoardDetailUIProps } from "./boardDetail.types";

const theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        textColorPrimary: {
          color: "#555",
          "&.Mui-selected": {
            fontWeight: "800",
            fontSize: "1.125rem",
          },
        },
      },
    },
  },
});

export default function BoardDetailUI(props: BoardDetailUIProps) {
  // tabs 설정
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <s.Wrapper>
      <s.ProductWrapper>
        <s.ImgWrapper>
          <s.ImageWrapper>
            <s.Image
              src={
                props.data?.fetchBoard?.image
                  ? `https://storage.googleapis.com/openrun-sub/${props.data?.fetchBoard?.image}`
                  : "/boardList/default.jpeg"
              }
            />
          </s.ImageWrapper>
          <s.TimerWrapper>
            <Timer />
            <s.Triangle />
            <s.InfoText>
              <AiOutlineClockCircle />
              <s.Text>줄서기까지 남은 시간을 확인하세요!</s.Text>
            </s.InfoText>
          </s.TimerWrapper>
        </s.ImgWrapper>
        <s.ProductInfoWrapper>
          <s.StatusWrapper>
            {props.data?.fetchBoard?.status === "모집중" && (
              <s.Status1>{props.data?.fetchBoard?.status}</s.Status1>
            )}
            {props.data?.fetchBoard?.status === "진행중" && (
              <s.Status2>{props.data?.fetchBoard?.status}</s.Status2>
            )}
            {props.data?.fetchBoard?.status === "거래완료" && (
              <s.Status3>{props.data?.fetchBoard?.status}</s.Status3>
            )}
            <s.MutationBtns>
              <AiOutlineEllipsis
                size={30}
                onClick={props.boardOpenCloseModal}
                style={{ cursor: "pointer" }}
              />
              {props.showBoardModal ? (
                <s.MBackground>
                  <s.MWrapper>
                    <s.MButtonWrapper>
                      <s.MCloseButton onClick={props.boardOpenCloseModal}>
                        X
                      </s.MCloseButton>
                    </s.MButtonWrapper>
                    <s.MTitle>게시물 수정 / 삭제</s.MTitle>
                    <s.MContents>
                      작성자가 아닌 경우 게시물 수정과 삭제가 제한됩니다.
                    </s.MContents>
                    <s.MMutationBtn>
                      <s.MUpdate onClick={props.onClickMoveToProductEdit}>
                        수정
                      </s.MUpdate>
                      <s.MDelete onClick={props.onClickDelete}>삭제</s.MDelete>
                    </s.MMutationBtn>
                  </s.MWrapper>
                </s.MBackground>
              ) : null}
            </s.MutationBtns>
          </s.StatusWrapper>
          <s.Title>{props.data?.fetchBoard?.title}</s.Title>
          <s.CategoryWrapper>
            <s.Location>카테고리</s.Location>
            <s.Category>{props.data?.fetchBoard?.category?.name}</s.Category>
          </s.CategoryWrapper>
          <s.DateWrapper>
            <s.Location>희망시간</s.Location>
            <s.Date>
              <s.eventDay>
                {props.data?.fetchBoard?.dueDate?.slice(0, 10)}
              </s.eventDay>
              <s.eventTime>
                {props.data?.fetchBoard?.dueDate?.slice(11, 16)}
              </s.eventTime>
            </s.Date>
          </s.DateWrapper>
          <s.LocationWrapper>
            <s.Location>장소</s.Location>
            <s.AddressWrapper>
              <s.Address>{props.data?.fetchBoard?.location?.address}</s.Address>
              <s.AddressDetail>
                {props.data?.fetchBoard?.location?.addressDetail}
              </s.AddressDetail>
            </s.AddressWrapper>
          </s.LocationWrapper>
          <Map address={props.data?.fetchBoard?.location?.address} />
          <s.PriceWrapper>
            <s.Location>대행비</s.Location>
            <s.Price>
              {props.data?.fetchBoard?.price?.toLocaleString("ko-KR")}원
            </s.Price>
          </s.PriceWrapper>
          <s.DivideLine />
          <s.BtnsWrapper>
            {(props.adoptedRunner?.length === 1 &&
              props?.login?.fetchLoginUser?.id ===
                props?.data?.fetchBoard?.user?.id) ||
            (props.adoptedRunner?.length === 1 &&
              props?.login?.fetchLoginUser?.id ===
                props?.adoptedRunner[0]?.user?.id) ? (
              <s.ActivatedChatBtn onClick={props.chatOpenCloseModal}>
                <BsChatFill size={25} />
                {props.isPc && (
                  <s.ActivatedChatText>채팅하기</s.ActivatedChatText>
                )}
              </s.ActivatedChatBtn>
            ) : (
              <s.ChatBtn onClick={props.chatOpenCloseModal}>
                <BsChatFill size={25} />
                {props.isPc && <s.ChatText>채팅하기</s.ChatText>}
              </s.ChatBtn>
            )}
            {props.showChatModal ? <LiveChat /> : null}
            {props.interestedBoard?.length ? (
              <s.PickBtn onClick={props.onClickAddInterestList}>
                <s.PickText>
                  찜해제
                  <s.PickIcon src="/boardList/Bookmark(filled).png" />
                </s.PickText>
              </s.PickBtn>
            ) : (
              <s.PickBtn onClick={props.onClickAddInterestList}>
                <s.PickText>
                  찜하기
                  <s.PickIcon src="/boardList/Bookmark.png" />
                </s.PickText>
              </s.PickBtn>
            )}
            <s.ApplyBtn type="button" onClick={props.onClickApply}>
              신청하기
            </s.ApplyBtn>
          </s.BtnsWrapper>
        </s.ProductInfoWrapper>
      </s.ProductWrapper>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "75%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                centered
                variant="fullWidth"
              >
                <Tab label="요청사항" value="1" />
                <Tab label="신청목록" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {typeof window !== "undefined" ? (
                <s.RequestWrapper
                  dangerouslySetInnerHTML={{
                    __html: Dompurify.sanitize(
                      props.data?.fetchBoard?.contents
                    ),
                  }}
                ></s.RequestWrapper>
              ) : (
                <s.RequestWrapper></s.RequestWrapper>
              )}
            </TabPanel>
            <TabPanel value="2">
              {props.runner?.fetchRunnerByBoard?.length !== 0 ? (
                <s.ApplyWrapper>
                  {props.runner?.fetchRunnerByBoard?.map((el: any) => (
                    <s.ApplyList key={el.id}>
                      <s.ApplyItem>
                        <s.IconWrapper>
                          <s.RunnerIcon
                            src={
                              el?.user?.profileImg
                                ? `https://storage.googleapis.com/openrun-sub/${el?.user?.profileImg}`
                                : `https://storage.googleapis.com/openrun-sub/profile/2022-09-21/54776adb-634b-43da-8b90-ebe9ef19c6e8/origin/Smile-Emoticon-Transparent-PNG.png`
                            }
                          />
                        </s.IconWrapper>
                        <s.RunnerName>{el?.user?.nickName}</s.RunnerName>
                        <s.Rating>
                          <s.Star value={el.user.rating || 0.0} disabled />
                          <s.RatingText>
                            {Number(el.user.rating).toFixed(1) || 0.0}
                          </s.RatingText>
                        </s.Rating>
                        <s.CntWrapper>
                          {props.isPc && (
                            <s.RunCnt>줄서기 {el.user.runnerCount}건</s.RunCnt>
                          )}
                          <s.SuccessRate>
                            성공률 {el.user.successRate}%
                          </s.SuccessRate>
                        </s.CntWrapper>
                      </s.ApplyItem>
                      {props.isPc && (
                        <s.SelectBtn onClick={props.onClickAdopt(el?.user?.id)}>
                          채택하기
                        </s.SelectBtn>
                      )}
                      {props.isMobile && (
                        <s.SelectBtn onClick={props.onClickAdopt(el?.user?.id)}>
                          <AiOutlineCheckCircle size={30} />
                        </s.SelectBtn>
                      )}
                      {props.isUltra && (
                        <s.SelectBtn onClick={props.onClickAdopt(el?.user?.id)}>
                          <AiOutlineCheckCircle size={30} />
                        </s.SelectBtn>
                      )}
                    </s.ApplyList>
                  ))}
                </s.ApplyWrapper>
              ) : (
                <s.DefaultApplyList>
                  <s.Info src="/boardDetail/Info.png" />
                  <s.DefaultText>
                    신청 내역이 없습니다.
                    <br />
                    거래에 참여해보세요!
                  </s.DefaultText>
                </s.DefaultApplyList>
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </ThemeProvider>
    </s.Wrapper>
  );
}

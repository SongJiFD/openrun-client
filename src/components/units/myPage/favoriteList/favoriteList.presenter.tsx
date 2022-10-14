import * as s from "./favoriteList.styles";
import InfiniteScroll from "react-infinite-scroller";
import { v4 as uuidv4 } from "uuid";
import { el } from "date-fns/locale";
import { dateSplit } from "../../../../commons/function/dateSlice";
import { IFavoriteProps } from "../myPage.types";

export default function MypageFavoriteListUI(props: any) {
  return (
    <s.Wrapper>
      <s.Button onClick={props.onClickTop}>Top</s.Button>
      <s.FavoriteListWrapper>
        <s.FavoriteTitle>찜목록</s.FavoriteTitle>
        {props.data?.length === 0 ? (
          <s.NoData>
            <s.ExclamationMark />
            <s.NodataText>찜한 게시글이 없습니다.</s.NodataText>
          </s.NoData>
        ) : (
          <s.InfiniteScrollLimit id="scroll" ref={props.scrollRef}>
            <s.FavoriteBoards
              pageStart={0}
              loadMore={props.onFetchMore}
              hasMore={true}
              useWindow={false}
            >
              {props.data?.map((el: any) => (
                <s.FavoriteBoard
                  onClick={props.onClickMoveToBoardDetail(el.board?.id)}
                  key={uuidv4()}
                >
                  <s.Status
                    color={
                      el.board?.status === "모집중"
                        ? "#7DD03C"
                        : el?.status === "진행중"
                        ? "#ff9100"
                        : "#D03C3C"
                    }
                    border={
                      el.board?.status === "모집중"
                        ? "#7DD03C"
                        : el?.status === "진행중"
                        ? "#ff9100"
                        : "#D03C3C"
                    }
                  >
                    {el.board?.status}
                  </s.Status>

                  <s.BoardImg
                    src={
                      el.board?.image
                        ? `https://storage.googleapis.com/openrun-sub/${el.board?.image}`
                        : "/img/noimage.png"
                    }
                  />
                  <s.BoardContentsWrapper>
                    <s.BoardContents>
                      <s.BoardContent
                        weight="700"
                        size="1rem"
                        color="# 333"
                        align="left"
                        width="60%"
                      >
                        {el.board?.title}
                      </s.BoardContent>
                      <s.BoardContent
                        weight="400"
                        size="0.7rem"
                        color="#5e5e5e"
                        align="left"
                        width="15%"
                      >
                        {el.board?.price}원
                      </s.BoardContent>
                      <s.BoardContent
                        weight="400"
                        size="0.7rem"
                        color="#5e5e5e"
                        align="right"
                        width="25%"
                      >
                        {dateSplit(el.board?.dueDate)}
                      </s.BoardContent>
                    </s.BoardContents>
                    <s.Text weight="400" size="0.7rem" color="#5e5e5e">
                      {el.board?.user?.nickName}
                    </s.Text>
                  </s.BoardContentsWrapper>
                </s.FavoriteBoard>
              ))}
            </s.FavoriteBoards>
          </s.InfiniteScrollLimit>
        )}
      </s.FavoriteListWrapper>
    </s.Wrapper>
  );
}

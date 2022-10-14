import * as s from "./boardListFood.styles";
import DOMPurify from "dompurify";
import { AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import * as React from "react";
import Selector from "../../../../../commons/selector";
import Selector2 from "../../../../../commons/selector2";
import { BoardListUIProps } from "../boardList.types";

export default function BoardListFoodUI(props: BoardListUIProps) {
  return (
    <s.Wrapper>
      {props.isPc && (
        <s.CategoryWrapper>
          <s.CategoryItem onClick={props.onClickMoveToAll}>All</s.CategoryItem>
          <s.CategoryItem onClick={props.onClickMoveToFashion}>
            Fashion
          </s.CategoryItem>
          <s.CategoryItem onClick={props.onClickMoveToAcc}>Acc</s.CategoryItem>
          <s.CategoryItem onClick={props.onClickMoveToDigital}>
            Digital
          </s.CategoryItem>
          <s.CategoryFood onClick={props.onClickMoveToFood}>
            Food
          </s.CategoryFood>
          <s.CategoryItem onClick={props.onClickMoveToToy}>Toy</s.CategoryItem>
        </s.CategoryWrapper>
      )}

      {props.isMobile && (
        <s.CategoryWrapper>
          <s.ResponsiveCategory1>
            <s.CategoryItem onClick={props.onClickMoveToAll}>
              All
            </s.CategoryItem>
            <s.CategoryItem onClick={props.onClickMoveToFashion}>
              Fashion
            </s.CategoryItem>
            <s.CategoryItem onClick={props.onClickMoveToAcc}>
              Acc
            </s.CategoryItem>
          </s.ResponsiveCategory1>
          <s.ResponsiveCategory2>
            <s.CategoryItem onClick={props.onClickMoveToDigital}>
              Digital
            </s.CategoryItem>
            <s.CategoryFood onClick={props.onClickMoveToFood}>
              Food
            </s.CategoryFood>
            <s.CategoryItem onClick={props.onClickMoveToToy}>
              Toy
            </s.CategoryItem>
          </s.ResponsiveCategory2>
        </s.CategoryWrapper>
      )}

      {props.isUltra && (
        <s.CategoryWrapper>
          <s.ResponsiveCategory1>
            <s.CategoryItem onClick={props.onClickMoveToAll}>
              All
            </s.CategoryItem>
            <s.CategoryItem onClick={props.onClickMoveToFashion}>
              Fashion
            </s.CategoryItem>
            <s.CategoryItem onClick={props.onClickMoveToAcc}>
              Acc
            </s.CategoryItem>
          </s.ResponsiveCategory1>
          <s.ResponsiveCategory2>
            <s.CategoryItem onClick={props.onClickMoveToDigital}>
              Digital
            </s.CategoryItem>
            <s.CategoryFood onClick={props.onClickMoveToFood}>
              Food
            </s.CategoryFood>
            <s.CategoryItem onClick={props.onClickMoveToToy}>
              Toy
            </s.CategoryItem>
          </s.ResponsiveCategory2>
        </s.CategoryWrapper>
      )}
      {/* <s.DivideLine1 /> */}
      <s.InnerWrapper>
        <s.FilterWrapper>
          <Selector
            title="시간순"
            sortValue={["전체", "최신순", "마감 임박순"]}
          />
          <s.DivideDiv />
          <Selector2
            title="지역순"
            sortValue={[
              "전체",
              "서울",
              "경기",
              "충북",
              "충남",
              "경북",
              "경남",
              "전북",
              "전남",
              "인천",
              "대전",
              "대구",
              "부산",
              "울산",
              "광주",
            ]}
          />
          {props.isPc && (
            <s.SearchBarWrapper>
              <s.SearchIcon src="/boardList/Search.png" />
              <s.SearchInput
                placeholder="제목을 검색해주세요"
                type="text"
                onChange={props.onChangeSearch}
                // refetch={props.refetch}
              />
            </s.SearchBarWrapper>
          )}
        </s.FilterWrapper>
        {props.isMobile && (
          <s.SearchBarWrapper>
            <s.SearchIcon src="/boardList/Search.png" />
            <s.SearchInput
              placeholder="제목을 검색해주세요"
              type="text"
              onChange={props.onChangeSearch}
              // refetch={props.refetch}
            />
          </s.SearchBarWrapper>
        )}
        {props.isUltra && (
          <s.SearchBarWrapper>
            <s.SearchIcon src="/boardList/Search.png" />
            <s.SearchInput
              placeholder="제목을 검색해주세요"
              type="text"
              onChange={props.onChangeSearch}
              // refetch={props.refetch}
            />
          </s.SearchBarWrapper>
        )}

        <s.ProductWrapper>
          {props.data?.fetchBoards
            ?.filter((el: any) => el?.category?.name === "FOOD")
            .map((el: any) => (
              <s.ProductInfoWrapper key={el.id}>
                <s.ImageWrapper
                  id={el.id}
                  onClick={(e) => {
                    props.onClickMoveToProductDetail(e);
                  }}
                >
                  <s.ProductImage
                    key={el}
                    src={
                      el?.image
                        ? `https://storage.googleapis.com/openrun-sub/${el?.image}`
                        : "/boardList/default.jpeg"
                    }
                  />
                </s.ImageWrapper>
                <s.DateWrapper1>
                  <s.Month>{el?.dueDate?.slice(5, 7)}월</s.Month>
                  <s.Day>{el?.dueDate?.slice(8, 10)}</s.Day>
                </s.DateWrapper1>
                {props.interestedId?.fetchInterestBoardId?.includes(el.id) ? (
                  <s.PickIcon src="/boardList/Bookmark(filled).png" />
                ) : (
                  <s.PickIcon src="/boardList/Bookmark.png" />
                )}
                <s.UpperInfoWrapper>
                  <s.Category>{el?.category?.name}</s.Category>
                  {(el?.location?.address?.slice(0, 2) === "서울" ||
                    el?.location?.address?.slice(0, 2) === "경기" ||
                    el?.location?.address?.slice(0, 2) === "인천") && (
                    <s.Region1>{el?.location?.address?.slice(0, 2)}</s.Region1>
                  )}
                  {(el?.location?.address?.slice(0, 2) === "충남" ||
                    el?.location?.address?.slice(0, 2) === "대전") && (
                    <s.Region2>{el?.location?.address?.slice(0, 2)}</s.Region2>
                  )}
                  {el?.location?.address?.slice(0, 2) === "충북" && (
                    <s.Region3>{el?.location?.address?.slice(0, 2)}</s.Region3>
                  )}
                  {(el?.location?.address?.slice(0, 2) === "경북" ||
                    el?.location?.address?.slice(0, 2) === "대구") && (
                    <s.Region4>{el?.location?.address?.slice(0, 2)}</s.Region4>
                  )}
                  {(el?.location?.address?.slice(0, 2) === "경남" ||
                    el?.location?.address?.slice(0, 2) === "부산" ||
                    el?.location?.address?.slice(0, 2) === "울산") && (
                    <s.Region5>{el?.location?.address?.slice(0, 2)}</s.Region5>
                  )}
                  {el?.location?.address?.slice(0, 2) === "전북" && (
                    <s.Region6>{el?.location?.address?.slice(0, 2)}</s.Region6>
                  )}
                  {(el?.location?.address?.slice(0, 2) === "전남" ||
                    el?.location?.address?.slice(0, 2) === "광주") && (
                    <s.Region7>{el?.location?.address?.slice(0, 2)}</s.Region7>
                  )}
                </s.UpperInfoWrapper>
                <s.Title
                  id={el.id}
                  onClick={(e) => {
                    props.onClickMoveToProductDetail(e);
                  }}
                >
                  {el?.title
                    ?.replaceAll(props.keyword, `#$%${props.keyword}#$%`)
                    .split("#$%")
                    .map((el: any) => (
                      <s.TitleSpan
                        key={uuidv4()}
                        isMatched={props.keyword === el}
                      >
                        {el}
                      </s.TitleSpan>
                    ))}
                </s.Title>
                {typeof window !== "undefined" ? (
                  <s.Contents
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(el?.contents),
                    }}
                  ></s.Contents>
                ) : (
                  <s.Contents></s.Contents>
                )}
                <s.Writer>{el?.user?.nickName}</s.Writer>
                <s.StatusPriceWrapper>
                  {el.status === "모집중" && <s.Status1>{el.status}</s.Status1>}
                  {el.status === "진행중" && <s.Status2>{el.status}</s.Status2>}
                  {el.status === "거래완료" && (
                    <s.Status3>{el.status}</s.Status3>
                  )}
                  <s.Price>{el?.price.toLocaleString("ko-KR")}원</s.Price>
                </s.StatusPriceWrapper>
              </s.ProductInfoWrapper>
            ))}
        </s.ProductWrapper>
        <s.FetchMoreBtnWrapper>
          <s.FetchMoreBtn onClick={props.onFetchMore}>
            <AiOutlinePlus size={20} />
          </s.FetchMoreBtn>
        </s.FetchMoreBtnWrapper>
      </s.InnerWrapper>
    </s.Wrapper>
  );
}

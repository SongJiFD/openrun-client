import DatePicker from "../../../commons/datePicker";
import * as s from "./main.styles";
import { v4 as uuidv4 } from "uuid";
import { dateSplit } from "../../../commons/function/dateSlice";
import { IMainProps } from "./main.types";
import { BG_GRADATION } from "../../../commons/cssConst";
import MediaQueryPc from "../../../commons/mediaQuery/mediaQueryStandardPc";

import mediaQueryStandardForMain from "../../../commons/mediaQuery/mediaQueryStandardForMain";
import SwiperCustom from "../../../commons/swiper";
import { Rate } from "antd";
import { useState } from "react";

export default function MainUI(props: IMainProps) {
  const isPc = MediaQueryPc();
  const isMobileForMain = mediaQueryStandardForMain();
  return (
    <s.Wrapper>
      <SwiperCustom />

      <DatePicker
        onClickDate={props.onClickDate}
        color={props.color}
        MouseLeaveDate={props.MouseLeaveDate}
        dateIsClick={props.dateIsClick}
        setDateISClick={props.setDateISClick}
        setColor={props.setColor}
      />
      <s.EventProductWrapper>
        {props.eventInfo?.length === 0 ? (
          <s.NoData>
            <s.ExclamationMark />
            <s.NodataText>행사 정보가 없습니다.</s.NodataText>
          </s.NoData>
        ) : (
          props.eventInfo?.map((el) => (
            <s.EventProduct key={uuidv4()}>
              <s.ProductImg
                src={`https://storage.googleapis.com/openrun-sub/${el.image}`}
                onClick={props.onClickMoveToDetail(`/eventInfo/${el.id}`)}
              />
              <s.ProductTexts
                onClick={props.onClickMoveToDetail(`/eventInfo/${el.id}`)}
              >
                <s.ProductText weight="400" size="0.8rem">
                  {el.brand}
                </s.ProductText>
                <s.ProductText weight="700" size="1rem">
                  {el.title}
                </s.ProductText>
                <s.ProductText weight="400" size="0.6rem">
                  {el.location}
                </s.ProductText>
                <s.ProductText weight="400" size="1rem">
                  {dateSplit(el.period)}
                </s.ProductText>
              </s.ProductTexts>
            </s.EventProduct>
          ))
        )}
      </s.EventProductWrapper>
      <s.BannerImg height="690px" url="/img/rectangle2.png">
        <s.ProductWrapperText>
          <s.TEXT color="#333" size={isPc ? "30px" : "15px"} weight="700">
            Best Runner Ranking
          </s.TEXT>
          <s.TEXT color="#333" size={isPc ? "16px" : "6px"} weight="400">
            우리가 사랑하는 베스트 러너 순위
          </s.TEXT>
        </s.ProductWrapperText>
        <s.BestRunners>
          {props.data?.map((el: any, index: any) => (
            <s.BestRunner key={uuidv4()}>
              <s.Ranking>
                <s.RankingText>{index + 1}</s.RankingText>
              </s.Ranking>
              <s.RunnerInfo>
                <s.RunnerImg
                  src={
                    !el.profileImg
                      ? "/img/profile.png"
                      : `https://storage.googleapis.com/openrun-sub/${el.profileImg}`
                  }
                />
                <s.TextWrapper>
                  <s.RunnerText weight="700" size="1rem" color="#333">
                    {el?.nickName}
                  </s.RunnerText>

                  <Rate value={el?.rating} disabled={true} />
                  <s.RunnerText weight="400" size="0.8rem" color="#1F8716">
                    성공률 {el?.successRate}%
                  </s.RunnerText>
                </s.TextWrapper>
              </s.RunnerInfo>
            </s.BestRunner>
          ))}
        </s.BestRunners>
      </s.BannerImg>

      <s.BannerDiv>
        <s.TEXT color="#333" size={isPc ? "30px" : "15px"} weight="700">
          러너 1:1 매칭
        </s.TEXT>
        <s.TEXT color="#333" size={isPc ? "16px" : "6px"} weight="400">
          어려웠던 줄서기 오픈런과 함께하면 쉬워집니다.
        </s.TEXT>
      </s.BannerDiv>

      <s.ProductWrapper>
        <s.ProductWrapperText>
          <s.TEXT color="#333" size={isPc ? "30px" : "15px"} weight="700">
            Best Pick
          </s.TEXT>
          <s.TEXT color="#333" size={isPc ? "16px" : "6px"} weight="400">
            찜 많이 받은 글
          </s.TEXT>
        </s.ProductWrapperText>
        <s.BestProductCategory>
          <s.Category>
            {props.category.map((el, index) =>
              !props.categoryIsClick && index === 0 ? (
                <s.CategoryTextChange
                  key={uuidv4()}
                  onClick={props.onClickCategory(el, index)}
                  color="transparent"
                  bg={BG_GRADATION}
                  weight="700"
                >
                  {el}
                </s.CategoryTextChange>
              ) : (
                <s.CategoryTextChange
                  key={uuidv4()}
                  onClick={props.onClickCategory(el, index)}
                  color={props.colorBestPick[index] ? "transparent" : "#333"}
                  bg={props.colorBestPick[index] ? BG_GRADATION : "none"}
                  weight={props.colorBestPick[index] ? "700" : "400"}
                >
                  {el}
                </s.CategoryTextChange>
              )
            )}
          </s.Category>
          <s.CategoryImages>
            {props.bestBoards?.length === 0 ? (
              <s.NoData>
                <s.ExclamationMark />
                <s.NodataText>베스트 상품이 없습니다.</s.NodataText>
              </s.NoData>
            ) : (
              props.bestBoards?.map((el: any, index: any) => (
                <s.CategoryImg
                  top={isPc ? `${index * 250}px` : `${index * 150}px`}
                  key={uuidv4()}
                >
                  <s.CategoryImage
                    onMouseEnter={() => props.onMouse(index)}
                    src={
                      el?.image
                        ? `https://storage.googleapis.com/openrun-sub/${el.image}`
                        : "/img/profile.png"
                    }
                  />

                  {props.isHover[index] ? (
                    <s.CategoryInfo
                      onMouseLeave={props.onMoueLeave}
                      onClick={props.onClickMoveToDetail(`/board/${el.id}`)}
                    >
                      <s.CategoryWrapper>
                        <s.CategoryText weight="700" size="1rem">
                          {el.title}
                        </s.CategoryText>

                        <s.CategoryText weight="700" size="1rem">
                          <s.Runner /> 0
                        </s.CategoryText>
                      </s.CategoryWrapper>

                      <s.CategoryText weight="400" size="0.8rem">
                        {dateSplit(el.dueDate)}
                      </s.CategoryText>
                      <s.CategoryText weight="400" size="0.8rem">
                        {el.location?.address}
                      </s.CategoryText>
                      <s.CategoryText weight="700" size="0.8rem">
                        {el?.price} 원
                      </s.CategoryText>
                    </s.CategoryInfo>
                  ) : (
                    <></>
                  )}
                </s.CategoryImg>
              ))
            )}
          </s.CategoryImages>
        </s.BestProductCategory>
      </s.ProductWrapper>
    </s.Wrapper>
  );
}

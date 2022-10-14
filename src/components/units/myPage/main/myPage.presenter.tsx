import { useRecoilState } from "recoil";
import { dateSplit } from "../../../../commons/function/dateSlice";
import { userInfoValue } from "../../../commons/store";
import { IMainProps } from "../myPage.types";
import { v4 as uuidv4 } from "uuid";
import * as s from "./myPage.styles";
export default function MyPageUI(props: IMainProps) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoValue);
  return (
    <s.Wrapper>
      <s.ActiveListWrapper>
        <s.ActiveTitle>거래중인 상품: Seller</s.ActiveTitle>
        {props.sellerData?.length === 0 ? (
          <s.NoData>
            <s.ExclamationMark />
            <s.NodataText>거래중인 상품이 없습니다.</s.NodataText>
          </s.NoData>
        ) : (
          <s.InfiniteScrollLimit>
            <s.ActiveWrapper
              pageStart={0}
              loadMore={props.onFetchMore}
              hasMore={true}
              useWindow={false}
            >
              {props?.sellerData ? (
                props?.sellerData?.map((el) => (
                  <s.ActiveContent
                    height="300px"
                    onClick={props.onClickMoveToBoardDetail(el.id || "")}
                  >
                    {el.image === "" ? (
                      <s.NoImg />
                    ) : (
                      <s.ActiveImg
                        src={`https://storage.googleapis.com/openrun-sub/${el.image}`}
                      />
                    )}

                    <s.ActiveText color="#333" weight="700" size="0.8rem">
                      {el.title}
                    </s.ActiveText>
                    <s.ActiveText color="#333" weight="400" size="0.6rem">
                      {el.price}원
                    </s.ActiveText>
                    <s.ActiveText color="#333" weight="400" size="0.6rem">
                      희망 시간: {dateSplit(el.dueDate)}
                    </s.ActiveText>
                  </s.ActiveContent>
                ))
              ) : (
                <></>
              )}
            </s.ActiveWrapper>
          </s.InfiniteScrollLimit>
        )}
      </s.ActiveListWrapper>
      <s.DivideLineHorizontal color="#F2F2F2" />
      <s.ActiveListWrapper>
        <s.ActiveTitle>거래중인 상품: Runner</s.ActiveTitle>
        {props.runnerData?.length === 0 ? (
          <s.NoData>
            <s.ExclamationMark />
            <s.NodataText>거래중인 상품이 없습니다.</s.NodataText>
          </s.NoData>
        ) : (
          <s.InfiniteScrollLimit>
            <s.ActiveWrapper
              pageStart={0}
              loadMore={props.onFetchMoreRunner}
              hasMore={true}
              useWindow={false}
            >
              {props?.runnerData ? (
                props?.runnerData?.map((el) => (
                  <s.ActiveContent
                    height="300px"
                    onClick={props.onClickMoveToBoardDetail(el.board?.id || "")}
                    key={uuidv4()}
                  >
                    {el.board?.image === "" ? (
                      <s.NoImg />
                    ) : (
                      <s.ActiveImg
                        src={`https://storage.googleapis.com/openrun-sub/${el.board?.image}`}
                      />
                    )}
                    <s.ActiveTextWrapper>
                      <s.ActiveText color="#333" weight="700" size="0.8rem">
                        {el.board?.title}
                      </s.ActiveText>
                      <s.ActiveText color="#333" weight="400" size="0.6rem">
                        {el.board?.price}원
                      </s.ActiveText>
                      <s.ActiveText color="#333" weight="400" size="0.6rem">
                        장소: {el.board?.location?.address}
                      </s.ActiveText>

                      <s.ActiveText color="#333" weight="400" size="0.6rem">
                        희망 시간: {dateSplit(el.board?.dueDate)}
                      </s.ActiveText>
                    </s.ActiveTextWrapper>
                  </s.ActiveContent>
                ))
              ) : (
                <></>
              )}
            </s.ActiveWrapper>
          </s.InfiniteScrollLimit>
        )}
      </s.ActiveListWrapper>
      <s.DivideLineHorizontal color="#F2F2F2" />
      <s.ActiveListWrapper>
        <s.ActiveTitle>채팅중인 대화</s.ActiveTitle>

        <s.ChatWrapper>
          {props?.chatRoom?.length === 0 ? (
            <s.NoData>
              <s.ExclamationMark />
              <s.NodataText>채팅중이 아닙니다.</s.NodataText>
            </s.NoData>
          ) : (
            props?.chatRoom?.map((el: any) =>
              el?.runner?.id === userInfo?.id ? (
                <s.ChatContents
                  height="200px"
                  key={uuidv4()}
                  onClick={props.onClickMoveToBoardDetail(el.board?.id)}
                >
                  <s.ChatContent>{el?.board?.title}</s.ChatContent>

                  <s.ChatProfileImg
                    src={
                      el?.seller?.profileImg
                        ? `https://storage.googleapis.com/openrun-sub/${el.seller.profileImg}`
                        : "/img/profile.png"
                    }
                  />
                  <s.ChatContent>{el?.seller?.nickName}</s.ChatContent>
                </s.ChatContents>
              ) : (
                <s.ChatContents
                  height="200px"
                  key={uuidv4()}
                  onClick={props.onClickMoveToBoardDetail(el.board?.id)}
                >
                  <s.ChatContent>{el?.board?.title}</s.ChatContent>
                  <s.ChatProfileImg
                    src={
                      el?.runner?.profileImg
                        ? `https://storage.googleapis.com/openrun-sub/${el.runner.profileImg}`
                        : "/img/profile.png"
                    }
                  />
                  <s.ChatContent>{el?.runner?.nickName}</s.ChatContent>
                </s.ChatContents>
              )
            )
          )}
        </s.ChatWrapper>
      </s.ActiveListWrapper>
    </s.Wrapper>
  );
}

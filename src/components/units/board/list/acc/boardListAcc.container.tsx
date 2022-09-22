import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { FETCH_BOARDS, FETCH_INTEREST_BOARD_ID } from "./boardListAcc.queries";
import _ from "lodash";
import { useRecoilState } from "recoil";
import MediaQueryMobile from "../../../../../commons/mediaQuery/mediaQueryStandardMobile";
import MediaQueryPc from "../../../../../commons/mediaQuery/mediaQueryStandardPc";
import { selectorValue, selectorValue2 } from "../../../../commons/store";
import BoardListAccUI from "./boardListAcc.presenter";
import MediaQueryUltra from "../../../../../commons/mediaQuery/mediaQueryStandardUltra";

export default function BoardListAcc() {
  const router = useRouter();

  // mediaQuery
  const isPc = MediaQueryPc();
  const isMobile = MediaQueryMobile();
  const isUltra = MediaQueryUltra();

  // 기본 게시물 정렬
  const [sortValue] = useRecoilState(selectorValue);
  const [sortValue2] = useRecoilState(selectorValue2);
  const { data, refetch, fetchMore } = useQuery(FETCH_BOARDS, {
    variables: {
      dateType: sortValue || "최신순",
      direcion: sortValue2,
      category: "ACC",
      search: "",
      page: 1,
    },
  });

  // 더보기  함수
  const onFetchMore = () => {
    // console.log(data);
    if (!data) return;

    fetchMore({
      variables: { page: Math.ceil(data?.fetchBoards.length / 12) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoards)
          return { fetchBoards: [...prev.fetchBoards] };

        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
        };
      },
    });
  };
  // console.log(data);

  // search 함수
  const [keyword, setKeyword] = useState("");

  const getDebounce = _.debounce((value: any) => {
    refetch({
      dateType: sortValue || "최신순",
      direcion: sortValue2,
      category: "ACC",
      search: value,
      page: 1,
    });
    setKeyword(value);
    // console.log(value);
  }, 1000);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
  };

  // 페이지 이동 함수
  const onClickMoveToProductDetail = (event: any) => {
    if (!(event.target instanceof HTMLElement)) return;
    router.push(`/board/${event.currentTarget.id}`);
    // console.log(event.currentTarget.id);
  };
  const onClickMoveToAll = () => {
    router.push("/board/all");
  };
  const onClickMoveToFashion = () => {
    router.push("/board/fashion");
  };
  const onClickMoveToAcc = () => {
    router.push("/board/acc");
  };
  const onClickMoveToDigital = () => {
    router.push("/board/digital");
  };
  const onClickMoveToFood = () => {
    router.push("/board/food");
  };
  const onClickMoveToToy = () => {
    router.push("/board/toy");
  };

  // 찜한 게시물 표시
  const { data: interestedId } = useQuery(FETCH_INTEREST_BOARD_ID);

  return (
    <BoardListAccUI
      router={router}
      data={data}
      interestedId={interestedId}
      isMobile={isMobile}
      isUltra={isUltra}
      isPc={isPc}
      refetch={refetch}
      onFetchMore={onFetchMore}
      onClickMoveToProductDetail={onClickMoveToProductDetail}
      keyword={keyword}
      onChangeSearch={onChangeSearch}
      onClickMoveToAll={onClickMoveToAll}
      onClickMoveToFashion={onClickMoveToFashion}
      onClickMoveToAcc={onClickMoveToAcc}
      onClickMoveToDigital={onClickMoveToDigital}
      onClickMoveToFood={onClickMoveToFood}
      onClickMoveToToy={onClickMoveToToy}
    />
  );
}

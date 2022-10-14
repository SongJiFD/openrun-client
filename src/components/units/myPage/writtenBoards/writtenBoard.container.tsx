import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Modal, Rate } from "antd";
import { GraphQLClient } from "graphql-request";

import {
  IMutation,
  IMutationCreateRatingArgs,
  IQuery,
  IQueryFetchBoardRecruitingByUserArgs,
} from "../../../../commons/types/generated/types";

import MypageWrittenBoardsUI from "./writtenBoard.presenter";
import {
  COMPLETE_BUSINESS,
  CREATE_RATING,
  CREATE_REPORT,
  FETCH_RUNNER,
  FETCH_BOARD_RECRUITING_BY_USER,
} from "./writtenBoard.queries";
import { useRecoilState } from "recoil";
import { accessTokenState, modalInputState } from "../../../commons/store";

export default function MypageWrittenBoards() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [accessToken] = useRecoilState(accessTokenState);
  const [userRate, setUserRate] = useState(0);

  const [runnerInfo, setUserInfo] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenRate, setIsModalOpenRate] = useState(false);

  const [boardId, setBoardId] = useState("");
  const [inputValue, setInputValue] = useRecoilState(modalInputState);

  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchBoardRecruitingByUser">,
    IQueryFetchBoardRecruitingByUserArgs
  >(FETCH_BOARD_RECRUITING_BY_USER);

  const [createRating] = useMutation<
    Pick<IMutation, "createRating">,
    IMutationCreateRatingArgs
  >(CREATE_RATING);
  const [completeBusiness] = useMutation(COMPLETE_BUSINESS);

  const [createReport] = useMutation(CREATE_REPORT);

  const onClickMoveToDetail = (boardId: string) => () => {
    router.push(`/board/${boardId}`);
  };
  const onClickTop = () => {
    scrollRef.current?.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  const onFetchMore = () => {
    if (!data) return;
    fetchMore({
      variables: {
        page: Math.ceil(data?.fetchBoardRecruitingByUser.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchBoardRecruitingByUser)
          return {
            fetchBoardRecruitingByUser: [...prev.fetchBoardRecruitingByUser],
          };
        return {
          fetchBoardRecruitingByUser: [
            ...prev.fetchBoardRecruitingByUser,
            ...fetchMoreResult?.fetchBoardRecruitingByUser,
          ],
        };
      },
    });
  };

  // 거래 완료 모달
  const onClickCompleteModal = (boardId: string) => async () => {
    console.log(boardId);
    try {
      const graphQlClient = new GraphQLClient(
        "http://dev-one.duckdns.org:4000/graphql",
        {
          credentials: "include",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const runnerResult = await graphQlClient.request(FETCH_RUNNER, {
        boardId: boardId,
      });
      setUserInfo(runnerResult.fetchRunner?.nickName);
    } catch (error) {
      // console.log(error);
    }
  };

  // 신고하기 모달
  const showModal = (boardId: string) => () => {
    setIsModalOpen(true);
    setBoardId(boardId);
  };

  const onClickSubmitReport = async () => {
    try {
      const result = await createReport({
        variables: {
          createReportInput: {
            boardId,
            contents: inputValue,
          },
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_RECRUITING_BY_USER,
          },
        ],
      });

      setIsModalOpen(false);
      Modal.success({ content: "신고가 접수되었습니다." });
    } catch (error) {
      // console.log(error);
    }
  };

  const showModalRate = (boardId: string) => async () => {
    setIsModalOpenRate(true);
    setBoardId(boardId);
    try {
      const graphQlClient = new GraphQLClient(
        "http://dev-one.duckdns.org:4000/graphql",
        {
          credentials: "include",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const runnerResult = await graphQlClient.request(FETCH_RUNNER, {
        boardId: boardId,
      });

      setUserInfo(runnerResult.fetchRunner?.nickName);
    } catch (error) {
      // console.log(error);
    }
  };

  const onClickRate = async () => {
    try {
      const rateResult = await createRating({
        variables: {
          boardId,
          rate: userRate,
        },
      });

      const completeResult = await completeBusiness({
        variables: {
          boardId,
        },
        refetchQueries: [{ query: FETCH_BOARD_RECRUITING_BY_USER }],
      });

      setIsModalOpenRate(false);
      Modal.success({ content: "거래 완료되었습니다." });
    } catch (error) {
      // console.log(error);
    }
  };

  const onClickCancel = () => {
    setIsModalOpen(false);
  };
  const onClickCancelRate = () => {
    setIsModalOpenRate(false);
  };

  return (
    <MypageWrittenBoardsUI
      onFetchMore={onFetchMore}
      data={data?.fetchBoardRecruitingByUser}
      onClickMoveToDetail={onClickMoveToDetail}
      onClickTop={onClickTop}
      scrollRef={scrollRef}
      onClickCompleteModal={onClickCompleteModal}
      showModal={showModal}
      isModalOpen={isModalOpen}
      onClickSubmitReport={onClickSubmitReport}
      onClickCancel={onClickCancel}
      showModalRate={showModalRate}
      onClickRate={onClickRate}
      runnerInfo={runnerInfo}
      isModalOpenRate={isModalOpenRate}
      onClickCancelRate={onClickCancelRate}
      setUserRate={setUserRate}
    />
  );
}

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { io } from "socket.io-client";
import { accessTokenState } from "../../components/commons/store";
import LiveChatUI from "./liveChat.presenter";
import {
  FETCH_BOARD,
  FETCH_CHAT_LOGS,
  FETCH_LOGIN_USER,
  FETCH_RUNNER_BY_BOARD,
  FETCH_USER_CHAT_ROOM,
} from "./liveChat.queries";

export default function LiveChat() {
  const router = useRouter();
  const [accessToken] = useRecoilState(accessTokenState);

  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [room, setRoom] = useState("");
  const [resultMsg, setResultMsg] = useState<string[]>([]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const { data, refetch } = useQuery(FETCH_CHAT_LOGS, {
    variables: { room: `first${router.query.id}` },
  });
  const { data: chatRoom } = useQuery(FETCH_USER_CHAT_ROOM);
  const { data: login } = useQuery(FETCH_LOGIN_USER);
  const { data: board } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.id },
  });

  const socket = io("http://dev-one.duckdns.org:4000/chat");

  const { register, handleSubmit, resetField } = useForm({
    mode: "onChange",
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    socket.on(room, (data) => {
      setResultMsg((prev: string[]) => [...prev, data]);
    });
    refetch();
  }, [room]);

  useEffect(() => {
    setId(login?.fetchLoginUser.id);
    setRoom("first" + String(router.query.id));
    setNickName(login?.fetchLoginUser.nickName);
  }, [login]);

  const { data: runner } = useQuery(FETCH_RUNNER_BY_BOARD, {
    variables: { boardId: router.query.id },
  });
  const adoptedRunner = runner?.fetchRunnerByBoard.filter(
    (el: any) => el.isChecked === true
  );

  const onClickCreate = async (data: any) => {
    if (adoptedRunner[0]?.user?.id === login.fetchLoginUser.id) {
      socket.emit("message", [
        nickName,
        board?.fetchBoard?.user.id,
        router.query.id,
      ]);
      socket.on(`first${router.query.id}`, (data) => {
        // console.log(data);
      });
    } else {
      socket.emit("message", [
        nickName,
        adoptedRunner[0]?.user.id,
        router.query.id,
      ]);
      socket.on(`first${router.query.id}`, (data) => {
        // console.log(data);
      });
    }
  };

  const onSendMessage = async (data: any) => {
    const message = await data.message;
    socket.emit("send", `first${router.query.id}`, nickName, message);
    resetField("message");

    return messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  const onKeyDown = (event: KeyboardEvent) => (data: any) => {
    if (event.key === "Enter") {
      onSendMessage(data);
    }
  };

  return (
    <LiveChatUI
      accessToken={accessToken}
      resultMsg={resultMsg}
      id={id}
      register={register}
      handleSubmit={handleSubmit}
      onClickCreate={onClickCreate}
      onSendMessage={onSendMessage}
      data={data}
      messagesEndRef={messagesEndRef}
      onKeyDown={onKeyDown}
      login={login}
    />
  );
}

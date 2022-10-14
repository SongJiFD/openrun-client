import { useForm } from "react-hook-form";
import SignInUI from "./signIn.presenter";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { FETCH_LOGIN_USER, LOGIN } from "./signIn.queries";
import {
  IMutation,
  IMutationLoginArgs,
  IQuery,
} from "../../../commons/types/generated/types";
import { schema } from "../../../commons/yup/signIn";
import { useRecoilState } from "recoil";
import { userInfoValue } from "../../commons/store";
import { useRouter } from "next/router";
import { Modal } from "antd";

export default function SignIn() {
  const client = useApolloClient();
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(userInfoValue);
  const [login] = useMutation<Pick<IMutation, "login">, IMutationLoginArgs>(
    LOGIN
  );

  const { register, handleSubmit, getValues, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickSignIn = async (data: any) => {
    const values = getValues();
    if (!values) return;

    try {
      const result = await login({
        variables: {
          email: String(values.email),
          password: String(values.password),
        },
      });

      const accessToken = result.data?.login;

      const resultUserInfo = await client.query({
        query: FETCH_LOGIN_USER,
        context: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      });

      const userInfo = resultUserInfo.data?.fetchLoginUser;

      setUserInfo(userInfo);
      if (userInfo) {
        location.replace(`/main`);
      } else {
        alert("로그인실패");
      }
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onClickNaver = () => {
    router.push("http://dev-one.duckdns.org:4000/login/naver");
  };

  const onClickGoolge = () => {
    router.push("http://dev-one.duckdns.org:4000/login/google");
  };

  const onClickKakao = () => {
    router.push("http://dev-one.duckdns.org:4000/login/kakao");
  };

  return (
    <SignInUI
      register={register}
      handleSubmit={handleSubmit}
      formState={formState}
      onClickSignIn={onClickSignIn}
      onClickGoolge={onClickGoolge}
      onClickNaver={onClickNaver}
      onClickKakao={onClickKakao}
    />
  );
}

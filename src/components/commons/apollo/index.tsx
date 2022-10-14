import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
// @ts-ignore
import { createUploadLink } from "apollo-upload-client";
import { ReactNode, useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { getUserInfo } from "../../../commons/function/getUserInfo";
import {
  accessTokenState,
  logoutState,
  restoreAccessTokenLoadable,
  userInfoValue,
} from "../store";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../../../commons/function/getAccessToken";

const APOLLO_CACHE = new InMemoryCache();
interface IApolloSettingProps {
  children: ReactNode;
}
export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const restoreAccessFunc = useRecoilValueLoadable(restoreAccessTokenLoadable);
  const [userInfo, setUserInfo] = useRecoilState(userInfoValue);
  const [isLogout, setIsLogout] = useRecoilState(logoutState);

  useEffect(() => {
    restoreAccessFunc.toPromise().then((newAccessToken) => {
      setAccessToken(newAccessToken);
    });
    if (!isLogout) {
      FetchUserInfo(accessToken);
    }
  }, [accessToken]);

  const FetchUserInfo = async (accessToken: string) => {
    const resultUserInfo = await getUserInfo(accessToken);
    setUserInfo(resultUserInfo);
    return resultUserInfo;
  };

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions.code === "UNAUTHENTICATED") {
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken);
              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
            })
          ).flatMap(() => forward(operation));
        }
      }
    }
  });
  const uploadLink = createUploadLink({
    uri: "http://dev-one.duckdns.org:4000/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });
  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: APOLLO_CACHE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

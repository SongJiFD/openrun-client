import { gql } from "@apollo/client";
import { GraphQLClient } from "graphql-request";
import { useRecoilState } from "recoil";
import {
  accessTokenState,
  logoutState,
  userInfoValue,
} from "../../components/commons/store";

export const FETCH_NOTIFICATIONS = gql`
  query {
    fetchNotifications {
      id
      contents
      isNew
      # user {
      #   id
      # }
      board {
        id
        title
      }
    }
  }
`;

export async function getNotification() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  if (!accessToken) return;
  try {
    const graphQlClient = new GraphQLClient(
      "http://dev-one.duckdns.org:4000/graphql",
      {
        credentials: "include",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const result = await graphQlClient.request(FETCH_NOTIFICATIONS);

    const newNotification = result?.fetchNotifications;

    return newNotification;
  } catch (error) {
    if (error instanceof Error) {
      // console.log(error.message);
    }
  }
}

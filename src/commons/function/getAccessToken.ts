import { gql } from "@apollo/client";
import { GraphQLClient } from "graphql-request";
import { useRecoilState } from "recoil";
import {
  accessTokenState,
  logoutState,
  userInfoValue,
} from "../../components/commons/store";

const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken
  }
`;

export async function getAccessToken() {
  try {
    const graphQlClient = new GraphQLClient(
      "http://dev-one.duckdns.org:4000/graphql",
      { credentials: "include" }
    );
    const result = await graphQlClient.request(RESTORE_ACCESS_TOKEN);

    const newAccessToken = result?.restoreAccessToken;

    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) {
      // console.log(error.message);
    }
  }
}

import { gql } from "@apollo/client";

// export const FETCH_PAYMENT_HISTORY = gql`
//   query fetchPaymentHistory($page: Int) {
//     fetchPaymentHistory(page: $page) {
//       id
//       price
//       status
//       user {
//         id
//         nickName
//       }

//       board {
//         id
//         title
//         dueDate
//         status
//         image {
//           url
//         }
//         user {
//           nickName
//           id
//         }
//       }
//     }
//   }
// `;

export const FETCH_USER_CHATROOM = gql`
  query {
    fetchUserChatRoom {
      room
      seller {
        nickName
      }
      runner {
        nickName
      }
      board {
        id
        title
        price
        status
      }
    }
  }
`;

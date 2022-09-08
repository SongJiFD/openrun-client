import styled from "@emotion/styled";
import InfiniteScroll from "react-infinite-scroller";

export const Wrapper = styled.main`
  width: 95%;
  margin: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const SelectorWrapper = styled.div`
  width: 200px;
  margin-bottom: 40px;
  float: right;

  @media (max-width: 767px) {
    width: 30%;
    margin-bottom: 20px;
  }
`;

export const Text = styled.div<{ size: string; color: string; weight: string }>`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.weight};

  @media (max-width: 767px) {
    font-size: 0.5rem;
  }
`;

export const DivideLine = styled.div`
  width: 1px;
  height: 40%;
  background-color: rgba(0, 0, 0, 0.2);
`;
export const DivideLineHorizontal = styled.div<{ color: string }>`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.color};
`;

export const ActiveListWrapper = styled.section`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: auto;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const ActiveTitle = styled.div`
  cursor: pointer;
  margin-top: 5px;
  font-weight: 700;
  color: #333;
`;

export const ActiveBoards = styled(InfiniteScroll)`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const ActiveBoard = styled.div`
  width: 45%;
  height: 100px;
  margin: 1%;
  border-radius: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 767px) {
    width: 90%;
    height: 100px;
  }
`;

export const BoardImg = styled.img`
  width: 90px;
  height: 90px;

  border-radius: 20px;
  background-color: aqua;
  @media (max-width: 767px) {
    /* width: 60px;
    height: 90px;
    border-radius: 10px; */
  }
`;

export const BoardContents = styled.div`
  width: 60%;
  height: 90px;

  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #fafafa;
  @media (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

export const BoardContent = styled.div<{
  weight: string;
  size: string;
  color: string;
}>`
  color: ${(props) => props.color};
  font-weight: ${(props) => props.weight};
  font-size: ${(props) => props.size};
  margin-left: 10px;

  @media (max-width: 767px) {
    font-size: 0.8rem;
    /* width: 90%;
    height: 100px; */
  }
`;

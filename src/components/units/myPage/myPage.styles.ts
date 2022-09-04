import styled from "@emotion/styled";
import { Avatar } from "@mui/material";

export const Wrapper = styled.main`
  width: 95%;
  margin: auto;
`;

export const ProfileWrapper = styled.section`
  width: 100%;
  height: 156px;
  background-color: #f2f2f2;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 767px) {
    height: 100px;
    display: flex;
    flex-direction: column;
  }
`;
export const ProfileUser = styled.div`
  width: 45%;
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 767px) {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
`;

export const AvatarC = styled(Avatar)`
  width: 70px;
  height: 70px;
  @media (max-width: 767px) {
    width: 35px;
    height: 35px;
  }
`;

export const ProfileDetail = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 767px) {
    width: ${(props) => props.width};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
export const UserInfoEdit = styled.button`
  width: 86px;
  height: 22px;
  border-radius: 24px;
  border: 1px solid #333;
  background-color: transparent;
  text-align: center;
  font-size: 0.7rem;
  color: #333;
  cursor: pointer;
  @media (max-width: 767px) {
    width: 65px;
    font-size: 0.3rem;
  }
`;

export const UserDetail = styled.div`
  width: 45%;
  height: 60%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 767px) {
    width: 100%;
    font-size: 0.3rem;
    justify-content: center;
  }
`;

export const userInfoNumbers = styled.div`
  width: 20%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

export const MenuWrapper = styled.section`
  width: 100%;
  height: 156px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Menus = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 15px;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const Menu = styled.div`
  cursor: pointer;
`;

export const ActiveListWrapper = styled.section`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ActiveTitle = styled.div`
  cursor: pointer;
  margin-top: 5px;
  font-weight: 700;
  color: #333;
`;

export const ActiveImages = styled.div`
  width: 70%;
  height: 80%;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ActiveImage = styled.img<{ height: string }>`
  width: 400px;
  height: ${(props) => props.height};
  margin: 1%;
  border-radius: 24px;
  background-color: orange;
  @media (max-width: 767px) {
    width: 190px;
    height: 170px;
  }
`;

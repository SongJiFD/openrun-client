import styled from "@emotion/styled";

export const Wrapper = styled.footer`
  width: 95%;
  height: 300px;
  margin: auto;
  margin-top: 20px;
  background-color: #f7f7f7;
  @media (max-width: 767px) {
    height: 70px;
  }
`;

export const MenuWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 767px) {
    height: 100%;
    align-items: center;
  }
`;

export const Menu = styled.section`
  width: 50%;
  margin: 10%;
  color: #333;
  @media (max-width: 767px) {
    height: 60px;
    margin: 1%;
  }
`;

export const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  color: #909090;
`;

export const Info = styled.div`
  width: 33%;
`;

export const Text = styled.p<{ weight: string; color: string }>`
  margin-bottom: 3%;
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  font-size: 1rem;
  @media (max-width: 767px) {
    font-size: 0.5rem;
  }
`;

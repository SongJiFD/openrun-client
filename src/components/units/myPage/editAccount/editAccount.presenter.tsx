import BlackButton from "../../../../commons/button/black";
import WhiteButton from "../../../../commons/button/white";
import SignInput from "../../../../commons/input/sign";
import { IEditAccountProps } from "../myPage.types";
import * as s from "./editAccount.styles";

export default function EditAccountUI(props: IEditAccountProps) {
  return (
    <s.Wrapper>
      <form onSubmit={props.handleSubmit(props.onClickEdit)}>
        <s.MainWrapper>
          <s.ProfileImg />
          <s.ProfileInfo>
            <s.ProfileInfoDetail>
              <s.Title>로그인 정보</s.Title>
              <SignInput
                register={props.register}
                placeholder="이메일"
                color="#000000"
                width="100%"
                name="email"
                type="text"
              />
              <SignInput
                register={props.register}
                placeholder="비밀번호"
                color="#000000"
                width="100%"
                name="password"
                type="password"
              />
              <SignInput
                register={props.register}
                placeholder="비밀번호 확인"
                color="#000000"
                width="100%"
                name="password"
                type="password"
              />
            </s.ProfileInfoDetail>
            <s.ProfileInfoDetail>
              <s.Title>개인 정보</s.Title>
              <SignInput
                register={props.register}
                placeholder="닉네임"
                color="#000000"
                width="100%"
                name="nickname"
                type="text"
              />
              <SignInput
                register={props.register}
                placeholder="휴대폰번호"
                color="#000000"
                width="100%"
                name="phone"
                type="text"
              />
            </s.ProfileInfoDetail>
          </s.ProfileInfo>
        </s.MainWrapper>
        <s.ButtonWrapper>
          <BlackButton
            onClick={props.onClickEdit}
            type="submit"
            width="45%"
            fontWeight="700"
            title="변경하기"
          />
          <WhiteButton
            onClick={props.onClickCancel}
            type="submit"
            width="45%"
            fontWeight="700"
            title="취소하기"
          />
        </s.ButtonWrapper>
      </form>
    </s.Wrapper>
  );
}
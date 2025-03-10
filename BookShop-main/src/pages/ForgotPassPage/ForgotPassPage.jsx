import React from "react";
import {
    Wrapper,
    FormContainer,
    InputField,
    Button,
    Label,
    Required
} from "./style";

const ForgotPassPage = () => {
    return (
        <Wrapper>
            <FormContainer>
                <h2>Quên mật khẩu</h2>

                <Label>Số điện thoại <Required>(*)</Required></Label>
                <InputField type="text" placeholder="Nhập số điện thoại" />

                <Label>Mật khẩu mới <Required>(*)</Required></Label>
                <InputField type="password" placeholder="Nhập mật khẩu mới" />

                <Label>Nhập lại mật khẩu <Required>(*)</Required></Label>
                <InputField type="password" placeholder="Nhập lại mật khẩu" />

                <Button>Gửi yêu cầu</Button>
            </FormContainer>
        </Wrapper>
    );
};

export default ForgotPassPage;

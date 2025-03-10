import React from "react";
import { WrapperContainer, Title, Content } from "./style";
import ReviewComponent from "../ReviewComponent/ReviewComponent";

const DescribeComponent = () => {
    return (
        <div>
            <WrapperContainer>
                <Title>Giới thiệu:</Title>
                <Content>
                </Content>
            </WrapperContainer>
            <ReviewComponent />
        </div>

    );
};

export default DescribeComponent;

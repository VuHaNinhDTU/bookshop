import styled from "styled-components";

export const StyleNameProduct = styled.div`
    font-size: 16px;
    line-height: 1.4;
    color: #333;
    height: 44px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;

`;

export const WrapperReporttext = styled.div`
    font-size: 14px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    justify-content: space-between;
  

    span {
        display: flex;
        align-items: center;
        gap: 4px;
    }
`;

export const WrapperPrice = styled.div`
    font-size: 20px;
    color: rgb(255, 66, 78);
    font-weight: 600;
    display: flex;
    align-items: center;
    border-top: 1px solid #f0f0f0;

    &:after {
        content: 'đ';
        font-size: 16px;
        margin-left: 2px;
    }
`;

export const WrapperDiscountText = styled.span`
    color: rgb(255, 66, 78);
    font-size: 12px;
    margin-left: 4px;
`;
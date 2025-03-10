import styled from "styled-components";
import { Image } from "antd";

export const WrapperContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px;
`;

export const WrapperStyleNameProduct = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const WrapperStyleNamePublic = styled.span`
    font-size: 18px;
    color: #555;
`;

export const WrapperStyleNameAuthor = styled.span`
    font-size: 18px;
    font-weight: bold;
`;

export const WrapperStylePrice = styled.span`
    font-size: 24px;
    font-weight: bold;
    color: red;
`;

export const WrapperStyleBoldText = styled.span`
    font-size: 18px;
    font-weight: bold;
    margin-right: 5px;
`;

export const WrapperStyleImage = styled(Image)`
    width: 100%;
    max-width: 300px;
    border-radius: 10px;
`;

export const WrapperStyleImageSmall = styled(Image)`
    width: 100%;
    max-width: 50px;
    border-radius: 5px;
    margin: 5px;
`;

export const buttonStyle = {
    width: "50px",
    height: "50px",
    fontSize: "24px",
    fontWeight: "bold",
    backgroundColor: "#ff5722",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
};

export const quantityStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    minWidth: "60px",
    textAlign: "center",
    backgroundColor: "#f1f1f1",
    padding: "4px 20px",
    borderRadius: "8px",
    gap: "4px"
};

export const buyNowStyle = {
    backgroundColor: "#FFC107",
    color: "black",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
};

export const addToCartStyle = {
    backgroundColor: "#2196F3",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
};

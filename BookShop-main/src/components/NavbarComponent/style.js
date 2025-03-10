import styled from "styled-components";

export const WrapperLabelText = styled.div`
    color: #000;
    font-size: 16px;
    font-weight: 100;
    margin-bottom: 12px;
`;

export const WrapperContent = styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const WrapperItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 6px 10px;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    color: #555;
    cursor: pointer;
    background-color: white;
    coler: yellow;

    &:hover {
        background-color: #f5f5f5;
    }
`;

export const WrapperTextValue = styled.div`
    font-weight: 500;
`;

export const DropdownWrapper = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    width: 200px;
    z-index: 100;
    padding: 8px 0;
   
`;

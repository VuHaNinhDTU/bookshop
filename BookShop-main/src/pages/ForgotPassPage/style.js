import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f8f8f8;
`;

export const FormContainer = styled.div`
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    width: 450px;
    text-align: center;
`;

export const Label = styled.label`
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    margin-top: 15px;
`;

export const Required = styled.span`
    color: red;
    margin-left: 5px;
`;

export const InputField = styled.input`
    width: 100%;
    padding: 12px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
`;

export const Button = styled.button`
    width: 100%;
    padding: 12px;
    background: #64b5f6;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background: #42a5f5;
    }
`;

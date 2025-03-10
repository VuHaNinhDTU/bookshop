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
    width: 400px;
    text-align: center;
`;

export const InputField = styled.input`
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
`;

export const Button = styled.button`
    width: 100%;
    padding: 12px;
    background: ${({ disabled }) => (disabled ? "#ccc" : "#ff6f00")}; 
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")}; 
    margin-top: 10px;

    &:hover {
        background: ${({ disabled }) => (disabled ? "#ccc" : "#e65c00")}; 
    }
`;

export const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 16px;
    text-decoration: none;
    color: #007bff;
    font-weight: bold;

    div {
        display: flex;
        align-items: center;
        gap: 5px; /* Điều chỉnh khoảng cách giữa checkbox và chữ */
    }
`;





export const RegisterText = styled.span`
    margin-left: 5px;
    font-size: 16px;
    color: #ff6f00;  /* Đảm bảo màu cam */
    font-weight: bold;
    cursor: pointer; /* Thêm hiệu ứng hover */
    text-decoration: none; /* Đảm bảo không có gạch chân */
`;

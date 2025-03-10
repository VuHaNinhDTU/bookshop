import styled from "styled-components";

export const ShoppingCartWrapper = styled.div`
    width: 80%;
    margin: auto;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    font-size: 18px; /* Tăng kích thước chữ tổng thể */
`;

export const ProductTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;

    th, td {
        padding: 12px;
        border-bottom: 1px solid #ddd;
        text-align: center;
        font-size: 18px; /* Tăng cỡ chữ bảng */
    }

    th {
        background: #f5f5f5;
        font-weight: bold;
    }
`;

export const ProductImage = styled.img`
    width: 80px; /* Tăng kích thước ảnh */
    height: auto;
    border-radius: 4px;
`;

export const QuantityInput = styled.input`
    width: 60px;
    padding: 5px;
    text-align: center;
    font-size: 18px; /* Tăng cỡ chữ input */
`;

export const NoteTextarea = styled.textarea`
    width: 100%;
    height: 80px; /* Tăng chiều cao */
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 18px; /* Tăng cỡ chữ */
`;

export const TotalPrice = styled.div`
    font-size: 22px; /* Tăng cỡ chữ tổng giá */
    font-weight: bold;
    text-align: right;
    margin: 20px 0;
`;

export const ContinueShoppingButton = styled.button`
    background: transparent;
    border: 2px solid #02bbff;
    color: #02bbff;
    padding: 12px 18px;
    font-size: 18px; /* Tăng cỡ chữ */
    cursor: pointer;
    border-radius: 5px;
    margin-right: 10px;
    transition: 0.3s;

    &:hover {
        background: #02bbff;
        color: white;
    }
`;

export const CheckoutButton = styled.button`
    background: #02bbff;
    border: none;
    color: white;
    padding: 12px 18px;
    font-size: 18px; /* Tăng cỡ chữ */
    cursor: pointer;
    border-radius: 5px;
    transition: 0.3s;

    &:hover {
        background: red;
    }
`;
export const ProductRow = styled.tr`
    td {
        vertical-align: middle;
        text-align: center;
        font-size: 18px;
        padding: 12px;
    }

    td:first-child { 
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: flex-start;
        text-align: left;
    }
`;

export const WrapperStyleHeader = styled.div`
    margin-bottom: 20px;
    h2 {
        font-size: 24px;
        font-weight: 500;
        margin: 0;
    }
`;

export const WrapperLeft = styled.div`
    background: #fff;
    border-radius: 6px;
    height: 100%;
`;

export const WrapperListProduct = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const WrapperItemProduct = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 6px;

    &:hover {
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
`;

export const WrapperPriceProduct = styled.div`
    color: #ff4d4f;
    font-size: 16px;
    font-weight: 500;
    margin-top: 8px;
`;

export const WrapperCountProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;

    button {
        border-radius: 4px;
        transition: all 0.3s ease;

        &:hover:not(:disabled) {
            background-color: #f5f5f5;
        }
    }
`;

export const WrapperRight = styled.div`
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
    padding: 16px;
    position: sticky;
    top: 20px;
`;

export const WrapperInfo = styled.div``;

export const WrapperTotal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
`;

export const CustomButton = styled.button`
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
        opacity: 0.9;
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }
`;


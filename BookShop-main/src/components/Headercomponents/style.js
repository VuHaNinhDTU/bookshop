import styled from "styled-components";

export const WrapperHeader = styled.div`
    width: 100%;
    background-color: #02bbff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    height: 70px;
    height: 100px;
`;

export const HeaderContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 120px;
`;

export const WrapperTextHeader = styled.div`
    color: yellow;
    font-size: 30px;
    font-weight: bold;
    flex-shrink: 0;
`;

export const SearchContainer = styled.div`
    flex: 1;
    padding: 0 100px;
`;

export const RightContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

export const WrapperTextHeaderAccout = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .user-icon {
        font-size: 24px;
        color: #fff;
    }
`;

export const WrappertextheaderSmall = styled.div`
    .login-text {
        color: #fff;
        font-size: 20px;
        font-weight: 500;
        &:hover {
            color: yellow;
        }
    }

    .account-text {
        color: #fff;
        font-size: 12px;
        opacity: 0.9;
    }
`;

export const CartContainer = styled.div`
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 8px;
    position: relative;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.1);
    min-width: 120px;

    a {
        display: flex !important;
        align-items: center !important;
        gap: 8px;
        text-decoration: none !important;
    }

    .cart-icon {
        font-size: 24px;
        color: #fff;
        transition: color 0.3s ease;
    }

    .cart-text {
        color: #fff;
        font-size: 16px;
        font-weight: 500;
        white-space: nowrap;
        transition: color 0.3s ease;
    }

    .cart-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background-color: #ff4d4f;
        color: white;
        border-radius: 50%;
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        border: 2px solid #02bbff;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

        .cart-icon, .cart-text {
            color: #ffd700;
        }
    }

    &:active {
        transform: translateY(0);
    }
`;

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    padding: 8px 12px;
    margin: 0;
    &:hover {
        background: #f5f5f5;
        color: #02bbff;
    }
`

import styled from "styled-components";

export const FooterContainer = styled.footer`
    
    background-color: white;
    padding: 40px 5%;
    display: flex;
    flex-direction: column;
`;

export const FooterTop = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 40px;
    border-bottom: 1px solid #ccc;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`;

export const FooterBottom = styled.div`
    text-align: center;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center; /* Căn giữa nội dung */
    justify-content: center;
`;


export const Column = styled.div`
    flex: 1;
    min-width: 220px;
    max-width: 350px;
    margin: 20px;

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

export const Title = styled.h3`
    font-size: 22px; /* Tiêu đề cố định 22px */
    color: #333;
    margin-bottom: 18px;
    font-weight: bold;
`;

export const List = styled.ul`
    list-style: none;
    padding: 0;
`;

export const ListItem = styled.li`
    font-size: 18px; /* Kích thước danh sách cố định 18px */
    color: #666;
    margin-bottom: 10px;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

export const SocialLinks = styled.div`
    display: flex;
    gap: 16px;
    justify-content: center; /* Căn giữa các link */
    align-items: center;
    width: 100%;
`;


export const SocialLink = styled.a`
    text-decoration: none;
    font-size: 20px; /* Kích thước link mạng xã hội 20px */
    color: #007bff;
    font-weight: 600;
    justify-content: center;
    &:hover {
        color: #0056b3;
    }
`;


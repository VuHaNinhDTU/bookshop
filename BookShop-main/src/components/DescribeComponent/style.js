import styled from "styled-components";

export const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  font-size: 1.02vw;
  word-spacing: 5px;
  text-align: justify;
  padding: 20px;
`;

export const Title = styled.div`
  height:32px;
  font-size: 24px;
  color: #2b2b2b;
  border-bottom: 0.144vw solid #77d4f6;
  width: 100%;
  margin-bottom: 10px;
  font-weight: bold; /* hoặc giá trị số như 600, 700 */
`;

export const Content = styled.div`
  font-size: 1.02vw;
  color: #333;
  line-height: 1.6;
  text-align: justify;
  padding-left: 20px; /* Thêm khoảng cách giữa nội dung và lề trái */
  padding-right: 20px; /* Thêm khoảng cách bên phải */
  width: 100%;
`;

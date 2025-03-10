import styled from "styled-components";
import ButtomComponent from "../../components/ButtomComponent/ButtomComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: flex-start;
    border-bottom: 1px solid red;
    font-size: 18px;
    font-weight: 700;
    font-family: Merriweather;
    height: 40px;
    margin-top: 100px;
    color: white;
    cursor: pointer;
`
export const WrapperButtonMore = styled(ButtomComponent)`
  &:hover {
    background-color: #02bbff;
    color: white;
    span {
      color: white;
    }
}
`
export const WrapperProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`;

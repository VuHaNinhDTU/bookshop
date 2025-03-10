import styled from "styled-components";

export const WrapperReviewContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CommentInputWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 10px;
  
  input {
    flex: 1;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }

  button {
    background-color: #1890ff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
  }
`;

export const CommentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;

  strong {
    color: #333;
  }

  p {
    margin: 0;
    color: #555;
  }
`;

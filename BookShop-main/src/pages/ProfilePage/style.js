import Upload from "antd/es/upload/Upload";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 20px;
`;

export const WrapperContentProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  width: 100%;
`;

export const WrapperProfile = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const AvatarUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  .avatar-preview {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 10px;
    object-fit: cover;
    border: 2px solid #ddd;
  }
`;

export const FormItemWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 10px; /* Khoảng cách giữa input và button */
  width: 100%;

  form {
    display: flex;
    align-items: flex-end;
    width: 100%;
  }

  .ant-form-item {
    flex: 1; /* Input mở rộng tối đa */
    margin-bottom: 0; /* Xóa khoảng cách giữa các form item */
  }

  .ant-input {
    width: 500px;
    height: 40px; /* Tăng chiều cao cho input */
  }

  button {
    width: 90px; /* Đảm bảo nút có kích thước cố định */
    height: 40px; /* Đồng bộ chiều cao với input */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px
  }
`;
export const WrapperUploadFile = styled(Upload)`
  & .ant-upload-list-item-container{
    display: none;
  }
`

import React from 'react';
import { Button, Modal } from 'antd';

const { confirm } = Modal;

const TestModal = () => {
  const showConfirm = () => {
    confirm({
      title: 'Test Modal',
      content: 'Nếu bạn thấy hộp thoại này, Modal.confirm() đang hoạt động!',
      okText: 'OK',
      cancelText: 'Cancel',
      onOk: () => console.log("User clicked OK"),
      onCancel: () => console.log("User clicked Cancel")
    });
  };

  return (
    <Button onClick={showConfirm}>
      Show Test Modal
    </Button>
  );
};

export default TestModal;

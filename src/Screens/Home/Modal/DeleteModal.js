import React from 'react';
import { Modal, message } from 'antd';
import { useSelector } from 'react-redux';
import { deleteuser } from '../../../axios/services';
import { useToken } from '../../../utility/hooks';

export default function DeleteModal({ listapical,close }) {
  const selector = useSelector((state) => state.auth);
  const token = useToken();
  
  const handleOk = () => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("userId", selector.user_id);
    
    deleteuser(formData)
      .then((response) => {
        console.log(response.data);
        message.success(response.data.msg)
            listapical(); 
            close();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
   close();
  };

  return (
    <>
      <Modal
        title="Confirm Deletion"
        centered
        open={true}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </>
  );
}

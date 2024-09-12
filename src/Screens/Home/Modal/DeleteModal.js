import React from 'react';
import { Modal, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { handleMessage, handleShowDeleteModal } from '../../../redux/reducers/AuthReducers';
import { deleteuser } from '../../../axios/services';

export default function DeleteModal({ listapical }) {
  const selector = useSelector((state) => state.auth);
  const data = useSelector((state) => state.login);
  const dispatch = useDispatch();
  
  const handleOk = () => {
    const formData = new FormData();
    formData.append("token", data.token);
    formData.append("userId", selector.user_id);
    
    deleteuser(formData)
      .then((response) => {
        console.log(response.data);
        message.success(response.data.msg).then(() => {
          if(response.data.status)
          {
            dispatch(handleShowDeleteModal(false));
            listapical(); 
          }
        });
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    dispatch(handleShowDeleteModal(false));
  };

  return (
    <>
    
      <Modal
        title="Confirm Deletion"
        centered
        open={selector.showDeleteModal}
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

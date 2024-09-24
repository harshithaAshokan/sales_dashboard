import React from 'react';
import { Modal, message } from 'antd';
import { useSelector } from 'react-redux';
import { deleteuser } from '../../../../axios/services';
import { useToken } from '../../../../utility/hooks';
import { storeDataProps } from '../../../../type/reducer';
import { userFilterprops } from '../../../../type/filter';
import { current } from '@reduxjs/toolkit';

interface formValues {
  listapical : (page:number,size:number,value:userFilterprops) => void
  close:() => void
  current:number
}



export default function DeleteModal({ listapical,close,current }:formValues) {
  const selector = useSelector((state:storeDataProps) => state.auth);
  const token = useToken();
  const filterValue = {
    userName: "",
      email: "",
      phoneNumber: "",
      dealer_id: "",
  }
  const handleOk = () => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("userId", selector.user_id);
    
    deleteuser(formData)
      .then((response) => {
        console.log(response.data);
        if(response.data.status){
          message.success(response.data.msg)
        }
        else {
          message.error(response.data.msg)
        }
            listapical(current,10,filterValue); 
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

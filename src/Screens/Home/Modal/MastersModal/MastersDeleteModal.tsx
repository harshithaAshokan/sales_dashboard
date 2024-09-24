import React from 'react';
import { Modal, message } from 'antd';
import { useSelector } from 'react-redux';
import { deleteMasters} from '../../../../axios/services';

import { useToken } from '../../../../utility/hooks';
import { storeDataProps } from '../../../../type/reducer';
import { masterFilterProps } from '../../../../type/filter';
interface formValues {
  listapical : (page:number,size:number,value:masterFilterProps) => void
  value:string
  close:() => void
  current:number
}



export default function MastersDeleteModal({ listapical,value,close ,current}:formValues) {
  const selector = useSelector((state:storeDataProps) => state.auth);
  const token = useToken();
  const filterValue = {
    name:""
  }
  
  const handleOk = () => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("dataId", selector.user_id);
    
    deleteMasters(formData,value)
      .then((response) => {
        console.log(response.data);
        if(response.data.status){
          message.success(response.data.msg)
        }
        else {
          message.error(response.data.msg)
        }
           close();
            listapical(current,10,filterValue); 
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

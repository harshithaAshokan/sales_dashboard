import React from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { handleShowIsActiveModal } from '../../../../redux/reducers/AuthReducers';
import { hotLead } from '../../../../axios/services';
import { useToken } from '../../../../utility/hooks';


export default function IsActiveModal({ listapical,isActive }) {
  const selector = useSelector((state) => state.auth);
  const token = useToken();
  const dispatch = useDispatch();
    const handleOk = () => {
    isActive = (isActive === 0) ? 1 : 0;  
    const formData = new FormData();
    formData.append("token", token);
    formData.append("leadId", selector.user_id);
    formData.append("isActive", isActive);

    hotLead(formData)
      .then((response) => {
        console.log(response);
        listapical();  // Call the parent function to refresh the lead list
      })
      .catch((err) => {
        console.log(err);
      });
    
    dispatch(handleShowIsActiveModal(false));  // Close the modal after action
  };

  const handleCancel = () => {
    dispatch(handleShowIsActiveModal(false));  // Close the modal on cancel
  };

  return (
    <>
      <Modal
        title="CHANGE PRIORITY"
        centered
        open={selector.showIsActiveModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to {isActive == "1" ? 'remove' : 'add'} the priority?</p>
      </Modal>
    </>
  );
}

import React from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { handleShowIsActiveModal } from '../../../../redux/reducers/AuthReducers';
import { hotLead } from '../../../../axios/services';

export default function IsActiveModal({ listapical }) {
  const selector = useSelector((state) => state.auth);
  const data = useSelector((state) => state.login);
  const dispatch = useDispatch();
   console.log(selector.isActive,"ACTIVE")
    const handleOk = () => {
    let isActive = selector.isActive == "0" ? "1" : "0";  
     console.log(isActive,"after")
    const formData = new FormData();
    formData.append("token", data.token);
    formData.append("leadId", selector.dealer_ids);
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
        <p>Are you sure you want to {selector.isActive == "1" ? 'remove' : 'add'} the priority?</p>
      </Modal>
    </>
  );
}

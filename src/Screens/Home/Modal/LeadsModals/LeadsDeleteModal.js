import React from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { handleShowDeleteModal } from '../../../../redux/reducers/AuthReducers';
import { deleteLead } from '../../../../axios/services';
export default function LeadsDeleteModal({listapical}) {

    const selector = useSelector((state) => state.auth);
    const data = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const handleOk = () =>{
        const formData = new FormData();
        formData.append("token",data.token)
        formData.append("leadId",selector.user_id)
        deleteLead(formData).then((response) => {
            console.log(response.data);
            listapical();
            dispatch(handleShowDeleteModal(false))     
        }).catch((err) => {
            console.log(err)
        })
        
    }
    const handleCancel = () => {
        dispatch(handleShowDeleteModal(false))
    }
    return (
      <>
        <Modal
          title="DELETE LEAD"
          centered
          open={selector.showDeleteModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
         <p>Are you sure to delete the user?</p>
        </Modal>
      </>
    );
}


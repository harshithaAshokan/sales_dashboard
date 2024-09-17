import React from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { deleteLead } from '../../../../axios/services';
import { useToken } from '../../../../utility/hooks';
export default function LeadsDeleteModal({listapical,close}) {

    const selector = useSelector((state) => state.auth);
    const token = useToken();
   
    const handleOk = () =>{
        const formData = new FormData();
        formData.append("token",token)
        formData.append("leadId",selector.user_id)
        deleteLead(formData).then((response) => {
            console.log(response.data);
            listapical();
            close();    
        }).catch((err) => {
            console.log(err)
        })
        
    }
    const handleCancel = () => {
        close();
    }
    return (
      <>
        <Modal
          title="DELETE LEAD"
          centered
          open={true}
          onOk={handleOk}
          onCancel={handleCancel}
        >
         <p>Are you sure to delete the user?</p>
        </Modal>
      </>
    );
}


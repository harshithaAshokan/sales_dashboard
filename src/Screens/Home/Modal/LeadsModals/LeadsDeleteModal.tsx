import React from 'react';
import { message, Modal } from 'antd';
import { useSelector } from 'react-redux';
import { deleteLead } from '../../../../axios/services';
import { useToken } from '../../../../utility/hooks';
import { storeDataProps } from '../../../../type/reducer';
import { leadFilterProps } from '../../../../type/filter';

interface formValues {
  listapical:(page:number,size:number,value:leadFilterProps) => void
  close:() => void
  current:number
}

export default function LeadsDeleteModal({listapical,close,current}:formValues) {

    const selector = useSelector((state:storeDataProps) => state.auth);
    const token = useToken();
    const filterValues = {
      phone: "",
        name: "",
        lead_status: "",
        lead_id: "",
        hot_lead: "",
    }
    const handleOk = () =>{
        const formData = new FormData();
        formData.append("token",token)
        formData.append("leadId",selector.user_id)
        deleteLead(formData).then((response) => {
            console.log(response.data);
            if(response.data.status){
              message.success(response.data.msg)
            }
            else {
              message.error(response.data.msg)
            }
            listapical(current,10,filterValues);
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


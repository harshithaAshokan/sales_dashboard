import { message, Modal } from "antd";
import { useSelector } from "react-redux";
import { hotLead } from "../../../../axios/services";
import { useToken } from "../../../../utility/hooks";
import { storeDataProps } from "../../../../type/reducer";
import { leadFilterProps } from "../../../../type/filter";

interface formValues {
  listapical : (page:number,size:number,values:leadFilterProps) => void
  isActive:number
  close:() => void
  current:number
}

const filterValues = {
    phone: "",
    name: "",
    lead_status: "",
    lead_id: "",
    hot_lead: "",
}

export default function IsActiveModal({ listapical, isActive,close,current }:formValues) {
  const selector = useSelector((state:storeDataProps) => state.auth);
  const token = useToken();
  const handleOk = () => {
    const isActiveValue:string = (isActive === 0 ? 1 : 0).toString();
    console.log("isActiveValue",isActiveValue)
    const formData = new FormData();
    formData.append("token", token);
    formData.append("leadId", selector.user_id);
    formData.append("isActive", isActiveValue);
    hotLead(formData)
      .then((response) => {
        console.log(response.data.msg);
        if(response.data.status)
        {
          message.success(response.data.msg)
        } 
        else
        {
           message.error(response.data.msg)
        }
        listapical(current,10,filterValues); 
      })
      .catch((err) => {
        console.log(err);
      });

    close();
  };

  const handleCancel = () => {
    close();
  };

  return (
    <>
      <Modal
        title="CHANGE PRIORITY"
        centered
        open={true}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Are you sure you want to {isActive === 1 ? "remove" : "add"} the
          priority?
        </p>
      </Modal>
    </>
  );
}

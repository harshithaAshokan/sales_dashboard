import React, { useEffect, useState } from 'react';
import { Modal,Select,Form, message } from 'antd';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { dealerDropdown, employeeDropdown, leadReassign } from '../../../../axios/services';
import { useToken, useType } from '../../../../utility/hooks';
import { arrayProps, reassignProps } from '../../../../type/leads';
import { storeDataProps } from '../../../../type/reducer';
import { leadFilterProps } from '../../../../type/filter';

interface formValues {
  listapical:(page:number,size:number,value:leadFilterProps) => void
  close:() => void
  current:number
}

export default function Reassignmodal({listapical,close,current}:formValues) {

    const selector = useSelector((state:storeDataProps) => state.auth);
    const token = useToken();
    const [dealerId,setDealerId] = useState<arrayProps[]>([])
    const [employeeId,setEmployeeId] = useState<arrayProps[]>([])
    const userType = useType();
    const filterValues = {
      phone: "",
        name: "",
        lead_status: "",
        lead_id: "",
        hot_lead: "",
    }
    const handleOk = (values:reassignProps) =>{
       const formData = new FormData();
       formData.append("token",token)
       formData.append("leadId",selector.user_id)
       formData.append("employeeId",values.employeeId)
       if(userType !== "3")
        {
          formData.append("dealer_id", values.dealerId);
        } 
      else 
      {
        formData.append("dealer_id",String(localStorage.getItem("userId")))
      }
       leadReassign(formData).then((response) => {
        console.log(response.data,"result");
        if(response.data.status){
          message.success(response.data.msg)
        }
        else {
          message.error(response.data.msg)
        }
        listapical(current,10,filterValues);
       close();
       }).catch((err) => {
        console.log(err);
       })
        
    }
    const handleCancel = () => {
       close();
    }

    const userValidationSchema = Yup.object({
        employeeId: Yup.string(),
        delaerId:Yup.string()
        
      });
    
      const {values,handleSubmit,touched,errors,setFieldTouched,setFieldValue} = useFormik({
        initialValues: {
          employeeId: "",
          dealerId:""
        },
        validationSchema: userValidationSchema,
        onSubmit: (values:reassignProps) => 
        {
            handleOk(values);
        }
      });

      useEffect(() => {
        const formData = new FormData();
        formData.append("token",token)
        formData.append("isDealer","1");
        dealerDropdown(formData).then((res) => {
          console.log(res.data.data)
          setDealerId(res.data.data)
        })
      },[])

      useEffect(() => {
        if(userType === "3" || ((values?.dealerId != "") && (values?.dealerId != undefined)) ) {
          const formData = new FormData();
        formData.append("token",token)
        if(userType !== "3")
          {
            formData.append("dealer_id", values.dealerId);
          } 
        else 
        {
          formData.append("dealer_id",String(localStorage.getItem("userId")))
        }
        employeeDropdown(formData).then((res) => {
          console.log(res.data.data)
          setEmployeeId(res.data.data)
        })
        }
      },[values?.dealerId,userType])

      const handleValues = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 
        handleSubmit();
      };

    return (
      <>
        <Modal
          title="Reassign"
          centered
          open={true}
          onOk={handleValues}
          onCancel={handleCancel}
        >
         <Form>
       
        
     
{userType !== "3" && (<Form.Item
  name="dealerId"
  label="Dealer"
  validateStatus={touched.dealerId && errors.dealerId? "error" : ""}
  help={touched.dealerId && errors.dealerId? errors.dealerId : ""}
>
  <Select
    placeholder="Select Dealer"
    value={values?.dealerId}
    onChange={(value) => setFieldValue("dealerId", value)}
    onBlur={() => setFieldTouched("dealerId", true)}
    allowClear
  >
    {dealerId?.map((item:arrayProps) => (
      <Select.Option key={item?.userId} value={item?.userId}>
        {item?.userName}
      </Select.Option>
    ))}
  </Select>
</Form.Item>  )}

<Form.Item
  name="employeeId"
  label="Employee"
  validateStatus={touched.employeeId && errors.employeeId ? "error" : ""}
  help={touched.employeeId && errors.employeeId ? errors.employeeId : ""}
>
  <Select
    placeholder="Select Employee"
    value={values?.employeeId}
    onChange={(value) => setFieldValue("employeeId", value)}
    onBlur={() => setFieldTouched("employeeId", true)}
    allowClear
    disabled={values?.dealerId === "" && (userType === "2" || userType === "1")}
  >
    {employeeId?.map((item:arrayProps) => (
      <Select.Option key={item?.userId} value={item?.userId}>
        {item?.userName}
      </Select.Option>
    ))}
  </Select>
</Form.Item>  
      </Form>
        </Modal>
      </>
    );
}




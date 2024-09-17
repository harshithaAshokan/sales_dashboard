import React, { useEffect, useState } from 'react';
import { Modal,Select,Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { dealerDropdown, employeeDropdown, leadReassign } from '../../../../axios/services';
import { useToken } from '../../../../utility/hooks';
export default function Reassignmodal({listapical,close}) {

    const selector = useSelector((state) => state.auth);
    const token = useToken();
    const [dealerId,setDealerId] = useState([])
    const [employeeId,setEmployeeId] = useState([])
    const handleOk = (values) =>{
       const formData = new FormData();
       formData.append("token",token)
       formData.append("leadId",selector.user_id)
       formData.append("employeeId",values.employeeId)
    formData.append("dealerId",values.dealerId)
       leadReassign(formData).then((res) => {
        console.log(res.data,"result");
        listapical();
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
    
      const {values,handleBlur,handleChange,handleSubmit,touched,errors,setFieldTouched,setFieldValue} = useFormik({
        initialValues: {
          employeeId: "",
          dealerId:""
        },
        validationSchema: userValidationSchema,
        onSubmit: (values) => 
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
        if(values.dealerId != "") {
          const formData = new FormData();
        formData.append("token",token)
        formData.append("dealerId",values.dealerId);
        employeeDropdown(formData).then((res) => {
          console.log(res.data.data)
          setEmployeeId(res.data.data)
        })
        }
        
      },[values.dealerId])

    return (
      <>
        <Modal
          title="Reassign"
          centered
          open={true}
          onOk={handleSubmit}
          onCancel={handleCancel}
        >
         <Form>
       
        
     
<Form.Item
  name="dealerId"
  label="Dealer"
  validateStatus={touched.dealerId && errors.dealerId? "error" : ""}
  help={touched.dealerId && errors.dealerId? errors.dealerId : ""}
>
  <Select
    placeholder="Select Dealer"
    value={values.dealerId}
    onChange={(value) => setFieldValue("dealerId", value)}
    onBlur={() => setFieldTouched("dealerId", true)}
    allowClear
  >
    {dealerId?.map((item) => (
      <Select.Option key={item.userId} value={item.userId}>
        {item.userName}
      </Select.Option>
    ))}
  </Select>
</Form.Item>  

<Form.Item
  name="employeeId"
  label="Employee"
  validateStatus={touched.employeeId && errors.employeeId ? "error" : ""}
  help={touched.employeeId && errors.employeeId ? errors.employeeId : ""}
>
  <Select
    placeholder="Select Employee"
    value={values.employeeId}
    onChange={(value) => setFieldValue("employeeId", value)}
    onBlur={() => setFieldTouched("employeeId", true)}
    allowClear
    disabled={values.dealerId === ""}
  >
    {employeeId?.map((item) => (
      <Select.Option key={item.userId} value={item.userId}>
        {item.userName}
      </Select.Option>
    ))}
  </Select>
</Form.Item>  
      </Form>
        </Modal>
      </>
    );
}




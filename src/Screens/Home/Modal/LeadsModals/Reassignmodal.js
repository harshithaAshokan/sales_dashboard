import React, { useEffect, useState } from 'react';
import { Modal,Select,Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { handleDealerId, handleEmployeeId, handleReassign, handleUpdateStatusModal } from '../../../../redux/reducers/AuthReducers';
import { dealerDropdown, employeeDropdown, leadReassign } from '../../../../axios/services';
import { useToken } from '../../../../utility/hooks';
export default function Reassignmodal({listapical}) {

    const selector = useSelector((state) => state.auth);
    const token = useToken();
    const dispatch = useDispatch();
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
        dispatch(handleReassign(false));
       }).catch((err) => {
        console.log(err);
       })
        
    }
    const handleCancel = () => {
        dispatch(handleReassign(false));
    }

    const userValidationSchema = Yup.object({
        employeeId: Yup.string(),
        delaerId:Yup.string()
        
      });
    
      const formik = useFormik({
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
        if(formik.values.dealerId != "") {
          const formData = new FormData();
        formData.append("token",token)
        formData.append("dealerId",formik.values.dealerId);
        employeeDropdown(formData).then((res) => {
          console.log(res.data.data)
          setEmployeeId(res.data.data)
        })
        }
        
      },[formik.values.dealerId])

    return (
      <>
        <Modal
          title="Reassign"
          centered
          open={selector.reassignlead}
          onOk={formik.handleSubmit}
          onCancel={handleCancel}
        >
         <Form>
       
        
     
<Form.Item
  name="dealerId"
  label="Dealer"
  validateStatus={formik.touched.dealerId && formik.errors.dealerId? "error" : ""}
  help={formik.touched.dealerId && formik.errors.dealerId? formik.errors.dealerId : ""}
>
  <Select
    placeholder="Select Dealer"
    value={formik.values.dealerId}
    onChange={(value) => formik.setFieldValue("dealerId", value)}
    onBlur={() => formik.setFieldTouched("dealerId", true)}
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
  validateStatus={formik.touched.employeeId && formik.errors.employeeId ? "error" : ""}
  help={formik.touched.employeeId && formik.errors.employeeId ? formik.errors.employeeId : ""}
>
  <Select
    placeholder="Select Employee"
    value={formik.values.employeeId}
    onChange={(value) => formik.setFieldValue("employeeId", value)}
    onBlur={() => formik.setFieldTouched("employeeId", true)}
    allowClear
    disabled={formik.values.dealerId === ""}
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




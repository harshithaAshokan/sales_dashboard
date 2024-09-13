import React, { useEffect, useState } from "react";
import { Modal, Form,Input,message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { createMasters, updateMasters} from "../../../../axios/services";
import { handleShowAddModal, handleShowUpdateModal } from "../../../../redux/reducers/AuthReducers";
import { useToken } from "../../../../utility/hooks";

export default function MastersAddModal({listapical,value}) {
  const dispatch = useDispatch();
 
  const token = useToken();
  const selector = useSelector((state) => state.auth);
  
  const handleCancel = () => {
    console.log("Clicked cancel button");
    dispatch(handleShowAddModal(false));
    dispatch(handleShowUpdateModal(false));
  };

  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
  };

  console.log(selector.dealer_ids)

  const handleUpdateList = () => {
    if(value === 'category')
    {
        const List = selector.categoryList?.find((ele) => ele.customerCategoryId === selector.user_id)
       formik.setValues({
      name:List.customerCategoryName
    })

    }
    if(value === 'Enquiry')
        {
            const List = selector.enquiryListData?.find((ele) => ele.enquireId === selector.user_id)
           formik.setValues({
          name:List.enquireTypeName
        })
    
        }
        if(value === 'requirements')
            {
                const List = selector.requirementsList?.find((ele) => ele.RequirementsId === selector.user_id)
               formik.setValues({
              name:List.RequirementsName
            })
        
            }
    
  }
  
  const handleCreateUser = (values) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("name", values.name);
    if(selector.showAddModal)
    {
      
       createMasters(formData,value)
      .then((response) => {
        console.log("API response:", response.data);
        listapical();
        message.success(response.data.msg)
          if(response.data.status)
          {
            handleCancel();
          }
      })
      .catch((err) => {
        console.error("API error:", err);
      }); 
    }
      if(selector.showUpdateModal)
        {
            formData.append("dataId",selector.user_id)
            updateMasters(formData,value).then((response) => {
                console.log("API response:", response.data);
    listapical();
    message.success(response.data.msg)
      if(response.data.status)
      {
        handleCancel();
      }
            })
        } 
  };

  const userValidationSchema = Yup.object({
    name: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets").required("Name is required"),
    
  });

  const formik = useFormik({
    initialValues: {
      
      name: "",
      
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => 
    {
        handleCreateUser(values);
    }
  });

  useEffect(() => {
    if(selector.showUpdateModal) {
       handleUpdateList(); 
    }
  },[selector.showUpdateModal])

 
  

  return (
    <>
  
    <Modal
      title={"ADD DETAILS"}
      open={selector.showAddModal||selector.showUpdateModal}
      onOk={formik.handleSubmit}
      onCancel={handleCancel}
    >
      <Form
        {...formItemLayout}
        
        style={{ maxWidth: 600 }}
      >
       
        <InputField
          formik={formik}
          name="name"
          label="Name"
          placeholder="Enter Name"
        />
      </Form>
    </Modal>
    </>
  );
}

function InputField({ formik, label, name, type = "text", placeholder }) {
  return (
    <>
      <Form.Item
        label={label}
        validateStatus={formik.touched[name] && formik.errors[name] ? "error" : ""}
        help={formik.touched[name] && formik.errors[name] ? formik.errors[name] : ""}
      >
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Form.Item>
    </>
  );
}


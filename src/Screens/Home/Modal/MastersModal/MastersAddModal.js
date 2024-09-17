import React, { useEffect } from "react";
import { Modal, Form,Input,message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import {useSelector } from "react-redux";

import { createMasters, updateMasters} from "../../../../axios/services";

import { useToken } from "../../../../utility/hooks";

export default function MastersAddModal({listapical,value,close,add,update}) {
  
 
  const token = useToken();
  const selector = useSelector((state) => state.auth);
  
  const handleCancel = () => {
   close();
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
       setValues({
      name:List.customerCategoryName
    })

    }
    if(value === 'Enquiry')
        {
            const List = selector.enquiryListData?.find((ele) => ele.enquireId === selector.user_id)
           setValues({
          name:List.enquireTypeName
        })
    
        }
        if(value === 'requirements')
            {
                const List = selector.requirementsList?.find((ele) => ele.RequirementsId === selector.user_id)
               setValues({
              name:List.RequirementsName
            })
        
            }
    
  }
  
  const handleCreateUser = (values) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("name", values.name);
    if(add)
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
      if(update)
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

  const {values,errors,touched,handleBlur,handleChange,handleSubmit,setValues} = useFormik({
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
    if(update) {
       handleUpdateList(); 
    }
  },[update])

 
  

  return (
    <>
  
    <Modal
      title={update?"EDIT DETAILS":"ADD DETAILS"}
      open={true}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form
        {...formItemLayout}
        
        style={{ maxWidth: 600 }}
      >
       
        <InputField
          name="name"
          label="Name"
          placeholder="Enter Name"
          value={values.name}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Form>
    </Modal>
    </>
  );
}

function InputField({ label, name, type = "text", placeholder,value,touched,errors,handleBlur,handleChange }) {
  return (
    <>
      <Form.Item
        label={label}
        validateStatus={touched[name] && errors[name] ? "error" : ""}
        help={touched[name] && errors[name] ? errors[name] : ""}
      >
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form.Item>
    </>
  );
}


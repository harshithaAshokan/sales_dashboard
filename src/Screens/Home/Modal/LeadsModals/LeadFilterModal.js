import React from 'react';
import { Button, Form, Input, Space, theme } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { handleSearch } from '../../../../redux/reducers/AuthReducers';



const LeadFilterModal = () => {

  const dispatch = useDispatch();
  const userValidationSchema = Yup.object({
    
    name: Yup.string(),
    lead_status: Yup.number(),
    lead_id:Yup.number(),
    hot_lead:Yup.number(),
    phone: Yup.string().matches(/^[6789][0-9]{9}$/, 'Number must be 10 digits'),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      phone:"",
      name:"",
      lead_status:"",
      lead_id:"",
      hot_lead:""
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      console.log('Form values on submit:', values);
      dispatch(handleSearch(values));
      handleReset();
    },
  });

  
  const handleReset = () => {
    formik.resetForm(); 
    
  };

  return (
    <>
      <Form
       
        name="advanced_search"
        onFinish={formik.handleSubmit} 
      >
      
        <InputField
          formik={formik}
          name="name"
          label="Name"
          placeholder="Enter Name"
        />

        
          <InputField
          formik={formik}
          name="lead_id"
          label="Lead ID"
          type="number"
          placeholder="Enter Lead ID"
        />
        
        

        {/* Phone Number Field */}
        <InputField
          formik={formik}
          name="phone"
          label="Phone Number"
          placeholder="Enter Phone Number"
        />

        {/* Email Field */}
        <InputField
          formik={formik}
          name="lead_status"
          label="Lead Status"
          placeholder="Enter Lead Status"
        />

      <InputField
          formik={formik}
          name="hot_lead"
          label="Hot Lead"
          placeholder="Enter Hot Lead"
        />

        <Space size="small">
          {/* Search Button */}
          <Button type="primary" htmlType="submit">
            Search
          </Button>

          {/* Clear Button */}
          <Button htmlType="button" onClick={handleReset}>
            Clear
          </Button>
        </Space>
      </Form>
    </>
  );
};

export default LeadFilterModal;

function InputField({ formik, label, name, type = 'text', placeholder }) {
  return (
    <Form.Item
      label={label}
      name={name}
      validateStatus={formik.touched[name] && formik.errors[name] ? 'error' : ''}
      help={formik.touched[name] && formik.errors[name] ? formik.errors[name] : ''}
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
  );
}

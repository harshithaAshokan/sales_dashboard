import React from 'react';
import { Button, Form, Input, Space} from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const LeadFilterModal = ({listapical}) => {

 
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

      listapical(1,10,values)
    },
  });

  
  const handleReset = () => {
    listapical();
    formik.resetForm(); 
  };

 

  return (
    <>
      <div className='row'>
       <div className='col'>
        <InputField
          formik={formik}
          name="name"
          label="Name"
          placeholder="Enter Name"
        /></div>
       <div className='col'><InputField
          formik={formik}
          name="lead_id"
          label="Lead ID"
          type="number"
          placeholder="Enter Lead ID"
        /></div>
       <div className='col'>
        <InputField
          formik={formik}
          name="phone"
          label="Phone Number"
          placeholder="Enter Phone Number"
        /></div>
       <div className='col'><InputField
          formik={formik}
          name="lead_status"
          label="Lead Status"
          placeholder="Enter Lead Status"
        /></div>
       <div className='col'><InputField
          formik={formik}
          name="hot_lead"
          label="Hot Lead"
          placeholder="Enter Hot Lead"
        /></div>
      </div>
        
        <Space size="small">
          {/* Search Button */}
          <Button type="primary" onClick={formik.handleSubmit}>
            Search
          </Button>

          {/* Clear Button */}
          <Button  onClick={handleReset}>
            Reset
          </Button>
        </Space>
     
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



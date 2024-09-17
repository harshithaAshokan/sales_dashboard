import React from 'react';
import { Button, Form, Input, Space, theme } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const MastersFilter = ({listapical}) => {
  const userValidationSchema = Yup.object({
    name: Yup.string(), 
  });
  const {values,touched,errors,handleBlur,handleChange,handleSubmit,resetForm,setValues} = useFormik({
    initialValues: {
      name: '',
      
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      console.log('Form values on submit:', values);
      listapical(1,10,values)
    },
  });
  const handleReset = () => {
    resetForm();
    setValues({
      name:""
    })
    listapical();
    
  };

  return (
    <>
        <InputField
          name="name"
          label="Name"
          placeholder="Enter Name"
          value={values.name}
          handleBlur={handleBlur}
          handleChange={handleChange}
          touched={touched}
          errors={errors}
        />

        <Space size="small">
          {/* Search Button */}
          <Button type="primary" onClick={handleSubmit}>
            Search
          </Button>

          {/* Clear Button */}
          <Button htmlType="button" onClick={handleReset}>
            Reset
          </Button>
        </Space>
      
    </>
  );
};

export default MastersFilter;

function InputField({ name, type = 'text', placeholder,handleBlur,handleChange,touched,errors,value }) {
  return (
    <Form.Item
      
      name={name}
      validateStatus={touched[name] && errors[name] ? 'error' : ''}
      help={touched[name] && errors[name] ? errors[name] : ''}
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
  );
}

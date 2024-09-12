import React from 'react';
import { Button, Form, Input, Space, theme } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { handleSearch } from '../../../redux/reducers/AuthReducers';

const FilterModal = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm(); // Use Ant Design's form instance
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);

  const formStyle = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  // Validation schema
  const userValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email format'),
    userName: Yup.string(),
    dealer_id: Yup.number(),
    phoneNumber: Yup.string().matches(/^[6789][0-9]{9}$/, 'Number must be 10 digits'),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      phoneNumber: '',
      dealer_id: '',
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
    form.resetFields();
    
  };

  return (
    <>
      <Form
        form={form}
        name="advanced_search"
        style={formStyle}
        onFinish={formik.handleSubmit} 
      >
      
        <InputField
          formik={formik}
          name="userName"
          label="User Name"
          placeholder="Enter User Name"
        />

        {
          selector.userType == '4' && (<InputField
          formik={formik}
          name="dealer_id"
          label="Dealer ID"
          type="number"
          placeholder="Enter Dealer ID"
        />)
        }
        

        {/* Phone Number Field */}
        <InputField
          formik={formik}
          name="phoneNumber"
          label="Phone Number"
          placeholder="Enter Phone Number"
        />

        {/* Email Field */}
        <InputField
          formik={formik}
          name="email"
          label="Email"
          placeholder="Enter Email"
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

export default FilterModal;

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

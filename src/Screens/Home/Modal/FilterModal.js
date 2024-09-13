import React from 'react';
import { Button, Form, Input, Space, theme } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { handleSearch } from '../../../redux/reducers/AuthReducers';

const FilterModal = ({listapical}) => {
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);

  // Validation schema
  const userValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email format'),
    userName: Yup.string(),
    dealer_id: Yup.number(),
    phoneNumber: Yup.string().matches(/^[6789][0-9]{9}$/, 'Number must be 10 digits'),
  });

  const handleReset = () => {
    formik.resetForm();
    listapical();
  }

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
      listapical(1,10,values)
    },
  });
  return (
    <>
      <div className='row'>
        <div className='col'>
          <InputField
          formik={formik}
          name="userName"
          label="User Name"
          placeholder="Enter User Name"
        />
        </div>
        <div className='col'>
          <InputField
          formik={formik}
          name="phoneNumber"
          label="Phone Number"
          placeholder="Enter Phone Number"
        />
        </div>
        <div className='col'>
          <InputField
          formik={formik}
          name="email"
          label="Email address"
          placeholder="Enter Email"
        />
        </div> 
        <div className='col'>
          {
          selector.userType == '4' && (<InputField
          formik={formik}
          name="dealer_id"
          label="Dealer"
          type="number"
          placeholder="Enter Dealer"
        />)
        }
        </div>
      </div>
      
        <Space size="small">
         
          <Button type="primary" onClick={formik.handleSubmit}>
            Search
          </Button>

          <Button onClick={handleReset}>
            Reset
          </Button>
        </Space>
      
    </>
  );
};

export default FilterModal;

function InputField({ formik, name, type = 'text', placeholder }) {
  return (
    <Form.Item
    
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

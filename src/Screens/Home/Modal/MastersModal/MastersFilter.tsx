
import { Button, Col, Form, Input, Row, Space } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputFields } from '../../../../type/inputfield';
import { masterFilterProps } from '../../../../type/filter';

interface formValues {

  listapical : (page:number,pageSize:number,values:masterFilterProps) => void
}

const filterValues = {
  name:""
}
const MastersFilter = ({listapical}:formValues) => {
  const userValidationSchema = Yup.object({
    name: Yup.string(), 
  });
  const {values,touched,errors,handleBlur,handleChange,handleSubmit,resetForm,setValues} = useFormik({
    initialValues: {
      name: '',
      
    },
    validationSchema: userValidationSchema,
    onSubmit: (values:masterFilterProps) => {
      console.log('Form values on submit:', values);
      listapical(1,10,values)
    },
  });
  const handleReset = () => {
    resetForm();
    listapical(1,10,filterValues);
    
  };

  return (
    <>
    <Row className='px-3 mt-2'>
      <Col>
      <InputField
          name="name"
          label="Name"
          placeholder="Enter Name"
          value={values.name}
          handleBlur={handleBlur}
          handleChange={handleChange}
          touched={touched}
          errors={errors}
          required={false}
        /></Col>
      
    </Row>
        
    <div className="float-end">
    <Space size="small">
          {/* Search Button */}
          <Button type="primary" className='ms-end' onClick={(e) => {
            e.preventDefault();
            handleSubmit()}}>
            Search
          </Button>

          {/* Clear Button */}
          <Button htmlType="button" onClick={handleReset}>
            Reset
          </Button>
        </Space>
        </div>
        
      
    </>
  );
};

export default MastersFilter;

const InputField = ({ label, name, type = "text", placeholder, value, touched, errors, handleChange, handleBlur,required=false }:InputFields) => (
  <Form.Item
    label={label}
    validateStatus={touched[name] && errors[name] ? "error" : ""}
    help={touched[name] && errors[name] ? errors[name] : ""}
    required={required}
    className='input'
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


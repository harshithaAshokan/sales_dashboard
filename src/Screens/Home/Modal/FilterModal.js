import React from "react";
import { Button, Form, Input, Space, theme } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
const FilterModal = ({ listapical }) => {
  const selector = useSelector((state) => state.auth);

  // Validation schema
  const userValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email format"),
    userName: Yup.string(),
    dealer_id: Yup.number(),
    phoneNumber: Yup.string().matches(
      /^[6789][0-9]{9}$/,
      "Number must be 10 digits"
    ),
  });

  const handleReset = () => {
    resetForm();
    listapical();
  };

  const {values,touched,errors,handleBlur,handleChange,handleSubmit,resetForm} = useFormik({
    initialValues: {
      userName: "",
      email: "",
      phoneNumber: "",
      dealer_id: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      console.log("Form values on submit:", values);
      listapical(1, 10, values);
    },
  });
  return (
    <>
      <div className="row">
        <div className="col">
          <InputField
           
            name="userName"
            label="User Name"
            placeholder="Enter User Name"
            value={values.userName}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </div>
        <div className="col">
          <InputField
           
            name="phoneNumber"
            label="Phone Number"
            placeholder="Enter Phone Number"
            value={values.phoneNumber}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </div>
        <div className="col">
          <InputField
           
            name="email"
            label="Email address"
            placeholder="Enter Email"
            value={values.email}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </div>
        <div className="col">
          {selector.userType == "4" && (
            <InputField
             
              name="dealer_id"
              label="Dealer"
              type="number"
              placeholder="Enter Dealer"
              value={values.dealer_id}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            />
          )}
        </div>
      </div>

      <Space size="small">
        <Button type="primary" onClick={handleSubmit}>
          Search
        </Button>

        <Button onClick={handleReset}>Reset</Button>
      </Space>
    </>
  );
};

export default FilterModal;

function InputField({ name, type = "text", placeholder,touched,errors,handleBlur,handleChange,value }) {
  return (
    <Form.Item
      name={name}
      validateStatus={
        touched[name] && errors[name] ? "error" : ""
      }
      help={
        touched[name] && errors[name] ? errors[name] : ""
      }
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

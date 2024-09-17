import React from "react";
import { Button, Form, Input, Space } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
const LeadFilterModal = ({ listapical }) => {
  const userValidationSchema = Yup.object({
    name: Yup.string(),
    lead_status: Yup.number(),
    lead_id: Yup.number(),
    hot_lead: Yup.number(),
    phone: Yup.string().matches(/^[6789][0-9]{9}$/, "Number must be 10 digits"),
  });

  // Formik initialization
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues: {
      phone: "",
      name: "",
      lead_status: "",
      lead_id: "",
      hot_lead: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      listapical(1, 10, values);
    },
  });

  const handleReset = () => {
    listapical();
    resetForm();
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <InputField name="name" label="Name" placeholder="Enter Name" />
        </div>
        <div className="col">
          <InputField
            name="lead_id"
            label="Lead ID"
            type="number"
            placeholder="Enter Lead ID"
            touched={touched}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.lead_id}
          />
        </div>
        <div className="col">
          <InputField
            name="phone"
            label="Phone Number"
            placeholder="Enter Phone Number"
            touched={touched}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.phone}
          />
        </div>
        <div className="col">
          <InputField
            name="lead_status"
            label="Lead Status"
            placeholder="Enter Lead Status"
            touched={touched}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.lead_status}
          />
        </div>
        <div className="col">
          <InputField
            name="hot_lead"
            label="Hot Lead"
            placeholder="Enter Hot Lead"
            touched={touched}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.hot_lead}
          />
        </div>
      </div>

      <Space size="small">
        {/* Search Button */}
        <Button type="primary" onClick={handleSubmit}>
          Search
        </Button>

        {/* Clear Button */}
        <Button onClick={handleReset}>Reset</Button>
      </Space>
    </>
  );
};

export default LeadFilterModal;

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  handleBlur,
  handleChange,
  touched,
  errors,
}) {
  return (
    <Form.Item
      label={label}
      name={name}
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
  );
}

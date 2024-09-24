import { Button, Form, Input, Space } from "antd";
import { useFormik, useFormikContext } from "formik";
import * as Yup from "yup";
import { InputFields } from "../../../../type/inputfield";
import { leadFilterProps } from "../../../../type/filter";

interface formValues {
  listapical: (page: number, size: number, values: leadFilterProps) => void;
}

const filterValues = {
  phone: "",
  name: "",
  lead_status: "",
  lead_id: "",
  hot_lead: "",
};

const LeadFilterModal = ({ listapical }: formValues) => {
  const userValidationSchema = Yup.object({
    name: Yup.string(),
    lead_status: Yup.number(),
    lead_id: Yup.number(),
    hot_lead: Yup.number(),
    phone: Yup.string().matches(/^[6789][0-9]{9}$/, "Number must be 10 digits"),
  });

  const handleReset = () => {
    resetForm();
    listapical(1, 10, values);
  };

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
    onSubmit: (values: leadFilterProps) => {
      listapical(1, 10, values);
    },
  });

  return (
    <>
    <Form>
      <div className="row me-5">
        <div className="col">
          <InputField
            name="name"
            label="Name"
            placeholder="Enter Name"
            touched={touched}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.name}
            required={false}
          />
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
            required={false}
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
            required={false}
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
            required={false}
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
            required={false}
          />
        </div>
      </div>
     <div className="float-end">
      <Space size="small">
        {/* Search Button */}
        <Button
          type="primary"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Search
        </Button>
        <Button onClick={(e) => {
            e.preventDefault();
            handleReset();
          }}>Reset</Button>
      </Space>
     </div>
     </Form>  
    </>
  );
};

export default LeadFilterModal;

const InputField = ({ label, name, type = "text", placeholder, value, touched, errors, handleChange, handleBlur,required=false }:InputFields) => (
  <Form.Item
    label={label}
    validateStatus={touched[name] && errors[name] ? "error" : ""}
    help={touched[name] && errors[name] ? errors[name] : ""}
    required={required}
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

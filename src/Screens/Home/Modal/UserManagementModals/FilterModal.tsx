import { Button, Form, Input, Space} from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { InputFields } from "../../../../type/inputfield";
import { storeDataProps } from "../../../../type/reducer";
import { userFilterprops } from "../../../../type/filter";

interface formValues {
  listapical:(page:number,size:number,value:userFilterprops) =>  void
}
const componentVariant = "filled";
const filterValues = {
      userName: "",
      email: "",
      phoneNumber: "",
      dealer_id: "",
}

const FilterModal = ({ listapical }:formValues) => {
  const selector = useSelector((state:storeDataProps) => state.auth);

  // Validation schema
  const userValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email format"),
    userName: Yup.string(),
    dealer_id: selector.userType === 4 ? Yup.number() : Yup.mixed(),
    phoneNumber: Yup.string().matches(
      /^[6789][0-9]{9}$/,
      "Number must be 10 digits"
    ),
  });

  
  const {values,touched,errors,handleBlur,handleChange,handleSubmit,resetForm} = useFormik({
    initialValues:filterValues,
    validationSchema: userValidationSchema,
    onSubmit: (values:userFilterprops) => {
      console.log("Form values on submit:", values);
      listapical(1, 10, values);
    },
  });

  const handleReset = () => {
    resetForm();
    listapical(1,10,values) 
  }; 

  return (
    <>
    <Form onFinish={handleSubmit} variant={componentVariant}>
      <div className="row py-3 me-3">
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
            required={false}
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
            required={false}
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
            required={false}
          />
        </div>
        <div className="col">
          {selector.userType == 4 && (
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
            required={false}
            />
          )}
        </div>
      </div>
      
      <div className="float-end">
       <Space size="small">
        <Button type="primary" htmlType="submit">
          Search
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </Space>
        </div>
        </Form>  
    </>
  );
};

export default FilterModal;

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

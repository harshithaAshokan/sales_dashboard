import React, { useEffect, useState } from "react";
import { Modal, Form,Input,Select,message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createuser, listUsers } from "../../../axios/services";
import { useDispatch, useSelector } from "react-redux";
import { handleDealerList, handleMessage, handleShowAddModal,handleShowUpdateModal } from "../../../redux/reducers/AuthReducers";

export default function AddModal({listapical}) {
  const dispatch = useDispatch();
  const [componentVariant, setComponentVariant] = useState("filled");
  const data = useSelector((state) => state.login);
  const selector = useSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();
  const handleCancel = () => {
    console.log("Clicked cancel button");
    dispatch(handleShowAddModal(false));
    dispatch(handleShowUpdateModal(false));
  };

  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
  };

  console.log(selector.dealer_ids)

  
  const handleCreateUser = (values) => {
    const formData = new FormData();
    formData.append("token", data.token);
    formData.append("name", values.name);
    formData.append("userName", values.username);
    formData.append("phoneNumber", values.number);
    formData.append("userType",selector.userType);
    formData.append("email", values.email);
    formData.append("city", values.city);
    formData.append("state", values.state);
    formData.append("dealer_id", values.dealer_id);
    formData.append("landline_number", values.landline);
    formData.append("password", values.password);
    formData.append("pincode", values.pincode);
  
    createuser(formData)
      .then((response) => {
        console.log("API response:", response.data);
        dispatch(handleMessage(response.data.msg));
        listapical();
        messageApi.info(response.data.msg).then(() => {
          if(response.data.status)
          {
            handleCancel();
          }
        });
        
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  };

 const handleDealerId = () => {
  const formData = new FormData();
  formData.append("token", data.token);
  formData.append("type", "3");
  listUsers(1,10,formData).then((response) => {
    dispatch(handleDealerList(response.data.data.items))
  })
 }

  useEffect(() => {
   handleDealerId();
  },[])

 

  const userValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email format"),
    username: Yup.string().required("Username is required"),
    name: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets").required("Name is required"),
    city: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    country: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    state: Yup.string().matches(/^[a-zA-Z ]+$/, "Must be alphabets"),
    landline: Yup.string(),
    pincode: Yup.string(),
    dealer_id: Yup.number(),
    number: Yup.string().matches(/^[6789][0-9]{9}$/, "Number must be 10 digits").required("Phone number is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      name: "",
      country: "",
      city: "",
      state: "",
      number: "",
      dealer_id: "",
      landline: "",
      password: "",
      pincode: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => 
    {
        handleCreateUser(values);
    }
  });

 
  

  return (
    <>
    {contextHolder}
    <Modal
      title={"ADD DETAILS"}
      open={selector.showAddModal}
      onOk={formik.handleSubmit}
      onCancel={handleCancel}
    >
      <Form
        {...formItemLayout}
        variant={componentVariant}
        style={{ maxWidth: 600 }}
      >
        <InputField
          formik={formik}
          name="username"
          label="Username"
          placeholder="Enter username"
        />
        <InputField
          formik={formik}
          name="name"
          label="Name"
          placeholder="Enter Name"
        />
        <InputField
          formik={formik}
          name="state"
          label="State"
          placeholder="Enter state"
        />
        <InputField
          formik={formik}
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
        />
        <InputField
          formik={formik}
          name="landline"
          type="text"
          label="Landline"
          placeholder="Enter your landline"
        />
        <InputField
          formik={formik}
          name="city"
          label="City"
          placeholder="Enter your city"
        />
        <InputField
          formik={formik}
          name="country"
          label="Country"
          placeholder="Enter your country"
        />
        <InputField
          formik={formik}
          name="number"
          label="Number"
          placeholder="Enter phone number"
        />
     {selector.userType == "4" && ( <Form.Item
  name="dealer_id"
  label="Dealer ID"
  validateStatus={formik.touched.dealer_id && formik.errors.dealer_id ? "error" : ""}
  help={formik.touched.dealer_id && formik.errors.dealer_id ? formik.errors.dealer_id : ""}
>
  <Select
    placeholder="Select Dealer ID"
    value={formik.values.dealer_id}
    onChange={(value) => formik.setFieldValue("dealer_id", value)}
    onBlur={() => formik.setFieldTouched("dealer_id", true)}
    allowClear
  >
    {selector.dealerList?.map((item) => (
      <Select.Option key={item.userId} value={item.userId}>
        {item.userName}
      </Select.Option>
    ))}
  </Select>
</Form.Item>)}   

        <InputField
          formik={formik}
          name="password"
          type="password"
          label="Password"
          placeholder="Enter password"
        />
        
        <InputField
          formik={formik}
          name="pincode"
          type="text"
          label="Pincode"
          placeholder="Enter pincode"
        />
       
      </Form>
    </Modal>
    </>
  );
}

function InputField({ formik, label, name, type = "text", placeholder }) {
  return (
    <>
      <Form.Item
        label={label}
        validateStatus={formik.touched[name] && formik.errors[name] ? "error" : ""}
        help={formik.touched[name] && formik.errors[name] ? formik.errors[name] : ""}
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
    </>
  );
}


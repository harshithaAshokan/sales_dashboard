import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateuser, viewuser } from "../../../axios/services";
import { handleShowUpdateModal } from "../../../redux/reducers/AuthReducers";
import { Modal,message,Form,Button,Input } from "antd";
export default function UpdateModal({listapical}) {
  const dispatch = useDispatch();
  const [componentVariant, setComponentVariant] = useState("filled");
  const data = useSelector((state) => state.login);
  const selector = useSelector((state) => state.auth);
  
  const handleCancel = () => {
    console.log("Clicked cancel button");
    dispatch(handleShowUpdateModal(false));
  };

  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
  };

  const handleUpdate = () => {
    const updateData = new FormData();
    updateData.append("token", data.token);
    updateData.append("userId", selector.user_id);
    viewuser(updateData)
      .then((response) => {
        const selectedDealer = response.data.data;
        formik.setValues({
          user_id: selectedDealer.userId || "",
          email: selectedDealer.email || "",
          username: selectedDealer.userName || "",
          name: selectedDealer.name || "",
          country: selectedDealer.countryName || "",
          city: selectedDealer.cityName || "",
          state: selectedDealer.stateName || "",
          number: selectedDealer.phoneNumber || "",
          dealer_id: selectedDealer.dealerId || "",
          landline: selectedDealer.whatsapp_no || "",
          pincode: selectedDealer.pincode || "",
        });
        console.log(selectedDealer);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = (values) => {
  
    const formData = new FormData();
formData.append("token", data.token);
formData.append("name", values.name);
formData.append("phoneNumber", values.number);
formData.append("userId", selector.user_id); 
formData.append("userType", selector.userType);
formData.append("email", values.email);
formData.append("userName",values.username)
formData.append("country",values.country)
formData.append("city",values.city)
formData.append("state",values.state)
formData.append("dealer_id",values.dealer_id)
formData.append("landline_number",values.landline)
formData.append("pincode",values.pincode)
  
    updateuser(formData)
      .then((response) => {
        console.log("API response:", response.data);
        listapical();
        message.success(response.data.msg).then(() => {
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

  const userValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email format"),
    username: Yup.string().required("Username is required"),
    name: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Must be alphabets")
      .required("Name is required"),
    city: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    country: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    state: Yup.string().matches(/^[a-zA-Z ]+$/, "Must be alphabets"),
    landline: Yup.string(),
    pincode: Yup.string(),
    dealer_id: Yup.number(),
    number: Yup.string()
      .matches(/^[6789][0-9]{9}$/, "Number must be 10 digits")
      .required("Phone number is required"),
    user_id: Yup.number().required("User Id is required"),
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
      pincode: "",
      user_id: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      handleUpdateUser(values);
    },
  });

  useEffect(() => {
    if (selector.showUpdateModal) {
      handleUpdate();
    }
  }, [selector.showUpdateModal]);

  return (
    <>
   
    <Modal
      title={"UPDATE DETAILS"}
      open={selector.showUpdateModal}
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
          name="user_id"
          type="text"
          label="User Id"
          placeholder="Enter user Id"
        />
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
        <InputField
          formik={formik}
          name="dealer_id"
          type="number"
          label="Dealer_Id"
          placeholder="Enter dealer ID"
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
        validateStatus={
          formik.touched[name] && formik.errors[name] ? "error" : ""
        }
        help={
          formik.touched[name] && formik.errors[name] ? formik.errors[name] : ""
        }
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

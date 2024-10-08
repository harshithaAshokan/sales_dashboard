import React, { useEffect, useState, useCallback } from "react";
import { Modal, Form, Input, Select, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createuser, dealerDropdown, updateuser, viewuser } from "../../../../axios/services";
import { useSelector } from "react-redux";
import { useToken, useType } from "../../../../utility/hooks";
import { addModalProps } from "../../../../type/userManagement";
import { arrayProps } from "../../../../type/leads";
import { InputFields } from "../../../../type/inputfield";
import { storeDataProps } from "../../../../type/reducer";
import { userFilterprops } from "../../../../type/filter";

interface formValues {
  listapical : (page:number,size:number,value:userFilterprops) =>  void
  editModal: boolean
  addModal:boolean
  close: () =>  void
  current:number
}

export default function AddModal({ listapical, editModal, addModal, close,current }:formValues) {
  const token = useToken();
  const selector = useSelector((state:storeDataProps) => state.auth);
  const [dealerId, setDealerId] = useState<arrayProps[]>([]);
  const userType = useType();
  const filterValue = {
      userName: "",
      email: "",
      phoneNumber: "",
      dealer_id: "",
  }
  const handleCancel = () => {
    resetForm();
    close();
  };

  const formItemLayout = {
    labelCol: { xs: { span: 2 }, sm: { span: 8 } },
    wrapperCol: { xs: { span: 2 }, sm: { span: 14 } },
  };

  const componentVariant = "filled";
  const handleUser = (values:addModalProps) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("name", values.name);
    formData.append("userName", values.username);
    formData.append("phoneNumber", values.number);
    formData.append("userType", String(selector.userType));
    formData.append("email", values.email);
    formData.append("city", values.city);
    formData.append("state", values.state);
    formData.append("country",values.country)
    if(userType !== "3")
      {
        formData.append("dealer_id", values.dealer_id);
      } 
    else 
    {
      formData.append("dealer_id",String(localStorage.getItem("userId")))
    }
    formData.append("landline_number", values.landline);
    formData.append("pincode", values.pincode);
    formData.append("password", values.password);
    createuser(formData)
      .then((response) => {
        listapical(current,10,filterValue);
        message.success(response.data.msg);
        handleCancel();
      })
      .catch((err) => {
        console.error("API error:", err);
      });
    console.log("formdata",formData)
  };

  const handleDealerId = useCallback(() => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("isDealer", "1");
    dealerDropdown(formData).then((response) => {
      setDealerId(response.data.data);
    });
  }, [token]);

  console.log("userType",userType)

  const handleUpdate = () => {
    const updateData = new FormData();
    updateData.append("token", token);
    updateData.append("userId", selector.user_id);
    viewuser(updateData)
      .then((response) => {
        const selectedDealer = response.data.data;
        setValues({
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
          password:""
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleDealerId();
  }, [handleDealerId]);

  useEffect(() => {
    if (editModal) {
      handleUpdate();
    }
  }, [editModal]);

  const handleUpdateUser = (values:addModalProps) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("name", values.name);
    formData.append("userName", values.username);
    formData.append("phoneNumber", values.number);
    formData.append("userType", String(selector.userType));
    formData.append("email", values.email);
    formData.append("city", values.city);
    formData.append("state", values.state);
    formData.append("dealer_id", values.dealer_id);
    formData.append("landline_number", values.landline);
    formData.append("pincode", values.pincode);
    formData.append("userId", selector.user_id);

    updateuser(formData)
      .then((response) => {
        listapical(current,10,filterValue);
        if(response.data.status){
          message.success(response.data.msg)
        }
        else {
          message.error(response.data.msg)
        }
        handleCancel();
      })
      .catch((err) => {
        console.error("API error:", err);
      });
  };

  const userValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("required"),
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
      password: Yup.string(),
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    setValues,
    resetForm
  } = useFormik({
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
    onSubmit: (values:addModalProps) => {
      if(addModal)
      {
        handleUser(values);
      }
      if(editModal) 
      {
       handleUpdateUser(values);
      }
      
    },
  });

  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default action if needed
    handleSubmit();
};
 console.log("userType",typeof(selector.userType))  

 const renderDealerField = () => {
  if (userType !== "3" && selector.userType === 4) {
    return (
      <div className="col-6">
        <Form.Item
          name="dealer_id"
          required
          label="Dealer"
          validateStatus={touched.dealer_id && errors.dealer_id ? "error" : ""}
          help={touched.dealer_id && errors.dealer_id ? errors.dealer_id : ""}
        >
          <Select
            placeholder="Select Dealer"
            value={values.dealer_id}
            onChange={(value) => setFieldValue("dealer_id", value)}
            onBlur={() => setFieldTouched("dealer_id", true)}
            allowClear
          >
            {dealerId?.map((item) => (
              <Select.Option key={item.userId} value={item.userId}>
                {item.userName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    );
  }
  return null;
};

  return (
    <Modal
      title={editModal ? "EDIT DETAILS" : "ADD DETAILS"}
      open={true}
      onOk={handleOk} 
      onCancel={handleCancel}
      width={800}
    >
      <Form variant={componentVariant} {...formItemLayout}>
        <div className="row">
          <div className="col-6">
            <InputField
              name="username"
              label="Username"
              value={values.username}
              placeholder="Enter username"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              required={true}
            />
          </div>
          <div className="col-6">
            <InputField
              name="name"
              label="Name"
              value={values.name}
              placeholder="Enter Name"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              required={true}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <InputField
              name="country"
              label="Country"
              value={values.country}
              placeholder="Enter your country"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              required={false}
            />
          </div>
          <div className="col-6">
            <InputField
              name="number"
              label="Number"
              value={values.number}
              placeholder="Enter phone number"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              required={true}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <InputField
              name="landline"
              type="text"
              label="Landline"
              value={values.landline}
              placeholder="Enter your landline"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              required={false}
            />
          </div>
          <div className="col-6">
            <InputField
              name="city"
              label="City"
              value={values.city}
              placeholder="Enter your city"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              required={false}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <InputField
              name="state"
              label="State"
              value={values.state}
              placeholder="Enter state"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              required={false}
            />
          </div>
          <div className="col-6">
            <InputField
              name="email"
              type="email"
              label="Email"
              value={values.email}
              placeholder="Enter your email"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              required={false}
            />
          </div>
        </div>
        <div className="row">

        <div className="col-6">
            <InputField
              name="pincode"
              type="text"
              label="Pincode"
              value={values.pincode}
              placeholder="Enter pincode"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              required={false}
            />
          </div>

          { addModal ? (
            <div className="col-6">
              <InputField
                name="password"
                type="password"
                label="Password"
                value={values.password}
                placeholder="Enter password"
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
                errors={errors}
                required={true}
              />
            </div>

          
      
          ) : 
            
          (renderDealerField())
          
          }  
        </div>
        {addModal && (
          <div className="row">
          
            {renderDealerField()}
           
          </div>
        )}
        
       
      </Form>
    </Modal>
  );
}

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



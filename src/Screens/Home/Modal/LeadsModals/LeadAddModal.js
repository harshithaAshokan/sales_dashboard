import React, { useEffect, useState } from "react";
import {  Form, Input, Select, message, Layout, Col,Row, Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import {  useSelector } from "react-redux";
import { createLead, dropdownRequirements, updateLead, viewLead } from "../../../../axios/services";
import classes from './LeadAddModal.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import { useToken } from "../../../../utility/hooks";
const { Content } = Layout;

export default function LeadsAddModal() {
  
  const navigate = useNavigate();
  const selector = useSelector((state) => state.auth); 
  const [componentVariant, setComponentVariant] = useState("filled");
  const token = useToken();
  const location = useLocation();
  const modalType = location.state?.modalType || "" ;
  const [requirements, setRequirements] = useState([]);
  console.log(modalType,"state");
  
  const handleUpdate = () => {
    const updateData = new FormData();
    updateData.append("token", token);
    updateData.append("leadId", selector.user_id);
    viewLead(updateData)
      .then((response) => {
        console.log(response.data.data);
        const selectedDealer = response.data.data;
        setValues({
            name: selectedDealer.name || "",
            remarks: selectedDealer.remarks || "",
            phone_country_code: selectedDealer.phone_country_code || "",
            landline_number:selectedDealer.landline_number || "",
            whatsapp_country_code: selectedDealer.whatsapp_country_code || "",
            alter_country_code: selectedDealer.alter_country_code || "",
            company_name:selectedDealer.company_name || "",
            contact_person: selectedDealer.contact_person || "",
            address:selectedDealer.address || "",
            area: selectedDealer.area || "",
            phone: selectedDealer.phoneNumber || "",
            email: selectedDealer.email || "",
            alternative_no: selectedDealer.alternative_no || "",
            whatsapp_no: selectedDealer.whatsapp_no || "",
            customer_category_id: selectedDealer.customer_category_id || "",
            enquiry_type_id: selectedDealer.enquiry_type_id || "",
            requirements_id: selectedDealer.requirementsId.reqId || "",
            state: selectedDealer.state || "",
            country: selectedDealer.country || "",
            city: selectedDealer.city || "",
            dealer_id: selectedDealer.dealer_id || "",
            assignedTo: selectedDealer.assignedTo || "",
            receivedDate: selectedDealer.receivedDate|| "",
            referedBy:selectedDealer.referedBy|| "",
            referedPhone: selectedDealer.referedPhone || "",
            refer_country_code: selectedDealer.refer_country_code || "",
            notes: selectedDealer.notes || "",
            description: selectedDealer.description || "",
            isNew: selectedDealer.isNew || "",
            latitude: selectedDealer.latitude || "",
            longitude: selectedDealer.longitude || "",
            customerId: selectedDealer.customerCategoryId || "",
            Pincode: selectedDealer.pincode || "",
            schedule_date: selectedDealer.schedule_date || "",
            upload_file: selectedDealer.upload_file || "",
            approximate_amount: selectedDealer.approximate_amount || "",
        });
        console.log(selectedDealer);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUser = (values) => {
    if(modalType === 'add') {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("name", values.name);
    formData.append("phone_country_code", values.phone_country_code);
    formData.append("address", values.address);
    formData.append("phone", values.phone);
    formData.append("requirements_id", values.requirements_id);
    // formData.append("remarks",values.remarks)
    // formData.append("landline_number",values.landline_number)
    // formData.append("whatsapp_country_code",values.whatsapp_country_code)
    // formData.append("alter_country_code",values.alter_country_code)
    // formData.append("company_name",values.company_name)
    // formData.append("contact_person",values.contact_person)
    // formData.append("area",values.area)
    // formData.append("email",values.email)
    // formData.append("alternative_no",values.alternative_no)
    // formData.append("whatsapp_no",values.whatsapp_no)
    // formData.append("customer_category_id",values.customer_category_id)
    // formData.append("enquiry_type_id",values.enquiry_type_id)
    // formData.append("state",values.state)
    // formData.append("country",values.country)
    // formData.append("city",values.city)
    // formData.append("dealer_id",values.dealer_id)
    // formData.append("assignedTo",values.assignedTo)
    // formData.append("receivedDate",values.receivedDate)
    // formData.append("referedBy",values.referedBy)
    // formData.append("referedPhone",values.referedPhone)
    // formData.append("refer_country_code",values.refer_country_code)
    // formData.append("notes",values.notes)
    // formData.append("description",values.description)
    // formData.append("isNew",values.isNew)
    // formData.append("latitude",values.latitude)
    // formData.append("longitude",values.longitude)
    // formData.append("customerId",values.customerId)
    // formData.append("Pincode",values.Pincode)
    // formData.append("schedule_date",values.schedule_date)
    // formData.append("upload_file",values.upload_file)
    // formData.append("approximate_amount",values.approximate_amount)

    createLead(formData)
      .then((response) => {
        console.log("API response:", response.data);
        message.success(response.data.msg);
        navigate("/lead");
      })
      .catch((err) => {
        console.error("API error:", err);
      });
    }
    if(modalType === 'edit') {
     
        const formData = new FormData();
        formData.append("token", token);
        formData.append("name", values.name);
        formData.append("phone_country_code", values.phone_country_code);
        formData.append("address",values.address);
        formData.append("phone",values.phone);
        formData.append("requirements_id",values.requirements_id);
        formData.append("leadId" , selector.user_id)
        updateLead(formData)
          .then((response) => {
            console.log("API response:", response.data);
            message.success(response.data.msg)
            navigate("/lead")
          })
          .catch((err) => {
            console.error("API error:", err);
          });
      
    }
  };

  useEffect(() => {
    if(modalType === 'edit') {
      handleUpdate();
    }
    
  },[modalType])

  const userValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email format"),
    name: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Must be alphabets")
      .required("Name is required"),
    remarks: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    phone_country_code: Yup.string().required("Phone country code is required"),
    landline_number: Yup.string().matches(
      /^[6789][0-9]{9}$/,
      "Number must be 10 digits"
    ),
    whatsapp_country_code: Yup.string(),
    alter_country_code: Yup.string(),
    company_name: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    contact_person: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    address: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Must be alphabets")
      .required("Address is required"),
    area: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    alternative_no: Yup.string().matches(
      /^[6789][0-9]{9}$/,
      "Number must be 10 digits"
    ),
    whatsapp_no: Yup.string().matches(
      /^[6789][0-9]{9}$/,
      "Number must be 10 digits"
    ),
    customer_category_id: Yup.number(),
    enquiry_type_id: Yup.number(),
    requirements_id: Yup.string().required("Requirement Id is required"),
    state: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    country: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    city: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    dealer_id: Yup.number(),
    assignedTo: Yup.number(),
    receivedDate: Yup.number(),
    referedBy: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    referedPhone: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    refer_country_code: "",
    notes: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    description: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    isNew: Yup.number(),
    latitude: Yup.number(),
    longitude: Yup.number(),
    customerId: Yup.number(),
    Pincode: Yup.number(),
    schedule_date: Yup.number(),
    upload_file: Yup.number(),
    approximate_amount: Yup.number(),
    phone: Yup.string()
      .matches(/^[6789][0-9]{9}$/, "Number must be 10 digits")
      .required("Phone number is required"),
  });

  const {handleChange,handleBlur,handleSubmit,touched,errors,values,setFieldTouched,setValues,setFieldValue} = useFormik({
    initialValues: {
      name: "",
      remarks: "",
      phone_country_code: "",
      landline_number: "",
      whatsapp_country_code: "",
      alter_country_code: "",
      company_name: "",
      contact_person: "",
      address: "",
      area: "",
      phone: "",
      email: "",
      alternative_no: "",
      whatsapp_no: "",
      customer_category_id: "",
      enquiry_type_id: "",
      requirements_id: "",
      state: "",
      country: "",
      city: "",
      dealer_id: "",
      assignedTo: "",
      receivedDate: "",
      referedBy: "",
      referedPhone: "",
      refer_country_code: "",
      notes: "",
      description: "",
      isNew: "",
      latitude: "",
      longitude: "",
      customerId: "",
      Pincode: "",
      schedule_date: "",
      upload_file: "",
      approximate_amount: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      handleUser(values);
    },
  });
  const handleRequirements = () => {
    const formData = new FormData();
    formData.append("token", token);
    dropdownRequirements(formData)
      .then((response) => {
        console.log(response.data.data);
        setRequirements(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    handleRequirements();
  }, []);
  return (
    <>
     <Layout className={`ms-5 ${classes.layout}`}>
     <Content className={`ms-5 ${classes.content}`}>
        <Form
          className="ms-5"
          variant={componentVariant}
          style={{ maxWidth: 600 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                
                name="name"
                label="Name"
                placeholder="Enter Name"
                value={values.name}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
            <Col span={12}>
              <InputField
                
                name="remarks"
                label="Remarks"
                placeholder="Enter Remarks"
                value={values.remarks}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                
                name="phone_country_code"
                label="Phone_country_code"
                placeholder="Enter Phone_country_code"
                value={values.phone_country_code}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
            <Col span={12}>
              <InputField
                
                name="landline_number"
                type="number"
                label="Landline_number"
                placeholder="Enter your Landline_number"
                value={values.landline_number}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                
                name="whatsapp_country_code"
                label="whatsapp_country_code"
                placeholder="Enter your whatsapp_country_code"
                value={values.whatsapp_country_code}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
            <Col span={12}>
              <InputField
                
                name="alter_country_code"
                label="alter_country_code"
                placeholder="Enter your alter_country_code"
                value={values.alter_country_code}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                
                name="company_name"
                label="Company Name"
                placeholder="Enter your Company Name"
                value={values.company_name}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
           </Col>
            <Col span={12}>
              <InputField
                
                name="contact_person"
                label="contact_person"
                placeholder="Enter your contact_person"
                value={values.contact_person}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
           </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                
                name="address"
                label="address"
                placeholder="Enter your address"
                value={values.address}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
            <Col span={12}>
              <InputField
                
                name="city"
                label="City"
                placeholder="Enter your city"
                value={values.city}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <InputField
                
                name="country"
                label="Country"
                placeholder="Enter your country"
                value={values.country}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
            <Col span={12}>
              <InputField
                
                name="state"
                label="State"
                placeholder="Enter your State"
                value={values.state}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                
                name="area"
                label="Area"
                placeholder="Enter Area"
                value={values.area}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
            <Col span={12}>
              <InputField
                
                name="phone"
                type="number"
                label="Phone"
                placeholder="Enter Phone"
                value={values.phone}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                
                name="email"
                type="email"
                label="Email"
                placeholder="Enter email"
                value={values.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
            <Col span={12}>
              <InputField
                
                name="alternative_no"
                type="number"
                label="Alternative_no"
                placeholder="Enter alternative_no"
                value={values.alternative_no}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                
                name="whatsapp_no"
                type="number"
                label="Whatsapp_no"
                placeholder="Enter Whatsapp_no"
                value={values.whatsapp_no}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
           </Col>
            <Col span={12}>
              <InputField
                
                name="customer_category_id"
                type="number"
                label="customer_category_id"
                placeholder="Enter customer_category_id"
                value={values.customer_category_id}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
           </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <InputField
                
                name="enquiry_type_id"
                type="number"
                label="enquiry_type_id"
                placeholder="Enter enquiry_type_id"
                value={values.enquiry_type_id}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
           </Col>
            <Col span={12}>
              <Form.Item
                name="requirements_id"
                label="Requirements ID"
                validateStatus={
                  touched.requirements_id &&
                  errors.requirements_id
                    ? "error"
                    : ""
                }
                help={
                  touched.requirements_id &&
                  errors.requirements_id
                    ? errors.requirements_id
                    : ""
                }
              >
                <Select
                  placeholder="Select Dealer ID"
                  value={values.requirements_id}
                  onChange={(value) =>
                    setFieldValue("requirements_id", value)
                  }
                  onBlur={() => setFieldTouched("requirements_id", true)}
                  allowClear
                >
                  {requirements.length > 0 ? (
                    requirements?.map((item) => (
                      <Select.Option
                        key={item.RequirementsId}
                        value={item.RequirementsId}
                      >
                        {item.RequirementsName}
                      </Select.Option>
                    ))
                  ) : (
                    <Select.Option disabled>
                      No Requirements Available
                    </Select.Option>
                  )}
                </Select>
              </Form.Item>
              </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <InputField
                
                name="dealer_id"
                type="number"
                label="dealer_id"
                placeholder="Enter dealer_id"
                value={values.dealer_id}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
            <Col span={12}>
              <InputField
                
                name="recievedDate"
                type="number"
                label="recievedDate"
                placeholder="Enter recievedDate"
                value={values.recievedDate}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                
                name="referedBy"
                type="number"
                label="referedBy"
                placeholder="Enter referedBy"
                value={values.referedBy}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
            <Col span={12}>
              <InputField
                
                name="refer_country_code"
                type="number"
                label="refer_country_code"
                placeholder="Enter refer_country_code"
                value={values.refer_country_code}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
           </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <InputField
                
                name="notes"
                label="notes"
                placeholder="Enter notes"
                value={values.notes}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
            <Col span={12}>
              <InputField
                
                name="description"
                label="description"
                placeholder="Enter description"
                value={values.description}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
           </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                
                name="isNew"
                type="number"
                label="isNew"
                placeholder="Enter isNew"
                value={values.isNew}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
           </Col>
            <Col span={12}>
              <InputField
                
                name="latitude"
                type="number"
                label="Latitude"
                placeholder="Enter Latitude"
                value={values.latitude}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <InputField
                
                name="longitude"
                type="number"
                label="longitude"
                placeholder="Enter longitude"
                value={values.longitude}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
            <Col span={12}>
              <InputField
                
                name="upload_file"
                type="number"
                label="customerId"
                placeholder="Enter customerId"
                value={values.upload_file}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <InputField
                
                name="upload_file"
                label="upload_file"
                placeholder="Enter upload_file"
                value={values.upload_file}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
            <Col span={12}>
              {" "}
              <InputField
                
                name="approximate_amount"
                type="number"
                label="approximate_amount"
                placeholder="Enter approximate_amount"
                value={values.approximate_amount}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                
                name="pincode"
                type="number"
                label="Pincode"
                placeholder="Enter pincode"
                value={values.pincode}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}

              />
            </Col>
            <Col span={12}>
              <InputField
                
                name="schedule_date"
                type="number"
                label="schedule_date"
                placeholder="Enter schedule_date"
                value={values.schedule_date}
                handleChange={handleChange}
                handleBlur={handleBlur}
                 touched={touched}
              errors={errors}
              />
           </Col>
          </Row>
          <Form.Item>
            <Button onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
          
        </Form></Content>
        </Layout>
        
      {/* </Modal> */}
    </>
  );
}

function InputField({ label, name, type = "text", placeholder,value,touched,errors,handleBlur,handleChange }) {
  return (
    <>
      <Form.Item
        label={label}
        rules={[{required: true}]}
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
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, message,Typography, Layout, Col,Row, Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { createLead, dropdownRequirements } from "../../../../axios/services";
import classes from './LeadAddModal.module.css'
import FormItem from "antd/es/form/FormItem";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../../../utility/hooks";
const { Content } = Layout;
const { Title } = Typography;
export default function LeadsAddModal({ listapical }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [componentVariant, setComponentVariant] = useState("filled");
  const token = useToken();
  
  const [requirements, setRequirements] = useState([]);
  

  

  const handleCreateUser = (values) => {
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
  };

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

  const formik = useFormik({
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
      handleCreateUser(values);
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
                formik={formik}
                name="name"
                label="Name"
                placeholder="Enter Name"
              />
            </Col>
            <Col span={12}>
              <InputField
                formik={formik}
                name="remarks"
                label="Remarks"
                placeholder="Enter Remarks"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                formik={formik}
                name="phone_country_code"
                label="Phone_country_code"
                placeholder="Enter Phone_country_code"
              />
            </Col>
            <Col span={12}>
              <InputField
                formik={formik}
                name="landline_number"
                type="number"
                label="Landline_number"
                placeholder="Enter your Landline_number"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                formik={formik}
                name="whatsapp_country_code"
                label="whatsapp_country_code"
                placeholder="Enter your whatsapp_country_code"
              />
            </Col>
            <Col span={12}>
              <InputField
                formik={formik}
                name="alter_country_code"
                label="alter_country_code"
                placeholder="Enter your alter_country_code"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                formik={formik}
                name="company_name"
                label="Company Name"
                placeholder="Enter your Company Name"
              />
           </Col>
            <Col span={12}>
              <InputField
                formik={formik}
                name="contact_person"
                label="contact_person"
                placeholder="Enter your contact_person"
              />
           </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                formik={formik}
                name="address"
                label="address"
                placeholder="Enter your address"
              />
            </Col>
            <Col span={12}>
              <InputField
                formik={formik}
                name="city"
                label="City"
                placeholder="Enter your city"
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <InputField
                formik={formik}
                name="country"
                label="Country"
                placeholder="Enter your country"
              />
            </Col>
            <Col span={12}>
              <InputField
                formik={formik}
                name="state"
                label="State"
                placeholder="Enter your State"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                formik={formik}
                name="area"
                label="Area"
                placeholder="Enter Area"
              />
            </Col>
            <Col span={12}>
              <InputField
                formik={formik}
                name="phone"
                type="number"
                label="Phone"
                placeholder="Enter Phone"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                formik={formik}
                name="email"
                type="email"
                label="Email"
                placeholder="Enter email"
              />
            </Col>
            <Col span={12}>
              <InputField
                formik={formik}
                name="alternative_no"
                type="number"
                label="Alternative_no"
                placeholder="Enter alternative_no"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                formik={formik}
                name="whatsapp_no"
                type="number"
                label="Whatsapp_no"
                placeholder="Enter Whatsapp_no"
              />
           </Col>
            <Col span={12}>
              <InputField
                formik={formik}
                name="customer_category_id"
                type="number"
                label="customer_category_id"
                placeholder="Enter customer_category_id"
              />
           </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <InputField
                formik={formik}
                name="enquiry_type_id"
                type="number"
                label="enquiry_type_id"
                placeholder="Enter enquiry_type_id"
              />
           </Col>
            <Col span={12}>
              <Form.Item
                name="requirements_id"
                label="Requirements ID"
                validateStatus={
                  formik.touched.requirements_id &&
                  formik.errors.requirements_id
                    ? "error"
                    : ""
                }
                help={
                  formik.touched.requirements_id &&
                  formik.errors.requirements_id
                    ? formik.errors.requirements_id
                    : ""
                }
              >
                <Select
                  placeholder="Select Dealer ID"
                  value={formik.values.requirements_id}
                  onChange={(value) =>
                    formik.setFieldValue("requirements_id", value)
                  }
                  onBlur={() => formik.setFieldTouched("requirements_id", true)}
                  allowClear
                >
                  {requirements.length > 0 ? (
                    requirements.map((item) => (
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
                formik={formik}
                name="dealer_id"
                type="number"
                label="dealer_id"
                placeholder="Enter dealer_id"
              />
            </Col>
            <Col span={12}>
              <InputField
                formik={formik}
                name="recievedDate"
                type="number"
                label="recievedDate"
                placeholder="Enter recievedDate"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                formik={formik}
                name="referedBy"
                type="number"
                label="referedBy"
                placeholder="Enter referedBy"
              />
            </Col>
            <Col span={12}>
              <InputField
                formik={formik}
                name="refer_country_code"
                type="number"
                label="refer_country_code"
                placeholder="Enter refer_country_code"
              />
           </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <InputField
                formik={formik}
                name="notes"
                label="notes"
                placeholder="Enter notes"
              />
            </Col>
            <Col span={12}>
              <InputField
                formik={formik}
                name="description"
                label="description"
                placeholder="Enter description"
              />
           </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                formik={formik}
                name="isNew"
                type="number"
                label="isNew"
                placeholder="Enter isNew"
              />
           </Col>
            <Col span={12}>
              <InputField
                formik={formik}
                name="latitude"
                type="number"
                label="Latitude"
                placeholder="Enter Latitude"
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <InputField
                formik={formik}
                name="longitude"
                type="number"
                label="longitude"
                placeholder="Enter longitude"
              />
            </Col>
            <Col span={12}>
              <InputField
                formik={formik}
                name="customerId"
                type="number"
                label="customerId"
                placeholder="Enter customerId"
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <InputField
                formik={formik}
                name="upload_file"
                label="upload_file"
                placeholder="Enter upload_file"
              />
            </Col>
            <Col span={12}>
              {" "}
              <InputField
                formik={formik}
                name="approximate_amount"
                type="number"
                label="approximate_amount"
                placeholder="Enter approximate_amount"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <InputField
                formik={formik}
                name="pincode"
                type="number"
                label="Pincode"
                placeholder="Enter pincode"
              />
            </Col>
            <Col span={12}>
              <InputField
                formik={formik}
                name="schedule_date"
                type="number"
                label="schedule_date"
                placeholder="Enter schedule_date"
              />
           </Col>
          </Row>
          <Form.Item>
            <Button onClick={formik.handleSubmit}>
              Submit
            </Button>
          </Form.Item>
          
        </Form></Content>
        </Layout>
        
      {/* </Modal> */}
    </>
  );
}

function InputField({ formik, label, name, type = "text", placeholder }) {
  return (
    <>
      <Form.Item
        label={label}
        rules={[{required: true}]}
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

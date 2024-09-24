import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  message,
  Layout,
  Col,
  Row,
  Button,
  Typography,
} from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import {
  createLead,
  dealerDropdown,
  dropdownCategory,
  dropdownEnquiry,
  dropdownRequirements,
  employeeDropdown,
  updateLead,
  viewLead,
} from "../../../../axios/services";

import { useLocation, useNavigate } from "react-router-dom";
import { useToken, useType } from "../../../../utility/hooks";
import { InputFields } from "../../../../type/inputfield";
import {
  arrayProps,
  leaddAddProps,
  requirementsList,
} from "../../../../type/leads";
import { storeDataProps } from "../../../../type/reducer";
import { categoryListProps, enquiryListProps } from "../../../../type/masters";
import { Helmet } from "react-helmet";
const { Content } = Layout;

export default function LeadsAddModal() {
  const navigate = useNavigate();
  const selector = useSelector((state: storeDataProps) => state.auth);
  const componentVariant = "filled";
  const token = useToken();
  const location = useLocation();
  const modalType = location.state?.modalType || "";
  
  const { Title } = Typography;
  const [requirements, setRequirements] = useState<requirementsList[]>([]);
  const [enquire, setEnquire] = useState<enquiryListProps[]>([]);
  const [dealer, setDealer] = useState<arrayProps[]>([]);
  const [category, setCategory] = useState<categoryListProps[]>([]);
  const [employee, setEmployee] = useState<arrayProps[]>([]);
  const userType = useType();
  console.log(modalType, "state");
  const formItemLayout = {
    labelCol: { xs: { span: 2 }, sm: { span: 8 } },
    wrapperCol: { xs: { span: 2 }, sm: { span: 14 } },
  };
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
          landline_number: selectedDealer.landline_number || "",
          whatsapp_country_code: selectedDealer.whatsapp_country_code || "",
          alter_country_code: selectedDealer.alter_country_code || "",
          company_name: selectedDealer.company_name || "",
          contact_person: selectedDealer.contact_person || "",
          address: selectedDealer.address || "",
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
          receivedDate: selectedDealer.receivedDate || "",
          referedBy: selectedDealer.referedBy || "",
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

  const handleUser = (values: leaddAddProps) => {
    if (modalType === "add") {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("name", values.name);
      formData.append("phone_country_code", values.phone_country_code);
      formData.append("address", values.address);
      formData.append("phone", values.phone);
      formData.append("requirements_id", values.requirements_id);
      formData.append("remarks", values.remarks);
      formData.append("landline_number", values.landline_number);
      formData.append("whatsapp_country_code", values.whatsapp_country_code);
      formData.append("alter_country_code", values.alter_country_code);
      formData.append("company_name", values.company_name);
      formData.append("contact_person", values.contact_person);
      formData.append("area", values.area);
      formData.append("email", values.email);
      formData.append("alternative_no", values.alternative_no);
      formData.append("whatsapp_no", values.whatsapp_no);
      formData.append("customer_category_id", values.customer_category_id);
      formData.append("enquiry_type_id", values.enquiry_type_id);
      formData.append("state", values.state);
      formData.append("country", values.country);
      formData.append("city", values.city);
      if(userType !== "3")
        {
          formData.append("dealer_id", values.dealer_id);
        } 
      else 
      {
        formData.append("dealer_id",String(localStorage.getItem("userId")))
      }
      formData.append("assignedTo", values.assignedTo);
      formData.append("receivedDate", values.receivedDate);
      formData.append("referedBy", values.referedBy);
      formData.append("referedPhone", values.referedPhone);
      formData.append("refer_country_code", values.refer_country_code);
      formData.append("notes", values.notes);
      formData.append("description", values.description);
      formData.append("isNew", values.isNew);
      formData.append("latitude", values.latitude);
      formData.append("longitude", values.longitude);
      formData.append("customerId", values.customerId);
      formData.append("Pincode", values.Pincode);
      formData.append("schedule_date", values.schedule_date);
      formData.append("upload_file", values.upload_file);
      formData.append("approximate_amount", values.approximate_amount);

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
    if (modalType === "edit") {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("name", values.name);
      formData.append("phone_country_code", values.phone_country_code);
      formData.append("address", values.address);
      formData.append("phone", values.phone);
      formData.append("requirements_id", values.requirements_id);
      formData.append("leadId", selector.user_id);
      updateLead(formData)
        .then((response) => {
          console.log("API response:", response.data);
          if (response.data.status) {
            message.success(response.data.msg);
          } else {
            message.error(response.data.msg);
          }

          navigate("/lead");
        })
        .catch((err) => {
          console.error("API error:", err);
        });
    }
  };

  useEffect(() => {
    if (modalType === "edit") {
      handleUpdate();
    }
  }, [modalType]);

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
    dealer_id: Yup.string(),
    assignedTo: Yup.number(),
    receivedDate: Yup.number(),
    referedBy: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    referedPhone: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
    refer_country_code: Yup.string(),
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

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    values,
    setFieldTouched,
    setValues,
    setFieldValue,
  } = useFormik({
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
    onSubmit: (values: leaddAddProps) => {
      handleUser(values);
    },
  });
  const handleDropdown = () => {
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
    dropdownCategory(formData)
      .then((response) => {
        console.log(response.data.data);
        setCategory(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    dropdownEnquiry(formData)
      .then((response) => {
        console.log(response.data.data);
        setEnquire(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    employeeDropdown(formData)
      .then((response) => {
        console.log(response.data.data);
        setEmployee(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    formData.append("isDealer", "1");
    dealerDropdown(formData)
      .then((response) => {
        console.log(response.data.data);
        setDealer(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token) {
      handleDropdown();
    }
  }, [token]);
  return (
    <>
    <Helmet>
      <title>LeadsAdd</title>
    </Helmet>
      <Layout>
        <Content >
          <div className="p-3">
            <Title level={1} className="fw-bold">
              {modalType === "add" ? "Add" : "Update"} Lead Details
            </Title>
          </div>
          <div>
            <Form
              className="p-3"
              {...formItemLayout}
              variant={componentVariant}
              onFinish={handleSubmit}
            >
              <Row gutter={[16, 16]}>
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
                    required={true}
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
                    required={false}
                  />
                </Col>
              </Row>
              {/* Phone Fields */}
              <Row>
                <Col span={12}>
                  <InputField
                    name="phone_country_code"
                    label="Phone_code"
                    placeholder="Enter phone code"
                    value={values.phone_country_code}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    required={true}

                  />
                </Col>
                <Col span={12}>
                <InputField
                    name="phone"
                    label="Phone"
                    placeholder="Enter Phone"
                    value={values.phone}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    required={true}
                  />
                 
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <InputField
                    name="whatsapp_country_code"
                    label="whatsapp_code"
                    placeholder="Enter your whatsapp_country_code"
                    value={values.whatsapp_country_code}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    required={false}
                  />
                </Col>
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
                    required={false}
                  />
                  
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                <InputField
                    name="alter_country_code"
                    label="alter_code"
                    placeholder="Enter your alter_country_code"
                    value={values.alter_country_code}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    required={false}
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
                    required={false}
                  />
                  
                </Col>
              </Row>
              <Row>
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
                    required={true}
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
                    required={false}
                  />
                </Col>
              </Row>

              <Row>
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
                    required={false}
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
                    required={false}
                  />
                </Col>
              </Row>
              <Row>
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
                    required={false}
                  />
                </Col>
                <Col span={12}>
                <InputField
                    name="landline_number"
                    type="number"
                    label="Landline Number"
                    placeholder="Enter your Landline Number"
                    value={values.landline_number}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    required={false}
                  />
                </Col>
              </Row>
              <Row>
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
                    required={false}
                  />
                </Col>
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
                    required={false}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                <Form.Item
                    name="requirements_id"
                    label="Requirements"
                    required
                    validateStatus={
                      touched.requirements_id && errors.requirements_id
                        ? "error"
                        : ""
                    }
                    help={
                      touched.requirements_id && errors.requirements_id
                        ? errors.requirements_id
                        : ""
                    }
                  >
                    <Select
                      placeholder="Select Requirements"
                      value={values.requirements_id}
                      onChange={(value) =>
                        setFieldValue("requirements_id", value)
                      }
                      onBlur={() => setFieldTouched("requirements_id", true)}
                      allowClear
                    >
                      {requirements.length > 0 ? (
                        requirements?.map((item: any) => (
                          <Select.Option
                            key={item?.RequirementsId}
                            value={item?.RequirementsId}
                          >
                            {item?.RequirementsName}
                          </Select.Option>
                        ))
                      ) : (
                        <Select.Option disabled>
                          No Data Available
                        </Select.Option>
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="customer_category_id"
                    label="Customer Category"
                    validateStatus={
                      touched.customer_category_id &&
                      errors.customer_category_id
                        ? "error"
                        : ""
                    }
                    help={
                      touched.customer_category_id &&
                      errors.customer_category_id
                        ? errors.customer_category_id
                        : ""
                    }
                  >
                    <Select
                      placeholder="Select Customer Category"
                      value={values.customer_category_id}
                      
                      onChange={(value) =>
                        setFieldValue("customer_category_id", value)
                      }
                      onBlur={() =>
                        setFieldTouched("customer_category_id", true)
                      }
                      allowClear
                    >
                      {category.length > 0 ? (
                        category?.map((item: any) => (
                          <Select.Option
                            key={item?.categoryId}
                            value={item?.categoryId}
                          >
                            {item?.categoryName}
                          </Select.Option>
                        ))
                      ) : (
                        <Select.Option disabled>
                          No Data Available
                        </Select.Option>
                      )}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Form.Item
                    name="enquiry_type_id"
                    label="Enquire Type"
                    validateStatus={
                      touched.enquiry_type_id && errors.enquiry_type_id
                        ? "error"
                        : ""
                    }
                    help={
                      touched.enquiry_type_id && errors.enquiry_type_id
                        ? errors.enquiry_type_id
                        : ""
                    }
                  >
                    <Select
                      placeholder="Select Enquiry Type"
                      value={values.enquiry_type_id}
                      onChange={(value) =>
                        setFieldValue("enquiry_type_id", value)
                      }
                      onBlur={() => setFieldTouched("enquiry_type_id", true)}
                      allowClear
                    >
                      {enquire.length > 0 ? (
                        enquire?.map((item: any) => (
                          <Select.Option
                            key={item?.enquiryId}
                            value={item?.enquiryId}
                          >
                            {item?.enquiryName}
                          </Select.Option>
                        ))
                      ) : (
                        <Select.Option disabled>
                          No Data Available
                        </Select.Option>
                      )}
                    </Select>
                  </Form.Item>
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
                    required={false}
                  />
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                <InputField
                    name="Pincode"
                    type="number"
                    label="Pincode"
                    placeholder="Enter pincode"
                    value={values.Pincode}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    required={false}
                  />
                  
                </Col>
                <Col span={12}>
                  <InputField
                    name="receivedDate"
                    type="number"
                    label="receivedDate"
                    placeholder="Enter receivedDate"
                    value={values.receivedDate}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    required={false}
                  />
                </Col>
              </Row>
              <Row>
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
                    required={false}
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
                    required={false}
                  />
                </Col>
              </Row>

              <Row>
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
                    required={false}
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
                    required={false}
                  />
                </Col>
              </Row>
              <Row>
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
                    required={false}
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
                    required={false}
                  />
                </Col>
              </Row>

              <Row>
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
                    required={false}
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
                    required={false}
                  />
                  
                </Col>
              </Row>

              <Row>
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
                    required={false}
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
                    required={false}
                  />
                </Col>
              </Row>
              <Row>
                
                {userType !== "3" && (
                  <Col span={12}>
                  <Form.Item
                    name="dealer_id"
                    label="Dealer"
                    validateStatus={
                      touched.dealer_id && errors.dealer_id ? "error" : ""
                    }
                    help={
                      touched.dealer_id && errors.dealer_id
                        ? errors.dealer_id
                        : ""
                    }
                  >
                    <Select
                      placeholder="Select Dealer"
                      value={values.dealer_id}
                      onChange={(value) => setFieldValue("dealer_id", value)}
                      onBlur={() => setFieldTouched("dealer_id", true)}
                      allowClear
                    >
                      {dealer.length > 0 ? (
                        dealer?.map((item: any) => (
                          <Select.Option
                            key={item?.userId}
                            value={item?.userId}
                          >
                            {item?.userName}
                          </Select.Option>
                        ))
                      ) : (
                        <Select.Option disabled>
                          No Data Available
                        </Select.Option>
                      )}
                    </Select>
                  </Form.Item>
                  </Col>
                  )}
                
                <Col span={12}>
                <Form.Item
                    name="assignedTo"
                    label="assignedTo"
                    validateStatus={
                      touched.assignedTo && errors.assignedTo ? "error" : ""
                    }
                    help={
                      touched.assignedTo && errors.assignedTo
                        ? errors.assignedTo
                        : ""
                    }
                  >
                    <Select
                      placeholder="Select Value"
                      value={values.assignedTo}
                      onChange={(value) => setFieldValue("assignedTo", value)}
                      onBlur={() => setFieldTouched("assignedTo", true)}
                      allowClear
                    >
                      {employee.length > 0 ? (
                        employee?.map((item: any) => (
                          <Select.Option
                            key={item?.userId}
                            value={item?.userId}
                          >
                            {item?.userName}
                          </Select.Option>
                        ))
                      ) : (
                        <Select.Option disabled>
                          No Data Available
                        </Select.Option>
                      )}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <div className="ms-5">
                <Form.Item className="ms-5 mx-auto p-3 me-5">
                <Button type="primary" htmlType="submit" className="ms-5 mx-auto">
                  Submit
                </Button>

              </Form.Item>
              </div>
              
            </Form>
          </div>
        </Content>
      </Layout>
    </>
  );
}

function InputField({
  label = "",
  name,
  type = "text",
  placeholder,
  value,
  touched,
  errors,
  handleBlur,
  handleChange,
  required=false
}: InputFields) {
  return (
    <>
      <Form.Item
        label={label}
        required={required}
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
    </>
  );
}

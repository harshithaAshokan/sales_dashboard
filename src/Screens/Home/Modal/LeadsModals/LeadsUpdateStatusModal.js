import React, { useEffect, useState } from "react";
import { Modal, Select, Form, Input, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLeadStatus,
  dropdownCompetitor,
  dropdownEnquiry,
  listLeadStatus,
} from "../../../../axios/services";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToken } from "../../../../utility/hooks";

export default function LeadUpdateStatusModal({ listapical ,close}) {
  const selector = useSelector((state) => state.auth);
  const token = useToken();
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [leadStatusList,setLeadStatusList] = useState([]);
  const [enquiry,setEnquiry] = useState([])
  const [competitor,setCompetitor] = useState([])

  // Handle form submission
  const handleOk = (values) => {
    console.log("Form values on submit:", values); // Debugging
    const formData = new FormData();
    formData.append("token", token);
    formData.append("leadId", selector.user_id);
    formData.append("leadStatus", values.leadStatus);
    formData.append("comment", values.comments);
    formData.append("follow_up_date", values.follow_up_date);
    formData.append("poc_date", values.poc_date);
    formData.append("demo_date", date);
    formData.append("competitor", values.competitor?.label || "");
    formData.append("competitor_id", values.competitor?.value || "");
    formData.append("dropReason", values.dropReason);
    formData.append("enquiry_type", values.enquiry_type);

    // API call
    changeLeadStatus(formData)
      .then((response) => {
        console.log("API Response:", response); // Debugging
        listapical();
        close()
      })
      .catch((err) => {
        console.log("API Error:", err);
      });
  };

  const handleCancel = () => {
   close()
  };

  // Form validation schema
  const userValidationSchema = Yup.object({
    leadStatus: Yup.string().required("Lead status is required"),
    comments: Yup.string(),
    competitor: Yup.object(),
    dropReason: Yup.string(),
    follow_up_date: Yup.date(),
    poc_date: Yup.date(),
    demo_date: Yup.date(),
    enquiry_type: Yup.string(),
  });

  // Formik initialization
  const {values,handleBlur,handleChange,handleSubmit,setFieldValue,setFieldTouched} = useFormik({
    initialValues: {
      leadStatus: "",
      comments: "",
      competitor: "",
      dropReason: "",
      follow_up_date: "",
      poc_date: "",
      demo_date: "",
      enquiry_type: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      console.log(values,'values in the list ')
      handleOk(values);
    },
  });

  const handleListLeadStatus = () => {
    const formData = new FormData();
    formData.append("token", token);
    listLeadStatus(formData)
      .then((response) => {
        setLeadStatusList(response.data.data);
      })
      .catch((Err) => {
        console.log("Lead Status Error:", Err);
      });
  }
  // Fetch lead statuses
  useEffect(() => {
    handleListLeadStatus()
  }, [token, dispatch]);

  const handleDropDown = () =>{
    const formData = new FormData();
    formData.append("token", token);
    dropdownEnquiry(formData)
      .then((response) => {
        setEnquiry(response.data.data);
      })
      .catch((Err) => {
        console.log("Enquiry Dropdown Error:", Err);
      });
    dropdownCompetitor(formData)
      .then((response) => {
        setCompetitor(response.data.data);
      })
      .catch((err) => {
        console.log("Competitor Dropdown Error:", err);
      });
  }

  // Fetch enquiry types and competitors
  useEffect(() => {
    handleDropDown();
  }, [
    values.leadStatus, token, dispatch]);

  return (
    <>
      <Modal
        title="Update Lead Status"
        centered
        open={true}
        onOk={
          handleSubmit}  // Ensure formik submission is linked
        onCancel={handleCancel}
      >
        <Form onFinish={
          handleSubmit}>
          <Form.Item name="leadStatus">
            <Select
              placeholder="Select Lead Status"
              value={
                values.leadStatus}
              onChange={(value) => 
                setFieldValue("leadStatus", value)}
              onBlur={() => 
                setFieldTouched("leadStatus", true)}
              allowClear
            >
              {leadStatusList?.map((item) => (
                <Select.Option key={item.leadStatusId} value={item.leadStatusId}>
                  {item.leadStatusName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {(
            values.leadStatus === 2 ||
            
            values.leadStatus === 4 ||
            
            values.leadStatus === 1 ||
            
            values.leadStatus === 9 ||
            
            values.leadStatus === 17 ||
            
            values.leadStatus === 6) && (
            <Form.Item name="comments">
              <Input
                placeholder="Enter your comments"
                value={
                  values.comments}
                onChange={
                  handleChange}
                onBlur={
                  handleBlur}
              />
            </Form.Item>
          )}

          {
          values.leadStatus === 7 && (
            <>
              <Form.Item name="competitor">
                <Select
                  style={{ width: 120 }}
                  allowClear
                  options={competitor?.map((comp) => ({
                    label: comp.competitorName,
                    value: comp.competitorId,
                  }))}
                  placeholder="Select Competitor"
                  value={
                    values.competitor?.competitorName}
                  onChange={(val, option) => 
                    setFieldValue("competitor", option)}
                />
              </Form.Item>
              <Form.Item name="dropReason">
                <Input
                  placeholder="Enter drop reason"
                  value={
                    values.dropReason}
                  onChange={
                    handleChange}
                  onBlur={
                    handleBlur}
                />
              </Form.Item>
            </>
          )}

          {
          values.leadStatus === 3 && (
            <>
              <Form.Item label="Demo Date">
                <DatePicker
                  showTime
                  name="demo_date"
                  value={
                    values.demo_date}
                  onChange={(date, dateString) => {
                    
                    setFieldValue("demo_date", date);
                    setDate(dateString);
                  }}
                  onBlur={() => 
                    setFieldTouched("demo_date", true)}
                />
              </Form.Item>
              <Form.Item
                name="comments"
                value={
                  values.comments}
                onChange={
                  handleChange}
                onBlur={
                  handleBlur}
              >
                <Input placeholder="Enter your comments" />
              </Form.Item>
            </>
          )}

          {
          values.leadStatus === 5 && (
            <>
              <Form.Item label="Follow Up Date">
                <DatePicker
                  showTime
                  name="follow_up_date"
                  value={
                    values.follow_up_date}
                  onChange={(date, dateString) => {
                    
                    setFieldValue("follow_up_date", date);
                    setDate(dateString);
                  }}
                  onBlur={() => 
                    setFieldTouched("follow_up_date", true)}
                />
              </Form.Item>
              <Form.Item name="enquiry_type" label="Enquiry Type">
                <Select
                  placeholder="Select Enquiry Type"
                  value={
                    values.enquiry_type}
                  onChange={(value) =>
                    
                    setFieldValue("enquiry_type", value)
                  }
                  onBlur={() => 
                    setFieldTouched("enquiry_type", true)}
                  allowClear
                >
                  {enquiry?.map((item) => (
                    <Select.Option key={item.enquiryId} value={item.enquiryId}>
                      {item.enquiryName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="comments"
                value={
                  values.comments}
                onChange={
                  handleChange}
                onBlur={
                  handleBlur}
              >
                <Input placeholder="Enter your comments" />
              </Form.Item>
            </>
          )}

          {
          values.leadStatus === 24 && (
            <>
              <Form.Item label="POC Date">
                <DatePicker
                  showTime
                  name="poc_date"
                  value={
                    values.poc_date}
                  onChange={(date, dateString) => {
                    
                    setFieldValue("poc_date", date);
                    setDate(dateString);
                  }}
                  onBlur={() => 
                    setFieldTouched("poc_date", true)}
                />
              </Form.Item>
              <Form.Item
                name="comments"
                value={
                  values.comments}
                onChange={
                  handleChange}
                onBlur={
                  handleBlur}
              >
                <Input placeholder="Enter your comments" />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
}

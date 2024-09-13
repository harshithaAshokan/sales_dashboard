import React, { useState , useEffect} from "react";
import { Form, Input,Select, message, Layout, Typography,Row,Col,Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { handleShowAddModal, handleShowUpdateModal } from "../../../../redux/reducers/AuthReducers";
import { dropdownRequirements, updateLead, viewLead} from "../../../../axios/services";
import classes from './LeadsEditModal.module.css'
import { useNavigate } from "react-router-dom";
import { useToken } from "../../../../utility/hooks";
const { Content } = Layout;
const { Title } = Typography;
export default function LeadsEditModal({ listapical }) {
  const dispatch = useDispatch();
  const [componentVariant, setComponentVariant] = useState("filled");
  const token = useToken();
  const selector = useSelector((state) => state.auth);
  const [requirements,setRequirements] = useState([]);
 const navigate = useNavigate();
  const handleCancel = () => {
    console.log("Clicked cancel button");
    dispatch(handleShowAddModal(false));
    dispatch(handleShowUpdateModal(false));
  };

  const formItemLayout = {
    labelCol: { xs: { span: 10 }, sm: { span: 14 } },
    wrapperCol: { xs: { span: 14 }, sm: { span: 14 } },
  };

  const handleUpdate = () => {
    const updateData = new FormData();
    updateData.append("token", token);
    updateData.append("leadId", selector.user_id);
    viewLead(updateData)
      .then((response) => {
        console.log(response.data.data);
        const selectedDealer = response.data.data;
        formik.setValues({
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
  const handleUpdateUser = (values) => {
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
  };

  const handleRequirements = () =>{
    const formData = new FormData();
    formData.append("token",token)
    dropdownRequirements(formData).then((response) => {
      console.log(response.data.data);
      setRequirements(response.data.data)
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    handleRequirements();
  },[])

  const userValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email format"),
    name: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Must be alphabets")
      .required("Name is required"),
      remarks: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
      phone_country_code: Yup.string().required("Phone country code is required"),
      landline_number: Yup.string()
      .matches(/^[6789][0-9]{9}$/, "Number must be 10 digits"),
      whatsapp_country_code: Yup.string(),
      alter_country_code: Yup.string(),
      company_name: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
      contact_person:Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
      address: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets").required("Address is required"),
      area: Yup.string().matches(/^[a-zA-Z]+$/, "Must be alphabets"),
      alternative_no: Yup.string()
      .matches(/^[6789][0-9]{9}$/, "Number must be 10 digits"),
      whatsapp_no: Yup.string()
      .matches(/^[6789][0-9]{9}$/, "Number must be 10 digits"),
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
      handleUpdateUser(values);
    },
  });

  useEffect(() => {
    
      handleUpdate();
    
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

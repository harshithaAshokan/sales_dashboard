import React, { useEffect } from "react";
import { Modal, Form, Input, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { createMasters, updateMasters } from "../../../../axios/services";
import { useToken } from "../../../../utility/hooks";
import { InputFields } from "../../../../type/inputfield";
import { storeDataProps } from "../../../../type/reducer";
import {
  categoryListProps,
  enquiryListProps,
  requirementsListProps,
} from "../../../../type/masters";
import { masterFilterProps } from "../../../../type/filter";

interface formValues {
  listapical: (page: number, size: number, value: masterFilterProps) => void;
  value: string;
  close: () => void;
  add: boolean;
  update: boolean;
  list: requirementsListProps[] | enquiryListProps[] | categoryListProps[];
  current: number;
}

interface valueProps {
  name: string;
}

export default function MastersAddModal({
  listapical,
  value,
  close,
  add,
  update,
  list,
  current,
}: formValues) {
  const token = useToken();
  const selector = useSelector((state: storeDataProps) => state.auth);
  const formItemLayout = {
    labelCol: { xs: { span: 2 }, sm: { span: 8 } },
    wrapperCol: { xs: { span: 2 }, sm: { span: 14 } },
  };
  const componentVariant = "filled";
  const handleCancel = () => {
    close();
  };
  const filterValue = {
    name: "",
  };

  const handleUpdateList = () => {
    if (value === "category") {
      const List = (list as categoryListProps[])?.find(
        (ele: categoryListProps) => ele.customerCategoryId === selector.user_id
      );
      if (List) {
        setValues({
          name: List.customerCategoryName,
        });
      }
    }
    if (value === "Enquiry") {
      const List = (list as enquiryListProps[])?.find(
        (ele: enquiryListProps) => ele.enquireId === selector.user_id
      );
      if (List) {
        setValues({
          name: List.enquireTypeName,
        });
      }
    }
    if (value === "requirements") {
      const List = (list as requirementsListProps[])?.find(
        (ele: requirementsListProps) => ele.RequirementsId === selector.user_id
      );
      if (List) {
        setValues({
          name: List.RequirementsName,
        });
      }
    }
  };

  const handleCreateUser = (values: valueProps) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("name", values.name);
    if (add) {
      createMasters(formData, value)
        .then((response) => {
          console.log("API response:", response.data);
          listapical(current, 10, filterValue);
          message.success(response.data.msg);
          if (response.data.status) {
            handleCancel();
          }
        })
        .catch((err) => {
          console.error("API error:", err);
        });
    }
    if (update) {
      formData.append("dataId", selector.user_id);
      updateMasters(formData, value).then((response) => {
        console.log("API response:", response.data);
        listapical(current, 10, filterValue);
        if (response.data.status) {
          message.success(response.data.msg);
        } else {
          message.error(response.data.msg);
        }

        handleCancel();
      });
    }
  };

  const userValidationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Must be alphabets")
      .required("Name is required"),
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      handleCreateUser(values);
    },
  });

  useEffect(() => {
    if (update) {
      handleUpdateList();
    }
  }, [update]);

  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default action if needed
    handleSubmit();
  };

  return (
    <>
      <Modal
        title={update ? "EDIT DETAILS" : "ADD DETAILS"}
        open={true}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...formItemLayout}
          variant={componentVariant}
          style={{ maxWidth: 600 }}
        >
          <InputField
            name="name"
            label="Name"
            placeholder="Enter Name"
            value={values.name}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
            required={true}
          />
        </Form>
      </Modal>
    </>
  );
}

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  touched,
  errors,
  handleBlur,
  handleChange,
  required
}: InputFields) {
  return (
    <>
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
    </>
  );
}

import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import classes from './ForgotPassword.module.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotPassword } from "../../../axios/services";
const { Title } = Typography;
export default function ForgotPassword() {
    
    const navigate = useNavigate();
    const handleForgotPassword = (values) => {
        const formData = new FormData();
        formData.append("email", values.email);
        forgotPassword(formData)
            .then((response) => {
                sessionStorage.setItem("reset_key",response.data.reset_key)
                message.success(response.data.msg);
                if(response.data.status) 
                {
                   navigate("/verifyotp"); 
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const userValidationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: userValidationSchema,
        onSubmit: (values) => {
            handleForgotPassword(values);
        },
    });

    return (
        <div className={classes.container}>
            <div className={classes.formContainer}>
                <Title level={3} className={`text-white ${classes.title}`}>
                    Forgot Password
                </Title>
                <Form
                    
                    style={{ maxWidth: 600 }}
                    onFinish={formik.handleSubmit}
                >
                    <InputField
                        formik={formik}
                        name="email"
                        placeholder="Enter Email"
                    />
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className={classes.createAccountButton}
                    >
                        Send OTP
                    </Button>
                </Form>
            </div>
        </div>
    );
}

function InputField({ formik, name, type = "text", placeholder }) {
    return (
        <Form.Item
            
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
                className={classes.input}
            />
        </Form.Item>
    );
}

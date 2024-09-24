import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import classes from './ResetPassword.module.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import { resetPassword } from "../../../axios/services";
import { Helmet } from "react-helmet";

const { Title } = Typography;

interface formValues {
    password : string
    confirm_password : string
}

export default function ResetPassword() {
  
    const navigate = useNavigate();

    const userValidationSchema = Yup.object({
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required("Confirm password is required"),
    });

    const handleResetPassword = (values : formValues) => {
        const formData = new FormData();
        formData.append("resetKey", sessionStorage.getItem("rest_key") as string);
        formData.append("newPassword", values.password);
        resetPassword(formData)
            .then((response) => {
                if(response.data.status){
                    message.success(response.data.msg)
                    navigate("/login"); 
                  }
                  else {
                    message.error(response.data.msg)
                  } 
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const formik = useFormik({
        initialValues: {
            password: "",
            confirm_password: "",
        },
        validationSchema: userValidationSchema,
        onSubmit: (values) => {
            handleResetPassword(values);
        },
    });

    return (
        <div className={classes.container}>
            <div className={classes.formContainer}>
                <Helmet>
                    <title>ResetPassword</title>
                </Helmet>
                <Title level={3} className={classes.title}>
                    Reset Password
                </Title>
                <Form
                    onFinish={formik.handleSubmit} // Connect formik's handleSubmit to onFinish
                >
                    <Form.Item
                        validateStatus={formik.touched.password && formik.errors.password ? "error" : ""}
                        help={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                    >
                        <Input.Password
                            name="password"
                            placeholder="Enter password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={classes.input}
                        />
                    </Form.Item>
                    <Form.Item
                        validateStatus={formik.touched.confirm_password && formik.errors.confirm_password ? "error" : ""}
                        help={formik.touched.confirm_password && formik.errors.confirm_password ? formik.errors.confirm_password : ""}
                    >
                        <Input.Password
                            name="confirm_password"
                            placeholder="Confirm password"
                            value={formik.values.confirm_password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={classes.input}
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className={`fw-medium fs-6 ${classes.createAccountButton}`}
                    >
                        Reset Password
                    </Button>
                </Form>
            </div>
        </div>
    );
}

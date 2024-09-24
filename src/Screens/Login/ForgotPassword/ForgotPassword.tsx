import { Form, Input, Button, Typography, message} from "antd";
import { useNavigate } from "react-router-dom";
import classes from './ForgotPassword.module.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotPassword } from "../../../axios/services";
import { InputFieldProps } from "../../../type/forgotpassowrd";
import { Helmet } from "react-helmet";
const { Title } = Typography;
export default function ForgotPassword() {

    interface formValues {
        email:string
    }

    const navigate = useNavigate();
    const handleForgotPassword = (values : formValues) => {
        const formData = new FormData();
        formData.append("email", values.email);
        forgotPassword(formData)
            .then((response) => {
                sessionStorage.setItem("reset_key",response.data.reset_key)
                if(response.data.status){
                    message.success(response.data.msg)
                    navigate("/verifyotp"); 
                  }
                  else {
                    message.error(response.data.msg)
                  }
                
            })

            .catch((err) => {
                console.log(err);
            });
    };

    const userValidationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
    });

    const {values,handleBlur,handleChange,handleSubmit,touched,errors} = useFormik({
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
                <Helmet>
                    <title>Forgot Password</title>
                </Helmet>
                <Title level={3} className={`text-white ${classes.title}`}>
                    Forgot Password
                </Title>
                <Form
                    
                    style={{ maxWidth: 600 }}
                    onFinish={handleSubmit}
                >
                    <InputField
                        name="email"
                        placeholder="Enter Email"
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.email}
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

function InputField({ name ,type = "text",placeholder,touched,errors,handleBlur,handleChange,value}:InputFieldProps) {
    return (
        <Form.Item
            
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
                className={classes.input}
            />
        </Form.Item>
    );
}

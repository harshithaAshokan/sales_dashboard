import React from "react";
import { Form, Input, Button, Checkbox, Typography, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { handleLogin} from "../../../redux/reducers/LoginReducers";
import { loginServices } from "../../../axios/services";

const { Title } = Typography;

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sha1 = require('sha1');

    const handleForgotPassword = () => {
        navigate("/forgotpwd");
    };

    const onFinish = (values) => {
        const formData = new FormData();
        formData.append("userName", values.username);
        formData.append("password", values.password);
        formData.append("device_type", "3");
        formData.append("authcode", sha1("lkjfjIHJL@fdj385!jhg" + values.username));
        loginServices(formData)
            .then((response) => {
                console.log("login",response.data)
                dispatch(handleLogin(response.data.token));
                localStorage.setItem("userdata", JSON.stringify(response.data.token));
                localStorage.setItem("username",values.username);
                sessionStorage.setItem("userType",response.data.userType)
                sessionStorage.setItem("userId",response.data.userId)
                message.success(response.data.msg)
                if(response.data.status)
                {
                   navigate("/dashboard"); 
                } 
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    };

    return (
        <div className={classes.container}>
            <div className={classes.formContainer}>
                <Title level={3} className={`text-white ${classes.title}`}>
                    Create an account
                </Title>
                <Form
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                    className={classes.form}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            placeholder="UserName"
                            className={`text-black ${classes.input}`}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            placeholder="Password"
                            className={classes.input}
                        />
                    </Form.Item>

                    <div className="row">
                        <div className="col">
                            <Form.Item>
                                <Checkbox className={classes.checkbox}>Remember me</Checkbox>
                            </Form.Item>
                        </div>
                        <div className="col mt-1 text-white">
                            <a className="link-opacity-100 text-white" onClick={handleForgotPassword}>
                                Forgot Password?
                            </a>
                        </div>
                    </div>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            className={classes.createAccountButton}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import classes from "./VerifyOtp.module.css";
import { verifyOtp, resendOtp } from "../../../axios/services"; 
import { Helmet } from "react-helmet";
const { Title } = Typography;

export default function ResetPassword() {
  
  const [texts, setTexts] = useState("");
  const [timeLeft, setTimeLeft] = useState(30); 
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); 
  const [showResendButton, setShowResendButton] = useState(false); 

  const navigate = useNavigate();

  // Timer countdown logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setIsButtonDisabled(true); // Disable the "Verify OTP" button once timer hits 0
      setShowResendButton(true); // Show "Resend OTP" button
      message.error("OTP expired! You can request a new one.");
    }
  }, [timeLeft]);

  // Format timer display as MM:SS
  const formatTime = (seconds:number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const onChange = (values:string) => {
    setTexts(values);
  };

  const sharedProps = {
    onChange,
  };

  const handleOtp = () => {
    if (texts.trim() === "") {
      message.error("Please enter the OTP.");
      return;
    }

    const formData = new FormData();
    formData.append("otp", texts);
    formData.append("resetKey", sessionStorage.getItem("reset_key") as string);

    verifyOtp(formData)
      .then((response) => {
        sessionStorage.setItem("reset_key",response.data.reset_key)
        if(response.data.status){
          message.success(response.data.msg)
          navigate("/resetpwd"); 
        }
        else {
          message.error(response.data.msg)
        }
        
      })
      .catch((error) => {
        message.error("Failed to verify OTP.",error);
      });
  };

  // Handle "Resend OTP" action
  const handleResendOtp = () => {
    const formData = new FormData();
    formData.append("resetKey", sessionStorage.getItem("reset_key") as string);
    resendOtp(formData) 
      .then((response) => {
        message.success("OTP has been resent!");
        sessionStorage.setItem("reset_key",response.data.reset_key)
        setTimeLeft(30); 
        setIsButtonDisabled(false); 
        setShowResendButton(false); 
      })
      .catch((error) => {
        message.error("Failed to resend OTP. Please try again.");
      });
  };

  

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <Helmet>
          <title>VerifyOtp</title>
        </Helmet>
        <Title level={3} className={`text-white ${classes.title}`}>
          Verify OTP
        </Title>

        <Form
        
          style={{ maxWidth: 600 }}
        >
          <Input.OTP
            className={classes.input}
            value={texts}
            formatter={(str) => str.replace(/\D/g,"")} // Handle numeric OTP input
            {...sharedProps}
          />
          <Button
            type="primary"
            htmlType="submit"
            block
            className={classes.createAccountButton}
            onClick={handleOtp}
            disabled={isButtonDisabled} // Disable if time runs out
          >
            Verify OTP
          </Button>

          <div className={`mt-3 ${classes.timer}`}>
            <h6 className="text-white">Time remaining:</h6>{" "}
            <strong className="text-white">{formatTime(timeLeft)}</strong>
          </div>

          {/* Resend OTP Button */}
          {showResendButton && (
            <Button
              type="primary"
              block
              className={`fw-medium fs-6 ${classes.createAccountButton}`}
              onClick={handleResendOtp}
            >
              Resend OTP
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
}

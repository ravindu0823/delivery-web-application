import { useState, useEffect, FormEvent } from "react";
import { OTPVerificationProps } from "../utils/Props";
import "../styles/Auth.css";

const OTPVerification = ({ onVerify, onResendOTP }: OTPVerificationProps) => {
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleVerify = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onVerify(otp.join(""));
  };

  const handleResend = () => {
    setOtp(new Array(5).fill(""));
    setTimeLeft(30);
    onResendOTP();
  };

  return (
    <div className="auth-overlay">
      <div className="auth-container">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue  animate-pulse">
          OTP Verification
        </h2>
        <form onSubmit={handleVerify}>
          <div className="otp-container">
            {otp.map((data, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  className="otp-input"
                />
              );
            })}
          </div>
          <button type="submit" className="auth-submit-btn bg-blue-500">
            Verify OTP
          </button>
        </form>
        <div className="timer">
          {timeLeft > 0 ? (
            <span className="text-red-500">Time left: {timeLeft} seconds</span>
          ) : (
            <button onClick={handleResend} className="text-blue-500">
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;

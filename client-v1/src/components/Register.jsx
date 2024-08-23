import React, { useState } from 'react';
import OTPVerification from './OTPVerification';
import '../css/Auth.css';

const Register = ({ onClose, switchToSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle register logic here
    setIsVerifyingOTP(true);
  };

  const handleVerifyOTP = (otp) => {
    // Handle OTP verification logic here
    console.log("OTP Verified:", otp);
    setIsVerifyingOTP(false);
  };

  const handleResendOTP = () => {
    // Handle resending OTP logic here
    console.log("OTP Resent");
  };

  if (isVerifyingOTP) {
    return <OTPVerification onVerify={handleVerifyOTP} onResendOTP={handleResendOTP} />;
  }

  return (
    <div className="auth-overlay">
      <div className="auth-container">
        <button className="auth-close-btn" onClick={onClose}>&times;</button>
        <h2 className="text-3xl font-bold mb-6 text-center text-Blue decoration-wavy">
          Sign Up
        </h2>
        <form onSubmit={handleRegister}>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <label>Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-submit-btn bg-blue-500">Register</button>
        </form>
        <p className="auth-switch text-center">
  - Already have an account? -<br />
  <span onClick={switchToSignIn}>Sign In</span>
</p>
      </div>
    </div>
  );
};

export default Register;

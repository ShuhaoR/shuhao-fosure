// src/components/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; // Reuse the same CSS as the login page
import { useTranslation } from "react-i18next";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch(
        "https://shuhao-fosure.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      if (response.ok) {
        setSuccess(t("注册成功Success! Redirecting to login..."));
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after successful registration
        }, 2000); // 2-second delay
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message || "Registration failed.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-container">
          <img
            src={require("./logo.png")}
            alt="Company Logo"
            className="logo"
          />
          <h1>基金投资助手|投研专家</h1>
        </div>
        <div className="branding-image">
          <img src={require("./invest.png")} alt="Branding" />
        </div>
      </div>
      <div className="login-right">
        <h2>{t("注册")}</h2>
        <form className="login-form">
          <div className="form-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t("用户名")}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("请输入邮箱")}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("请输入密码")}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="button" onClick={handleRegister}>
            {t("注册")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

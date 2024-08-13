// src/components/Login.js

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/styles.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(t("network_error"));
    }
  };

  return (
    <div className="login-container">
      <h1>{t("登录")}</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("电子邮件")}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t("密码")}
      />
      <button onClick={handleLogin}>{t("登录")}</button>
      {error && <p>{error}</p>}
      <p>
        {t("还没有账户？")} <Link to="/register">{t("注册")}</Link>
      </p>
    </div>
  );
};

export default Login;

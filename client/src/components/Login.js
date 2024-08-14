import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/login.css"; // Assuming you will add the styles here

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://shuhao-fosure.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

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

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Call changeLanguage on the i18n instance
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
        <h2>Hello!</h2>
        <p>{t("欢迎登录")}</p>
        <form className="login-form">
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
          <button type="button" onClick={handleLogin}>
            {t("登录")}
          </button>
          <div className="extra-options">
            <Link to="/forgot-password">{t("忘记密码?")}</Link>
            <div className="wechat-login">
              <p>{t("微信扫码登录")}</p>
              {/* Wrap the WeChat logo in an anchor tag */}
              <Link to="/wechat-login">
                <img src={require("./wechat.png")} alt="WeChat Logo" />
              </Link>
            </div>
          </div>
          <p>
            {t("还没有账户？")} <Link to="/register">{t("注册")}</Link>
          </p>
        </form>
        <div className="language-switcher">
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="language-switcher"
            defaultValue={i18n.language}
          >
            <option value="en">English</option>
            <option value="zh">Language:中文</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Login;

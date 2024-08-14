// src/components/WeChatLogin.js
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/login.css"; // Use the same CSS file

const WeChatLogin = () => {
  const { t } = useTranslation();

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
        <h2>{t("WeChat Login")}</h2>
        <p>{t("请扫描下方二维码登录")}</p>
        <div className="wechat-qr">
          <img src={require("./wechat-qr.png")} alt="WeChat QR Code" />
        </div>
        <p>
          <Link to="/login">{t("返回登录")}</Link>
        </p>
      </div>
    </div>
  );
};

export default WeChatLogin;

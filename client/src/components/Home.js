import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/styles.css";
import shanghaiImage from "./shanghai.png"; // Import the image

const Home = () => {
  const { t } = useTranslation();

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${shanghaiImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        padding: "50px",
      }}
    >
      <h1>{t("welcome_message")}</h1>
      <p>{t("one_stop_solution")}</p>
      <div className="home-content">
        <p>
          Fosure是一家领先的投资咨询机构，致力于为客户提供全面且个性化的财务解决方案。我们的专家团队拥有数十年的金融行业经验，为您提供深入的见解和量身定制的投资策略，以帮助您实现独特的投资目标。
        </p>
        <p>
          在Fosure，我们相信通过赋予客户知识和工具，帮助他们做出明智的投资决策。无论您是经验丰富的投资者还是刚开始金融旅程的新手，我们的服务都旨在引导您通过每一个步骤，确保您在最大化回报的同时将风险降到最低。
        </p>
        <p>
          我们最先进的平台提供广泛的服务，包括基金管理、市场分析和投资组合优化。有了Fosure，您可以自信地应对金融市场的复杂性，并实现您的长期财务目标。
        </p>
        <p>
          今天就加入我们，发现Fosure如何通过智能投资策略帮助您实现繁荣的未来。
        </p>
      </div>
    </div>
  );
};

export default Home;

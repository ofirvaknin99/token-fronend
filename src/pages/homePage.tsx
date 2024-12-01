import React from "react";
import { Typography, Button } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
      <Title>Token Security - GitHub Repository Tree Explorer</Title>
      <Paragraph>Explore the file structure of any public GitHub repository.</Paragraph>
      <Link to="/repository-explorer">
        <Button type="primary" size="large">
          Start Exploring
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;

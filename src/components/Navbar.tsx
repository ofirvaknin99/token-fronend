import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => (
  <Menu theme="dark" mode="horizontal">
    <Menu.Item key="home">
      <Link to="/">Home</Link>
    </Menu.Item>
    <Menu.Item key="explorer">
      <Link to="/repository-explorer">Repository Explorer</Link>
    </Menu.Item>
  </Menu>
);

export default Navbar;

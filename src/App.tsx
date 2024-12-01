import { Layout } from "antd";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/homePage";
import RepositoryTreePage from "./pages/RepositoryTreePage";

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Header>
          <Navbar></Navbar>
        </Header>
        <Content className="app-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/repository-explorer" element={<RepositoryTreePage />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;

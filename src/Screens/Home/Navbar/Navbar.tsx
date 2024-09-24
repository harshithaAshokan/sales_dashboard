import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import admin from "../../../assets/leadership.png";
import dealer from "../../../assets/id-card.png";
import employee from "../../../assets/employee.png";
import classes from "./Navbar.module.css";
import usermanager from "../../../assets/usermanage.png";
import category from "../../../assets/category.png";
import require from "../../../assets/required.png";
import enquiry from "../../../assets/enquiry.png";
import logout from "../../../assets/logout.png";
import masters from "../../../assets/masters.png";
import leads from "../../../assets/leads.png";
import dashimg from '../../../assets/dashboard.png';
import { Helmet } from "react-helmet";

const { Sider } = Layout;

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const key = (localStorage.getItem("selectedKey") === "11" ? "1" : localStorage.getItem("selectedKey"))
  const storedKey = key ?? "1";
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const username = localStorage.getItem("username");

  const navigate = useNavigate();

  const Navigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("userdata");
    navigate("/login");
  };

  const handleMenuSelect = ({ key }: { key: string }) => {
    localStorage.setItem("selectedKey", key);
    console.log("Selected key:", key);
  };

  const userType = localStorage.getItem("userType");

  const items: any = [
    {
      key: "1",
      icon: <img src={dashimg} width="20px" height="20px" alt="Dashboard Icon" />,
      label: "Dashboard",
      onClick: () => Navigate("/dashboard"),
    },
    {
      key: "2",
      label: "User Management",
      icon: <img src={usermanager} width="20px" height="20px" alt="User Management Icon" />,
      children: [
        (userType === "2" || userType === "1") ? {
          key: "3",
          label: "Admin",
          icon: <img src={admin} width="20px" height="20px" alt="Admin Icon" />,
          onClick: () => Navigate("/admin"),
        } : null,
        (userType === "2" || userType === "1") ? {
          key: "4",
          label: "Dealer",
          icon: <img src={dealer} width="20px" height="20px" alt="Dealer Icon" />,
          onClick: () => Navigate("/dealer"),
        } : null,
        {
          key: "5",
          label: "Employee",
          icon: <img src={employee} width="20px" height="20px" alt="Employee Icon" />,
          onClick: () => Navigate("/employee"),
        },
      ].filter(Boolean),
    },
    {
      key: "6",
      icon: <img src={leads} width="30px" height="30px" alt="Leads Icon" />,
      label: "Leads",
      onClick: () => Navigate("/lead"),
    },
    (userType === "2" || userType === "1") ? {
      key: "7",
      icon: <img src={masters} width="20px" height="20px" alt="Masters Icon" />,
      label: "Masters",
      children: [
        {
          key: "8",
          label: "Requirements",
          icon: <img src={require} width="20px" height="20px" className="image" alt="Requirements Icon" />,
          onClick: () => Navigate("/requirements"),
        },
        {
          key: "9",
          label: "Enquiry",
          icon: <img src={enquiry} width="20px" height="20px" alt="Enquiry Icon" />,
          onClick: () => Navigate("/enquiry"),
        },
        {
          key: "10",
          label: "Category",
          icon: <img src={category} width="20px" height="20px" alt="Category Icon" />,
          onClick: () => Navigate("/category"),
        },
      ].filter(Boolean),
    } : null,
    {
      key: "11",
      icon: <img src={logout} width="30px" height="30px" alt="Logout Icon" />,
      label: "Logout",
      onClick: handleLogout,
    },
  ].filter(Boolean); // filter out any `null` or `undefined` items

  return (
    <>
    <Helmet>
      <title>Navbar</title>
    </Helmet>
    
    <Layout>
      <Sider
        theme="dark"
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
      >
        <div style={{ padding: "16px", textAlign: "center" }}>
          <Avatar size={64} icon={<UserOutlined />} />
          {!collapsed && <h3 className="text-white">{username}</h3>}
        </div>
        <Menu
          mode="inline"
          theme="dark"
          items={items} // casting items as expected menu item types
          defaultSelectedKeys={[storedKey]}
          onSelect={handleMenuSelect}
        />
      </Sider>
      <Layout className="site-layout">
        <div className={classes.container}>
          <Outlet />
        </div>
      </Layout>
    </Layout>
    </>
  );
};

export default Navbar;

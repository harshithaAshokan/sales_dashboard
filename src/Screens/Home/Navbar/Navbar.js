
import React, { useState } from 'react';
import {
  ContainerOutlined,
  MailOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Layout, Menu } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { MdOutlineDashboard } from "react-icons/md";
import admin from '../../../assets/leadership.png'
import dealer from '../../../assets/id-card.png'
import employee from '../../../assets/employee.png'
import classes from './Navbar.module.css'
const { Sider } = Layout;

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const data = useSelector((state) => state.login);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const username = localStorage.getItem("username");

  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  const handleDealer = () => {
    navigate("/dealer");
  };

  const handleEmployee = () => {
    navigate("/employee");
  };

  const handleLogout = () => {
    localStorage.removeItem("userdata");
    navigate("/login");
  };

  const handleLead = () => {
    navigate("/lead");
  }

  const items = [
    {
      key: '1',
      icon: <MdOutlineDashboard/>,
      label: 'Dashboard',
      onClick: handleDashboard
    },
    {
      key: 'sub1',
      label: 'User Management',
      icon: <MailOutlined />,
      children: [        
        {
          key: '3',
          label: 'Admin',
          icon: <img src={admin} width="20px" height="20px"></img>,
          onClick: handleAdmin
        },
        {
          key: '4',
          label: 'Dealer',
          icon: <img src={dealer} width="20px" height="20px"></img>,
          onClick: handleDealer
        },
        {
          key: '5',
          label: 'Employee',
          icon: <img src={employee} width="20px" height="20px"></img>,
          onClick: handleEmployee
        },
      ],
    },
    {
      key: '6',
      icon: <ContainerOutlined />,
      label: 'Leads',
      onClick: handleLead
    },
    {
      key: '7',
      icon: <ContainerOutlined />,
      label: 'Masters',
    },
    {
      key: '8',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout
    },
  ];

  return (
    <Layout>
      <Sider
        theme="dark"
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
      >
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Avatar size={64} icon={<UserOutlined />} />
          {!collapsed && (
            <>
              <h3 className='text-white'>{username}</h3>
            </>
          )}
        </div>
        <Menu
          mode="inline"
          theme="dark"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <div className={classes.container}>
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
};

export default Navbar;






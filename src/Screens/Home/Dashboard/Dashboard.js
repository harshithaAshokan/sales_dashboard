import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { datacount } from '../../../axios/services';
import { Card, Col, Row, Layout, Typography } from 'antd';
import classes from './Dashboard.module.css'
import { useToken } from '../../../utility/hooks';
const { Content } = Layout;
const { Title } = Typography;

export default function Dashboard() {
  const token = useToken();
  const [productList,setProductList] = useState([]);
  const handleDashboard = () => {
    const formData = new FormData();
    formData.append("token", token);
    datacount(formData)
      .then((response) => {
        setProductList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (token) {
      handleDashboard();
    }
  }, [token]);

  return (
    
     <Layout className={classes.layout}>
        <Title level={1} className='mt-3 text-dark'>Dashboard</Title>
        <Row>
          {productList.length > 0 ? (
            productList.map((item, index) => (
              <Col span={8} key={index} className='p-5'>
                <Card
                  title={item.displayName}
                >
                  <div className='row'>
                    <div className='col-md-4'> 
                      <p className="card-leads-title text-dark fw-bold fs-6">{item.leads.displayName}</p>
                      <p className="card-leads-value text-success fw-bold fs-6">{item.leads.value}</p></div>
                    <div className='col-md-8'>
                      <p className="card-overdue-title fw-bold fs-6">{item.over_due.displayName}</p>
                      <p className="card-overdue-value text-danger fw-bold fs-6">{item.over_due.value}</p></div>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Card bordered={false}>
                <p>No data available</p>
              </Card>
            </Col>
          )}
        </Row>
      </Layout>
    
  );
}

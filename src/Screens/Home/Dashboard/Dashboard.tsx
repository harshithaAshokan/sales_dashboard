import { useEffect, useState } from "react";
import { dashboard, dealerWiseReports } from "../../../axios/services";
import { Card, Col, Row, Layout, Typography } from "antd";
import classes from "./Dashboard.module.css";
import { useToken } from "../../../utility/hooks";
import { Helmet } from "react-helmet";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
const { Title } = Typography;

interface DashboradDataProps {
  displayName: string;
  leads: { displayName: string; value: number };
  over_due: { displayName: string; value: number };
}

export default function Dashboard() {
  const token = useToken();
  const [productList, setProductList] = useState<DashboradDataProps[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [seriesData, setSeriesData] = useState<{ name: string; data: number[] }[]>([]);

  const chartOptions: ApexOptions = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: categories,
    },
  };

  const handleDashboard = () => {
    const formData = new FormData();
    formData.append("token", token);
    
    // Fetch productList data
    dashboard(formData)
      .then((response) => {
        setProductList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch dealer wise report data
    dealerWiseReports(formData)
      .then((response) => {
        const items = response.data?.data?.items ?? [];
        const dealerNames = items.map((item: { Dealer: string }) => item.Dealer);
        const totalLeads = items.map((item: { totalLead: number[] }) => item.totalLead);
        setCategories(dealerNames);
        setSeriesData([{ name: "Total Leads", data: totalLeads.flat() }]);  
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token) {
      handleDashboard();
    }
  }, [token]);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Layout className={classes.layout}>
        <Title level={1} className="mt-3 text-dark">
          Dashboard
        </Title>
        <Row gutter={[16, 16]}>
  {productList.length > 0 ? (
    productList.map((item, index) => (
      <Col
        xs={24}
        sm={12}
        md={12}
        lg={12}
        xl={8}
        key={index}
        className="p-5"
      >
        <Card title={item.displayName} size="default" className="card">
          <Row gutter={16}>
            <Col span={12}>
              <p className="card-leads-title text-dark fw-bold fs-6">
                {item.leads.displayName}
              </p>
              <p className="card-leads-value text-success fw-bold fs-6">
                {item.leads.value}
              </p>
            </Col>
            <Col span={12}>
              <p className="card-overdue-title fw-bold fs-6">
                {item.over_due.displayName}
              </p>
              <p className="card-overdue-value text-danger fw-bold fs-6">
                {item.over_due.value}
              </p>
            </Col>
          </Row>
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
        <center> <div className="mixed-chart">
          <Chart options={chartOptions} series={seriesData} type="bar" width="500" />
        </div></center>
       
      </Layout>
    </>
  );
}

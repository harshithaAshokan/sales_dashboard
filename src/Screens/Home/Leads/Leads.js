import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  
  handleShowDeleteModal,
  handleUserId,
 
  handleUpdateStatusModal,
  handleReassign,
 
  handleShowIsActiveModal,
  
} from "../../../redux/reducers/AuthReducers";
import { Space, Table, Layout, Typography, Pagination, Tooltip, Popover } from "antd";
import { listLead } from "../../../axios/services";

import classes from "./Leads.module.css";
import LeadsDeleteModal from "../Modal/LeadsModals/LeadsDeleteModal";

import LeadUpdateStatusModal from "../Modal/LeadsModals/LeadsUpdateStatusModal";
import Reassignmodal from "../Modal/LeadsModals/Reassignmodal";
import filledbookmark from "../../../assets/bookmark (2).png";
import outlinebookmark from "../../../assets/bookmark (3).png";
import IsActiveModal from "../Modal/LeadsModals/IsActiveModal";
import deleteicon from "../../../assets/delete.png";
import updateicon from "../../../assets/system-update.png";
import filtericon from "../../../assets/setting.png";
import reassignicon from "../../../assets/paper.png";
import updatestatusicon from "../../../assets/update.png";

import LeadFilterModal from "../Modal/LeadsModals/LeadFilterModal";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../../utility/hooks";
const { Content } = Layout;
const { Title } = Typography;
const text = <span>Filter</span>;
export default function Leads() {
  const selector = useSelector((state) => state.auth);
  const token = useToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [leadList,setLeadList] = useState([]);
  const [isActive,setIsActive] = useState(null);
  const [filter,setFilter] = useState(false);
  const handleAdd = () => {
    navigate("/leadsAdd")
    
  };
 

  useEffect(() => {
    if (token) {
      handleLeads(currentPage);
    }
  }, [token,currentPage,selector.search]);

 

  const handleLeads = (page = 1, pageSize = 10,values) => {
    const formData = new FormData();
    formData.append("token", token);
    if(values?.name)
    {
      formData.append("name",values.name);
    }
    if(values?.lead_status)
      {
        formData.append("lead_status",values.lead_status);
      }
      if(values?.lead_id)
        {
          formData.append("lead_id",values.lead_id);
        }
        if(values?.hot_lead)
          {
            formData.append("hot_lead",values.hot_lead);
          }
          if(values?.phone)
            {
              formData.append("phone",values.phone);
            }


    listLead(page, pageSize, formData)
      .then((response) => {
        console.log(response.data);
        setLeadList(response.data.data.items);
        setTotalItems(response.data.data.total_count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (userId) => {
    dispatch(handleShowDeleteModal(true));
    dispatch(handleUserId(userId));
  };

  const handleUpdate = (userId) => {
    dispatch(handleUserId(userId));
    navigate("/leadsUpdate");
  };

  const handleUpdateStatus = (userId) => {
    dispatch(handleUpdateStatusModal(true));
    dispatch(handleUserId(userId));
  };

  const handleleadReassign = (userId) => {
    dispatch(handleReassign(true));
    dispatch(handleUserId(userId));
  };

  const handleActive = (userId, isActive) => {
    dispatch(handleShowIsActiveModal(true));
    dispatch(handleUserId(userId));
    setIsActive(isActive);
  };
  
  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Lead Status Name",
      dataIndex: "leadstatusname",
      key: "leadstatusname",
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="bottom" title="Update">
            <img
              src={updateicon}
              width="20px"
              height="20px"
              onClick={() => handleUpdate(record.userId)}
            ></img>
          </Tooltip>
          <Tooltip placement="bottom" title="Delete">
            <img
              src={deleteicon}
              width="20px"
              height="20px"
              onClick={() => handleDelete(record.userId)}
            ></img>
          </Tooltip>
          <Tooltip placement="bottom" title="Update_Status">
            <img
              src={updatestatusicon}
              width="20px"
              height="20px"
              onClick={() => handleUpdateStatus(record.userId)}
            ></img>
          </Tooltip>
          <Tooltip placement="bottom" title="Reassign">
            <img
              src={reassignicon}
              width="20px"
              height="20px"
              onClick={() => handleleadReassign(record.userId)}
            ></img>
          </Tooltip>

          <img
            height={20}
            src={record.isActive === 1 ? filledbookmark : outlinebookmark}
            className="mx-auto"
            onClick={() => handleActive(record.userId, record.isActive)}
          />
        </Space>
      ),
    },
  ];

  const datas =
    leadList.length > 0
      ? leadList.map((item,index) => ({
          index:index+1,
          userId: item.leadId,
          name: item.leadName,
          address: item.address,
          phoneNumber: item.mobile,
          isActive: item.isActive,
          leadstatusname: item.leadStatusName,
          assignedTo:item.assignedTo
        }))
      : [];
  return (
    <Layout className={classes.layout}>
      <Content className={classes.content}>
        <div className={classes.container}>
          <Title level={1} className={classes.title}>
            Leads Management
          </Title>
          <button className='btn btn-primary' onClick={handleAdd}>Add Admin</button>
          <img src={filtericon} width="20px" height="20px" onClick={() => setFilter(!filter)}></img>
          </div>
      <div className="px-4"> {filter && <LeadFilterModal listapical={handleLeads}/>}</div>
        <Table
          columns={columns}
          dataSource={datas}
          pagination={false}
          className={classes.table}
        />
        {selector.showDeleteModal && (
          <LeadsDeleteModal listapical={handleLeads} />
        )}
        {selector.showUpdateStatusModal && (
          <LeadUpdateStatusModal listapical={handleLeads} />
        )}
        {selector.reassignlead && 
        <Reassignmodal listapical={handleLeads} />}
        {selector.showIsActiveModal && (
          <IsActiveModal listapical={handleLeads} isActive={isActive} />
        )}
        <Pagination
          current={currentPage}
          pageSize={10}
          total={totalItems}
          onChange={handlePageChange}
          style={{ textAlign: "center" }}
        />
      </Content>
    </Layout>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLeadList,
  handleShowAddModal,
  handleShowDeleteModal,
  handleUserId,
  handleShowUpdateModal,
  handleUpdateStatusModal,
  handleReassign,
  handleDealerId,
  handleShowIsActiveModal,
  handleIsActive,
  handleSearch,
} from "../../../redux/reducers/AuthReducers";
import { Space, Table, Layout, Typography, Pagination, Tooltip, Popover } from "antd";
import { listLead } from "../../../axios/services";
import LeadsAddModal from "../Modal/LeadsModals/LeadAddModal";
import classes from "./Leads.module.css";
import LeadsDeleteModal from "../Modal/LeadsModals/LeadsDeleteModal";
import LeadsEditModal from "../Modal/LeadsModals/LeadsEditModal";
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
import addicon from '../../../assets/invite.png'
import reseticon from '../../../assets/reset.png'
import LeadFilterModal from "../Modal/LeadsModals/LeadFilterModal";
const { Content } = Layout;
const { Title } = Typography;
const text = <span>Filter</span>;
export default function Leads() {
  const selector = useSelector((state) => state.auth);
  const data = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const handleAdd = () => {
    dispatch(handleShowAddModal(true));
  };
  const handleReset = () => {
    dispatch(handleSearch({}))
    handleLeads();
  }

  useEffect(() => {
    if (data.token) {
      handleLeads();
    }
  }, [data.token, currentPage,selector.search]);

  const content = (
    <LeadFilterModal/>
  );

  const handleLeads = (page = 1, pageSize = 10) => {
    const formData = new FormData();
    formData.append("token", data.token);
    if(selector.search.name)
    {
      formData.append("name",selector.search.name);
    }
    if(selector.search.lead_status)
      {
        formData.append("lead_status",selector.search.lead_status);
      }
      if(selector.search.lead_id)
        {
          formData.append("lead_id",selector.search.lead_id);
        }
        if(selector.search.hot_lead)
          {
            formData.append("hot_lead",selector.search.hot_lead);
          }
          if(selector.search.phone)
            {
              formData.append("phone",selector.search.phone);
            }


    listLead(page, pageSize, formData)
      .then((response) => {
        console.log(response.data);
        dispatch(handleLeadList(response.data.data.items));
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
    dispatch(handleShowUpdateModal(true));
    dispatch(handleUserId(userId));
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
    dispatch(handleDealerId(userId));
    dispatch(handleIsActive(isActive));
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
    selector.leadList.length > 0
      ? selector.leadList.map((item,index) => ({
          index:index+1,
          userId: item.leadId,
          name: item.leadName,
          address: item.address,
          phoneNumber: item.mobile,
          isActive: item.isActive,
          leadstatusname: item.leadStatusName,
        }))
      : [];
  console.log(selector.leadList, "lead");
  return (
    <Layout className={classes.layout}>
      <Content className={classes.content}>
        <div className={classes.container}>
          <Title level={1} className={classes.title}>
            Leads Management
          </Title>
          <div className="row">
          <div className="col"> 
            <Tooltip placement="bottom" title="Add Employee" >
              <img src={addicon} width="20px" height="20px" onClick={handleAdd}></img>
            </Tooltip></div>
          <div className="col"> <Tooltip placement="bottom" title="Reset" >
              <img src={reseticon} width="20px" height="20px" onClick={handleReset}></img>
            </Tooltip></div>
          <div className="col"><Popover placement="bottomLeft" title={text} content={content}>
          <img src={filtericon} width="20px" height="20px"></img>
          </Popover></div> 
        </div>
        </div>
        <Table
          columns={columns}
          dataSource={datas}
          pagination={false}
          className={classes.table}
        />
        {selector.showAddModal && <LeadsAddModal listapical={handleLeads} />}
        {selector.showDeleteModal && (
          <LeadsDeleteModal listapical={handleLeads} />
        )}
        {selector.showUpdateModal && (
          <LeadsEditModal listapical={handleLeads} />
        )}
        {selector.showUpdateStatusModal && (
          <LeadUpdateStatusModal listapical={handleLeads} />
        )}
        {selector.reassignlead && <Reassignmodal listapical={handleLeads} />}
        {selector.showIsActiveModal && (
          <IsActiveModal listapical={handleLeads} />
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

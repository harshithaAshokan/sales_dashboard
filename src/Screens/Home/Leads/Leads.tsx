import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { handleUserId } from "../../../redux/reducers/AuthReducers";
import { Space, Table, Layout, Typography, Pagination, Tooltip, Row, Col } from "antd";
import { listLead } from "../../../axios/services";
import classes from "./Leads.module.css";
import LeadsDeleteModal from "../Modal/LeadsModals/LeadsDeleteModal";
import LeadUpdateStatusModal from "../Modal/LeadsModals/LeadsUpdateStatusModal";
import Reassignmodal from "../Modal/LeadsModals/Reassignmodal";
import filledbookmark from "../../../assets/bookmark (2).png";
import outlinebookmark from "../../../assets/bookmark (3).png";
import deleteicon from "../../../assets/delete.png";
import updateicon from "../../../assets/system-update.png";
import filtericon from "../../../assets/setting.png";
import reassignicon from "../../../assets/paper.png";
import updatestatusicon from "../../../assets/update.png";
import LeadFilterModal from "../Modal/LeadsModals/LeadFilterModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useToken } from "../../../utility/hooks";
import IsActiveModal from "../Modal/LeadsModals/IsActiveModal";
import { LeadDataProps } from "../../../type/leads";
import { leadFilterProps } from "../../../type/filter";
import { Helmet } from "react-helmet";

const { Content } = Layout;
const { Title } = Typography;

export default function Leads() {
  const token = useToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState(0);
  const [leadList, setLeadList] = useState<LeadDataProps[]>([]);
  const [isActive, setIsActive] = useState(-1);
  const [filter, setFilter] = useState(false);
  const [reassignLead, setReassignLead] = useState(false);
  const [updateStatusModal, setUpdateStatusModal] = useState(false);
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleAdd = () => {
    navigate("/leadsAdd", { state: { modalType: "add"} });
  };
  

  const filterValues = {
    phone: "",
      name: "",
      lead_status: "",
      lead_id: "",
      hot_lead: "",
  }

  useEffect(() => {
    if (token) {
      handleLeads(currentPage,10,filterValues);
    }
  }, [token,currentPage]);

  const handleClose = () => {
    setDeleteModal(false);
    setIsActiveModal(false);
    setReassignLead(false);
    setUpdateStatusModal(false);
  };

  const handleLeads = (page = 1, pageSize = 10, values:leadFilterProps) => {
    const formData = new FormData();
    formData.append("token", token);
    if (values?.name) {
      formData.append("name", values.name);
    }
    if (values?.lead_status) {
      formData.append("lead_status", values.lead_status);
    }
    if (values?.lead_id) {
      formData.append("lead_id", values.lead_id);
    }
    if (values?.hot_lead) {
      formData.append("hot_lead", values.hot_lead);
    }
    if (values?.phone) {
      formData.append("phone", values.phone);
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

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };

  const handleDelete = (userId:string) => {
    setDeleteModal(true);
    dispatch(handleUserId(userId));
  };

  const handleUpdate = (userId:string) => {
    dispatch(handleUserId(userId));
    navigate("/leadsAdd", { state: { modalType: "edit",currentPage:currentPage } });
  };

  const handleUpdateStatus = (userId:string) => {
    setUpdateStatusModal(true);
    dispatch(handleUserId(userId));
  };

  const handleleadReassign = (userId:string) => {
    setReassignLead(true);
    dispatch(handleUserId(userId));
  };

  const handleActive = (userId:string, isActive:number) => {
    setIsActiveModal(true);
    dispatch(handleUserId(userId));
    setIsActive(isActive);
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      render: (text:string, record:LeadDataProps, index:number) => index + 1 + (currentPage - 1) * 10,
    },
    {
      title: "Name",
      dataIndex: "leadName",
      key: "leadName",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Lead Status Name",
      dataIndex: "leadStatusName",
      key: "leadStatusName",
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
    },
    {
      title: "Action",
      key: "action",
      render: (_:string, record:LeadDataProps) => (
        <Space size="middle">
          <Tooltip placement="bottom" title="Update">
            <img
              src={updateicon}
              width="25px"
              height="25px"
              onClick={() => handleUpdate(record.leadId)}
            ></img>
          </Tooltip>
          <Tooltip placement="bottom" title="Delete">
            <img
              src={deleteicon}
              width="25px"
              height="25px"
              onClick={() => handleDelete(record.leadId)}
            ></img>
          </Tooltip>
          <Tooltip placement="bottom" title="Update_Status">
            <img
              src={updatestatusicon}
              width="25px"
              height="25px"
              onClick={() => handleUpdateStatus(record.leadId)}
            ></img>
          </Tooltip>
          <Tooltip placement="bottom" title="Reassign">
            <img
              src={reassignicon}
              width="20px"
              height="20px"
              onClick={() => handleleadReassign(record.leadId)}
            ></img>
          </Tooltip>

          <img
            height={20}
            src={record.isActive === 1 ? filledbookmark : outlinebookmark}
            className="mx-auto"
            onClick={() => handleActive(record.leadId, record.isActive)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
     <Helmet>
      <title>Leads</title>
    </Helmet>
   
    <Layout className="px-5">
    <Content className={`px-3 mt-4 ${classes.content}`}>
          <Row className="mt-4">
            <Col span={12}><Title level={2} className="fw-bold float-start ms-3">
            Lead Management
          </Title>
          </Col>
          <Col span={10}>
            <button className="btn button fs-6 float-end mt-2 ms-4" onClick={handleAdd}>
            Add Lead 
          </button>
          </Col>
          <Col span={2}>
          <img
            src={filtericon}
            width="25px"
            height="25px"
            className="float-start mt-3 ms-5"
            onClick={() => setFilter(!filter)}
          ></img>
          </Col>
        </Row>
        <div className="ms-5 p-3">
          {filter && <LeadFilterModal listapical={handleLeads} />}
        </div>
        <Table
          columns={columns}
          dataSource={leadList}
          pagination={false}
          rowClassName={(record) => (record.isActive === 1 ? 'active-row' : 'inactive-row')}
          className={`table-responsive mx-auto py-3 ${classes.table}`}
          scroll={{ x: "max-content" }}
        />
        {deleteModal && (
          <LeadsDeleteModal listapical={handleLeads} close={handleClose}  current={currentPage} />
        )}
        {updateStatusModal && (
          <LeadUpdateStatusModal listapical={handleLeads} close={handleClose}  current={currentPage}/>
        )}
        {reassignLead && (
          <Reassignmodal listapical={handleLeads} close={handleClose}  current={currentPage}/>
        )}
        {isActiveModal && (
          <IsActiveModal
            listapical={handleLeads}
            isActive={isActive}
            close={handleClose}
            current={currentPage}
          />
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
    </>
  );
}

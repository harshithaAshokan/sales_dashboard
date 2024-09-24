import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import {
  handleUserId,
  handleUserType,
} from "../../../../redux/reducers/AuthReducers";
import classes from "./Employee.module.css";
import { Space, Table, Layout, Typography, Pagination, Tooltip, Row, Col } from "antd";
import AddModal from "../../Modal/UserManagementModals/AddModal";
import DeleteModal from "../../Modal/UserManagementModals/DeleteModal";
import { listUsers } from "../../../../axios/services";
import FilterModal from "../../Modal/UserManagementModals/FilterModal";
import deleteicon from "../../../../assets/delete.png";
import updateicon from "../../../../assets/system-update.png";
import filtericon from "../../../../assets/setting.png"
import { useToken } from "../../../../utility/hooks";
import { userList } from "../../../../type/userManagement";
import { userFilterprops } from "../../../../type/filter";
import { Helmet } from "react-helmet";
const { Content } = Layout;
const { Title } = Typography;

export default function Dealer() {
  const dispatch = useDispatch();
  const token = useToken();
  const filterValue = {
    userName: "",
      email: "",
      phoneNumber: "",
      dealer_id: "",
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [employeeList, setEmployeeList] = useState<userList[]>([]);
  const [filter, setFilter] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleAdd = () => {
    setAddModal(true);
    dispatch(handleUserType(4));
  };

  const handleClose = () => {
    setAddModal(false);
    setDeleteModal(false);
    setEditModal(false);
  };

  const handleDelete = (userId:string) => {
    setDeleteModal(true);
    dispatch(handleUserId(userId));
  };

  const handleUpdate = (userId:string) => {
    setEditModal(true);
    dispatch(handleUserId(userId));
    dispatch(handleUserType(4));
  };

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };

  const handleEmployee = (page = 1, pageSize = 10, values:userFilterprops) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("type", "4");
    if (values?.userName) {
      formData.append("username", values.userName);
    }
    if (values?.phoneNumber) {
      formData.append("phoneNumber", values.phoneNumber);
    }
    if (values?.dealer_id) {
      formData.append("dealerId", values.dealer_id);
    }
    if (values?.email) {
      formData.append("email", values.email);
    }
    listUsers(page, pageSize, formData)
      .then((response) => {
        setEmployeeList(response.data.data.items);
        setTotalItems(response.data.data.total_count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (token) {
      handleEmployee(currentPage,10,filterValue);
      dispatch(handleUserType(4));
    }
  }, [token, currentPage]);

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      render: (text:string, record:userList, index:number) => index + 1 + (currentPage - 1) * 10,
    },
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_:string, record:userList) => (
        <Space size="middle">
          <Tooltip placement="bottom" title="Update">
            <img
              src={updateicon}
              width="25px"
              height="25px"
              onClick={() => handleUpdate(record.userId)}
            ></img>
          </Tooltip>
          <Tooltip placement="bottom" title="Delete">
            <img
              src={deleteicon}
              width="25px"
              height="25px"
              onClick={() => handleDelete(record.userId)}
            ></img>
          </Tooltip>
        </Space>
      ),
    },
  ];

  

  return (
    <>
    <Helmet>
      <title>Employee</title>
    </Helmet>
    
    <Layout className="px-5">
    <Content className={`px-3 mt-4 ${classes.content}`}>
          <Row className="mt-4">
            <Col span={12}><Title level={2} className="fw-bold float-start ms-3">
            Employee Management
          </Title>
          </Col>
          <Col span={10}>
            <button className="btn float-end mt-2 fs-6 button" onClick={handleAdd}>
            Add Employee
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
        <div className="ms-5">
          {filter && <FilterModal listapical={handleEmployee} />}
        </div>
        <Table
          columns={columns}
          dataSource={employeeList}
          pagination={false}
          className={classes.table}
        />
        {addModal && (
          <AddModal
            listapical={handleEmployee}
            addModal={addModal}
            close={handleClose}
            editModal={editModal}
            current={currentPage}
          />
        )}
        {deleteModal && (
          <DeleteModal listapical={handleEmployee} close={handleClose}  current={currentPage}/>
        )}
        {editModal && (
          <AddModal
            listapical={handleEmployee}
            editModal={editModal}
            close={handleClose}
            addModal={addModal}
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

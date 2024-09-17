import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterModal from "../../Modal/FilterModal";
import {
  handleUserId,
  handleUserType,
} from "../../../../redux/reducers/AuthReducers";
import AddModal from "../../Modal/AddModal";
import DeleteModal from "../../Modal/DeleteModal";
import { Space, Table, Layout, Typography, Pagination, Tooltip } from "antd";
import { listUsers } from "../../../../axios/services";
import classes from "./Admin.module.css";
import deleteicon from "../../../../assets/delete.png";
import filtericon from "../../../../assets/setting.png";
import { useToken } from "../../../../utility/hooks";
const { Content } = Layout;
const { Title } = Typography;
export default function Admin() {
  const selector = useSelector((state) => state.auth);
  const token = useToken();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [adminList, setAdminList] = useState([]);
  const [filter, setFilter] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleAdd = () => {
    setAddModal(true);
    dispatch(handleUserType(2));
  };

  const handleClose = () => {
    setAddModal(false);
    setDeleteModal(false);
  };

  useEffect(() => {
    if (token) {
      handleAdmin(currentPage);
      dispatch(handleUserType(2));
    }
  }, [token, selector.search, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAdmin = (page = 1, pageSize = 10, values) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("type", "2");

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
        setAdminList(response.data.data.items);
        setTotalItems(response.data.data.total_count);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(selector.message);
  };

  const handleDelete = (userId) => {
    setDeleteModal(true);
    dispatch(handleUserId(userId));
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      render: (text, record, index) => index + 1 + (currentPage - 1) * 10,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
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
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="bottom" title="Delete">
            <img
              src={deleteicon}
              width="20px"
              height="20px"
              onClick={() => handleDelete(record.userId)}
            ></img>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const datas =
    adminList.length > 0
      ? adminList?.map((item) => ({
          key: item?.userId, // Optionally, use the userId as the key for better React rendering
          username: item?.userName,
          name: item?.name,
          email: item?.email,
          phoneNumber: item?.phoneNumber,
          userId: item?.userId,
        }))
      : [];

  return (
    <Layout className={classes.layout}>
      <Content className={classes.content}>
        <div className={classes.container}>
          <Title level={1} className={classes.title}>
            Admin Management
          </Title>
          <button className="btn btn-primary" onClick={handleAdd}>
            Add Admin
          </button>
          <img
            src={filtericon}
            width="20px"
            height="20px"
            onClick={() => setFilter(!filter)}
          ></img>
        </div>
        <div className="px-4">
          {" "}
          {filter && <FilterModal listapical={handleAdmin} />}
        </div>
        <Table
          columns={columns}
          dataSource={datas}
          pagination={false}
          className={classes.table}
        />
        {addModal && (
          <AddModal
            listapical={handleAdmin}
            addModal={addModal}
            close={handleClose}
          />
        )}
        {deleteModal && (
          <DeleteModal listapical={handleAdmin} close={handleClose} />
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

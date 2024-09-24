import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FilterModal from "../../Modal/UserManagementModals/FilterModal";
import {
  handleUserId,
  handleUserType,
} from "../../../../redux/reducers/AuthReducers";
import AddModal from "../../Modal/UserManagementModals/AddModal";
import DeleteModal from "../../Modal/UserManagementModals/DeleteModal";
import {
  Space,
  Table,
  Layout,
  Typography,
  Pagination,
  Tooltip,
  Row,
  Col,
} from "antd";
import { listUsers } from "../../../../axios/services";
import classes from "./Admin.module.css";
import deleteicon from "../../../../assets/delete.png";
import filtericon from "../../../../assets/setting.png";
import { useToken } from "../../../../utility/hooks";
import { userList } from "../../../../type/userManagement";
import { userFilterprops } from "../../../../type/filter";
import { Helmet } from "react-helmet";
const { Content } = Layout;
const { Title } = Typography;

export default function Admin() {
  const token = useToken();
  const filterValue = {
    userName: "",
    email: "",
    phoneNumber: "",
    dealer_id: "",
  };
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [adminList, setAdminList] = useState<userList[]>([]);
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
      handleAdmin(currentPage, 10, filterValue);
      dispatch(handleUserType(2));
    }
  }, [token, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAdmin = (page = 1, pageSize = 10, values: userFilterprops) => {
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
  };

  const handleDelete = (userId: string) => {
    setDeleteModal(true);
    dispatch(handleUserId(userId));
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      render: (text: string, record: userList, index: number) =>
        index + 1 + (currentPage - 1) * 10,
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

      render: (_: string, record: userList) => (
        <div className={`mt-2 table-responsive mx-auto ${classes.table}`}>
          <Space size="middle">
            <Tooltip placement="bottom" title="Delete">
              <img
                src={deleteicon}
                width="25px"
                height="25px"
                onClick={() => handleDelete(record.userId)}
              />
            </Tooltip>
          </Space>
        </div>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <Layout className="px-5">
        <Content className={`px-3 mt-4 ${classes.content}`}>
          <Row className="mt-4">
            <Col span={12}>
              <Title level={2} className="fw-bold float-start ms-3">
                Admin Management
              </Title>
            </Col>
            <Col span={10}>
              <button
                className={`btn float-end fs-6 mt-2 ms-4 button float-end`}
                onClick={handleAdd}
              >
                Add Admin
              </button>
            </Col>
            <Col span={2}>
              <Tooltip title="filter">
                <img
                  src={filtericon}
                  width="25px"
                  height="25px"
                  className="float-start mt-3 ms-5"
                  onClick={() => setFilter(!filter)}
                />
              </Tooltip>
            </Col>
          </Row>
          <div className="ms-5">
            {filter && <FilterModal listapical={handleAdmin} />}
          </div>
          <Table
            columns={columns}
            dataSource={adminList}
            pagination={false}
            className={`mt-2 table-responsive mx-auto py-3 ${classes.table}`}
            scroll={{ x: "max-content" }}
          />
          {addModal && (
            <AddModal
              listapical={handleAdmin}
              addModal={addModal}
              close={handleClose}
              editModal={false}
              current={currentPage}
            />
          )}
          {deleteModal && (
            <DeleteModal
              listapical={handleAdmin}
              close={handleClose}
              current={currentPage}
            />
          )}

          <Pagination
            current={currentPage}
            pageSize={10}
            total={totalItems}
            onChange={handlePageChange}
            className="py-3"
          />
        </Content>
      </Layout>
    </>
  );
}

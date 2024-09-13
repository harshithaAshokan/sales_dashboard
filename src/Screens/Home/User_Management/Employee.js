import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleSearch,
  handleShowAddModal,
  handleShowDeleteModal,
  handleShowUpdateModal,
  handleUserId,
  handleUserType
} from "../../../redux/reducers/AuthReducers";
import classes from './Employee.module.css'
import { Space, Table, Tag, Button, Layout, Typography,Pagination,Popover, Tooltip } from "antd";
import AddModal from "../Modal//AddModal";
import DeleteModal from "../Modal/DeleteModal";
import UpdateModal from "../Modal/UpdateModal";
import { listUsers } from "../../../axios/services";
import FilterModal from "../Modal/FilterModal";
import deleteicon from '../../../assets/delete.png'
import updateicon from '../../../assets/system-update.png'
import filtericon from '../../../assets/setting.png'
import { useToken } from "../../../utility/hooks";
const { Content } = Layout;
const { Title } = Typography;
const text = <span>Filter</span>;

export default function Dealer() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);
  const token = useToken();
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalItems, setTotalItems]=useState(0);
  const [employeeList,setEmployeeList] = useState([]);
  const [filter,setFilter] = useState(false);
  const handleAdd = () => {
    dispatch(handleShowAddModal(true));
    dispatch(handleUserType(4));
  };

  const handleDelete = (userId) => {
    dispatch(handleShowDeleteModal(true));
    dispatch(handleUserId(userId));
  };


  const handleUpdate = (userId) => {
    dispatch(handleShowUpdateModal(true));
    dispatch(handleUserId(userId));
    dispatch(handleUserType(4));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); 
    };

  const handleEmployee = (page = 1, pageSize = 10,values) => {
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
    listUsers(page,pageSize,formData)
      .then((response) => {
        setEmployeeList(response.data.data.items);
        setTotalItems(response.data.data.total_count);
      })
      .catch((error) => {
        console.log(error);
      })
  };


  useEffect(() => {
    if (token) {
      handleEmployee(currentPage);
      dispatch(handleUserType(4));
    }
  }, [token,currentPage]);

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
      render: (text) => <a>{text}</a>,
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
          <Tooltip placement="bottom" title="Update" >
<img src={updateicon} width="20px" height="20px" onClick={() => handleUpdate(record.userId)}></img>
          </Tooltip>
          <Tooltip placement="bottom" title="Delete" >
 <img src={deleteicon} width="20px" height="20px" onClick={() => handleDelete(record.userId)}></img>
          </Tooltip>
          
         
        </Space>
      ),
    },
  ];

  const datas =
    employeeList.length > 0
      ? employeeList.map((item,index) => ({
        index:index+1,  
        userId: item.userId,
          username: item.userName,
          name: item.name,
          email: item.email,
          phoneNumber: item.phoneNumber,
        }))
      : [];

  return (
    <Layout className={classes.layout}>
    <Content className={classes.content}>
      <div className={classes.container}>
        <Title level={1} className={classes.title}>Employee Management</Title>
        <button className='btn btn-primary' onClick={handleAdd}>Add Admin</button>
          <img src={filtericon} width="20px" height="20px" onClick={() => setFilter(!filter)}></img>
      </div>
      <div className="px-4"> {filter && <FilterModal listapical={handleEmployee} /> }</div>
      <Table 
        columns={columns} 
        dataSource={datas} 
        pagination={false} 
        className={classes.table}
      />
      {selector.showAddModal && <AddModal listapical={handleEmployee} />}
      {selector.showDeleteModal && <DeleteModal listapical={handleEmployee} />}
      {selector.showUpdateModal && <UpdateModal listapical={handleEmployee} />}
      <Pagination
         current={currentPage}
         pageSize={10} 
         total={totalItems} 
         onChange={handlePageChange}
         style={{ textAlign: 'center' }} 
            />
    </Content>
  </Layout>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDealerList,
  handleSearch,
  handleShowAddModal,
  handleShowDeleteModal,
  handleShowUpdateModal,
  handleUserId,
  handleUserType
} from "../../../redux/reducers/AuthReducers";
import classes from './Dealer.module.css';
import { Space, Table, Layout, Typography, Popover,Pagination, Tooltip } from "antd";

import AddModal from "../Modal/AddModal";
import DeleteModal from "../Modal/DeleteModal";
import UpdateModal from "../Modal/UpdateModal";
import { listUsers } from "../../../axios/services";
import FilterModal from "../Modal/FilterModal";
import deleteicon from '../../../assets/delete.png'
import updateicon from '../../../assets/system-update.png'
import filtericon from '../../../assets/setting.png'
import addicon from '../../../assets/invite.png'
import reseticon from '../../../assets/reset.png'
const { Content } = Layout;
const { Title } = Typography;
const text = <span>Filter</span>;

export default function Dealer() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);
  const data = useSelector((state) => state.login);
  const [currentPage, setCurrentPage] = useState(1); 
    const [totalItems, setTotalItems] = useState(0);

  const handleAdd = () => {
    dispatch(handleShowAddModal(true));
    dispatch(handleUserType(3));
  };

  const handleDelete = (userId) => {
    dispatch(handleShowDeleteModal(true));
    dispatch(handleUserId(userId));
  };

  const handleReset = () => {
    dispatch(handleSearch({}))
    handleDealer();
  }

  const content = (
    <FilterModal/>
  );

  const handleUpdate = (userId) => {
    dispatch(handleShowUpdateModal(true));
    dispatch(handleUserId(userId));
    dispatch(handleUserType(3));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); 
    };

  const handleDealer = (page = 1, pageSize = 10) => {
    const formData = new FormData();
    formData.append("token", data.token);
    formData.append("type", "3");
    
    if (selector.search?.userName) {
      formData.append("username", selector.search.userName);
    }
    if (selector.search?.phoneNumber) {
      formData.append("phoneNumber", selector.search.phoneNumber);
    }
    if (selector.search?.dealer_id) {
      formData.append("dealerId", selector.search.dealer_id);
    }
    if (selector.search?.email) {
      formData.append("email", selector.search.email);
    }

    listUsers(page, pageSize, formData)
      .then((response) => {
        dispatch(handleDealerList(response.data.data.items));
        console.log("message" , selector.message);
        setTotalItems(response.data.data.total_count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (data.token) {
      handleDealer(currentPage);
      dispatch(handleUserType(3))
      
    }
  }, [data.token,currentPage,,selector.search]);

 

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
    selector.dealerList.length > 0
      ? selector.dealerList.map((item,index) => ({
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
          <Title level={1} className={classes.title}>
            Dealer Management
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
        {selector.showAddModal && <AddModal listapical={handleDealer} />}
        {selector.showDeleteModal && <DeleteModal listapical={handleDealer} />}
        {selector.showUpdateModal && <UpdateModal listapical={handleDealer} />}
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

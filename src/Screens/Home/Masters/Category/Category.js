import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from './Category.module.css';
import { Space, Table, Layout, Typography, Pagination, Tooltip } from "antd";
import deleteicon from '../../../../assets/delete.png'
import updateicon from '../../../../assets/system-update.png'
import filtericon from '../../../../assets/setting.png'
import { handleCategoryList,handleSearch, handleShowAddModal, handleShowDeleteModal, handleShowUpdateModal, handleUserId } from "../../../../redux/reducers/AuthReducers";
import { listCategory} from "../../../../axios/services";
import MastersAddModal from "../../Modal/MastersModal/MastersAddModal";
import MastersDeleteModal from "../../Modal/MastersModal/MastersDeleteModal";
import MastersFilter from "../../Modal/MastersModal/MastersFilter";
import { useToken } from "../../../../utility/hooks";
const { Content } = Layout;
const { Title } = Typography;


export default function Category() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);
  const token = useToken();
  const [currentPage, setCurrentPage] = useState(1); 
    const [totalItems, setTotalItems] = useState(0);
 const [filter,setFilter] = useState(false)
  const handleAdd = () => {
    dispatch(handleShowAddModal(true));
  };

  const handleDelete = (userId) => {
    dispatch(handleShowDeleteModal(true));
    dispatch(handleUserId(userId));
  };

  const handleReset = () => {
    dispatch(handleSearch({}))
    handleRequirementsData();
  }

  const content = (
   <MastersFilter/>
  );

  const handleUpdate = (userId) => {
    dispatch(handleShowUpdateModal(true));
    dispatch(handleUserId(userId));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); 
    };

  const handleRequirementsData = (page = 1, pageSize = 10,values) => {
    const formData = new FormData();
    formData.append("token", token);
    if (values?.name) {
      formData.append("name", values.name);
    }
    listCategory(page,pageSize,formData)
      .then((response) => {
        dispatch(handleCategoryList(response.data.data.items));
        console.log("message" , selector.message);
        setTotalItems(response.data.data.total_count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (token) {
      handleRequirementsData(currentPage);
    }
  }, [token,currentPage,selector.search]);

 

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      
    },
    {
      title: "ID",
      dataIndex: "customerCategoryId",
      key: "customerCategoryId",
    },
    {
      title: "Name",
      dataIndex: "customerCategoryName",
      key: "customerCategoryName",
    },
    
   
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="bottom" title="Update" >
<img src={updateicon} width="20px" height="20px" onClick={() => handleUpdate(record.customerCategoryId)}></img>
          </Tooltip>
          <Tooltip placement="bottom" title="Delete" >
<img src={deleteicon} width="20px" height="20px" onClick={() => handleDelete(record.customerCategoryId)}></img>
          </Tooltip>
          
          
        </Space>
      ),
    },
  ];
  return (
    <Layout className={classes.layout}>
      <Content className={classes.content}>
        <div className={classes.container}>
          <Title level={1} className={classes.title}>
            Category Management
          </Title>
           
              <button className='btn btn-primary' onClick={handleAdd}>Add Category</button>
          <img src={filtericon} width="20px" height="20px" onClick={() => setFilter(!filter)}></img>
            {
              filter && (<MastersFilter listapical={handleRequirementsData}/>)
            }
         
        </div>
        

        <Table 
          columns={columns} 
          dataSource={selector?.categoryList} 
          pagination={false}
          className={classes.table}
        />
        {selector.showAddModal && <MastersAddModal listapical={handleRequirementsData} value="category"/>}
        {selector.showDeleteModal && <MastersDeleteModal listapical={handleRequirementsData} value="customer_category"/>}
        {selector.showUpdateModal && <MastersAddModal listapical={handleRequirementsData} value="category"/>}
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Enquiry.module.css";
import { Space, Table, Layout, Typography, Pagination, Tooltip } from "antd";
import deleteicon from "../../../../assets/delete.png";
import updateicon from "../../../../assets/system-update.png";
import filtericon from "../../../../assets/setting.png";
import {
  handleEnquiryListData,
  handleUserId,
} from "../../../../redux/reducers/AuthReducers";
import { listEnquiry } from "../../../../axios/services";
import MastersAddModal from "../../Modal/MastersModal/MastersAddModal";
import MastersDeleteModal from "../../Modal/MastersModal/MastersDeleteModal";
import MastersFilter from "../../Modal/MastersModal/MastersFilter";
import { useToken } from "../../../../utility/hooks";
const { Content } = Layout;
const { Title } = Typography;

export default function Enquiry() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);
  const token = useToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filter, setFilter] = useState(false);
  const [update, setUpdate] = useState(false);
  const [add, setAdd] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleAdd = () => {
    setAdd(true);
  };

  const handleDelete = (userId) => {
    setDeleteModal(true);
    dispatch(handleUserId(userId));
  };

  const handleClose = () => {
    setDeleteModal(false);
    setAdd(false);
    setUpdate(false);
  };

  const handleUpdate = (userId) => {
    setUpdate(true);
    dispatch(handleUserId(userId));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRequirementsData = (page = 1, pageSize = 10, values) => {
    const formData = new FormData();
    formData.append("token", token);
    if (values?.name) {
      formData.append("name", values.name);
    }
    listEnquiry(page, pageSize, formData)
      .then((response) => {
        dispatch(handleEnquiryListData(response.data.data.items));
        console.log("message", selector.message);
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
  }, [token, currentPage, selector.search]);

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      render: (text, record, index) => index + 1 + (currentPage - 1) * 10,
    },

    {
      title: "Name",
      dataIndex: "enquireTypeName",
      key: "enquireTypeName",
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
              onClick={() => handleUpdate(record.enquireId)}
            ></img>
          </Tooltip>
          <Tooltip placement="bottom" title="Delete">
            <img
              src={deleteicon}
              width="20px"
              height="20px"
              onClick={() => handleDelete(record.enquireId)}
            ></img>
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
            Enquire Management
          </Title>

          <button onClick={handleAdd} className="btn btn-primary">
            Add Enquire
          </button>

          <img
            src={filtericon}
            width="20px"
            height="20px"
            onClick={() => setFilter(!filter)}
          ></img>
          {filter && <MastersFilter listapical={handleRequirementsData} />}
        </div>

        <Table
          columns={columns}
          dataSource={selector?.enquiryListData}
          pagination={false}
          className={classes.table}
        />
        {add && (
          <MastersAddModal
            listapical={handleRequirementsData}
            value="enquiry"
            close={handleClose}
            add={add}
          />
        )}
        {deleteModal && (
          <MastersDeleteModal
            listapical={handleRequirementsData}
            value="enquire_type"
            close={handleClose}
          />
        )}
        {update && (
          <MastersAddModal
            listapical={handleRequirementsData}
            value="Enquiry"
            update={update}
            close={handleClose}
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
  );
}

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./Enquiry.module.css";
import { Space, Table, Layout, Typography, Pagination, Tooltip, Row, Col } from "antd";
import deleteicon from "../../../../assets/delete.png";
import updateicon from "../../../../assets/system-update.png";
import filtericon from "../../../../assets/setting.png";
import { handleUserId } from "../../../../redux/reducers/AuthReducers";
import { listEnquiry } from "../../../../axios/services";
import MastersAddModal from "../../Modal/MastersModal/MastersAddModal";
import MastersDeleteModal from "../../Modal/MastersModal/MastersDeleteModal";
import MastersFilter from "../../Modal/MastersModal/MastersFilter";
import { useToken } from "../../../../utility/hooks";
import { masterFilterProps } from "../../../../type/filter";
import { enquiryListProps } from "../../../../type/masters";
import { Helmet } from "react-helmet";
const { Content } = Layout;
const { Title } = Typography;

export default function Enquiry() {
  const dispatch = useDispatch();
  const filterValue = {
    name: "",
  };
  const token = useToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filter, setFilter] = useState(false);
  const [update, setUpdate] = useState(false);
  const [add, setAdd] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [enquireList, setEnquireList] = useState<enquiryListProps[]>([]);
  const handleAdd = () => {
    setAdd(true);
  };

  const handleDelete = (userId: string) => {
    setDeleteModal(true);
    dispatch(handleUserId(userId));
  };

  const handleClose = () => {
    setDeleteModal(false);
    setAdd(false);
    setUpdate(false);
  };

  const handleUpdate = (userId: string) => {
    setUpdate(true);
    dispatch(handleUserId(userId));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEnquireData = (
    page = 1,
    pageSize = 10,
    values: masterFilterProps
  ) => {
    const formData = new FormData();
    formData.append("token", token);
    if (values?.name) {
      formData.append("name", values.name);
    }
    listEnquiry(page, pageSize, formData)
      .then((response) => {
        setEnquireList(response.data.data.items);
        setTotalItems(response.data.data.total_count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (token) {
      handleEnquireData(currentPage, 10, filterValue);
    }
  }, [token, currentPage]);

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      render: (text: string, record: enquiryListProps, index: number) =>
        index + 1 + (currentPage - 1) * 10,
    },

    {
      title: "Name",
      dataIndex: "enquireTypeName",
      key: "enquireTypeName",
    },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: enquiryListProps) => (
        <Space size="middle">
          <Tooltip placement="bottom" title="Update">
            <img
              src={updateicon}
              width="25px"
              height="25px"
              onClick={() => handleUpdate(record.enquireId)}
            ></img>
          </Tooltip>
          <Tooltip placement="bottom" title="Delete">
            <img
              src={deleteicon}
              width="25px"
              height="25px"
              onClick={() => handleDelete(record.enquireId)}
            ></img>
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <>
    <Helmet>
      <title>Enquiry</title>
    </Helmet>
    
    <Layout className="px-5">
    <Content className={`px-3 mt-4 ${classes.content}`}>
          <Row className="mt-4">
            <Col span={12}>
            <Title level={2} className="fw-bold float-start ms-3">
              Enquire Management
            </Title>
          </Col>
          <Col span={10}>
            <button
              className="btn button fs-6 float-end mt-2"
              onClick={handleAdd}
            >
              Add Enquire
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
          {filter && <MastersFilter listapical={handleEnquireData} />}
        </div>
        <Table
          columns={columns}
          dataSource={enquireList}
          pagination={false}
          className={`mt-2 table-responsive mx-auto py-3 ${classes.table}`}
          scroll={{ x: "max-content" }}
        />
        {add && (
          <MastersAddModal
            listapical={handleEnquireData}
            value="enquiry"
            close={handleClose}
            update={update}
            add={add}
            list={enquireList}
            current={currentPage}
          />
        )}
        {deleteModal && (
          <MastersDeleteModal
            listapical={handleEnquireData}
            value="enquire_type"
            close={handleClose}
            current={currentPage}
          />
        )}
        {update && (
          <MastersAddModal
            listapical={handleEnquireData}
            value="Enquiry"
            update={update}
            add={add}
            close={handleClose}
            list={enquireList}
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

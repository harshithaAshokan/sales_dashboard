import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./Requirements.module.css";
import { Space, Table, Layout, Typography, Pagination, Tooltip, Col, Row } from "antd";
import deleteicon from "../../../../assets/delete.png";
import updateicon from "../../../../assets/system-update.png";
import filtericon from "../../../../assets/setting.png";
import {
  handleUserId,
} from "../../../../redux/reducers/AuthReducers";
import { listRequirements } from "../../../../axios/services";
import MastersAddModal from "../../Modal/MastersModal/MastersAddModal";
import MastersDeleteModal from "../../Modal/MastersModal/MastersDeleteModal";
import MastersFilter from "../../Modal/MastersModal/MastersFilter";
import { useToken } from "../../../../utility/hooks";
import { requirementsListProps } from "../../../../type/masters";
import { masterFilterProps } from "../../../../type/filter";
import { Helmet } from "react-helmet";
const { Content } = Layout;
const { Title } = Typography;

export default function Requirements() {
  const dispatch = useDispatch();
  const filterValue = {
    name:""
  }
  const token = useToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filter, setFilter] = useState(false);
  const [update, setUpdate] = useState(false);
  const [add, setAdd] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [requirementsList,setRequirementsList] = useState<requirementsListProps[]>([])
  const handleAdd = () => {
    setAdd(true);
  };
  const handleClose = () => {
    setDeleteModal(false);
    setAdd(false);
    setUpdate(false);
  };

  const handleDelete = (userId:string) => {
    setDeleteModal(true);
    dispatch(handleUserId(userId));
  };
  const handleUpdate = (userId:string) => {
    setUpdate(true);
    dispatch(handleUserId(userId));
  };

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };

  const handleRequirementsData = (page = 1, pageSize = 10, values:masterFilterProps) => {
    const formData = new FormData();
    formData.append("token", token);
    if (values?.name) {
      formData.append("name", values.name);
    }
    listRequirements(page, pageSize, formData)
      .then((response) => {
        setRequirementsList(response.data.data.items);
       
        setTotalItems(response.data.data.total_count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (token) {
      handleRequirementsData(currentPage,10,filterValue);
    }
  }, [token, currentPage]);

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      render: (text:string, record:requirementsListProps, index:number) => index + 1 + (currentPage - 1) * 10,
    },
    {
      title: "Name",
      dataIndex: "RequirementsName",
      key: "requirementsName",
    },

    {
      title: "Action",
      key: "action",
      render: (_:string, record:requirementsListProps) => (
        <Space size="middle">
          <Tooltip placement="bottom" title="Update">
            <img
              src={updateicon}
              width="25px"
              height="25px"
              onClick={() => handleUpdate(record.RequirementsId)}
            ></img>
          </Tooltip>
          <Tooltip placement="bottom" title="Delete">
            <img
              src={deleteicon}
              width="25px"
              height="25px"
              onClick={() => handleDelete(record.RequirementsId)}
            ></img>
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <>
    <Helmet>
      <title>Requirements</title>
    </Helmet>
    
    <Layout className="px-5">
    <Content className={`px-3 mt-4 ${classes.content}`}>
          <Row className="mt-4">
            <Col span={12}><Title level={2} className="fw-bold float-start ms-3">
            Requirement Management
          </Title>
          </Col>
          <Col span={10}>
          <button className="btn float-end mt-2 fs-6 button" onClick={handleAdd}>
            Add Requirements
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
          {filter && <MastersFilter listapical={handleRequirementsData} />}
        </div>
        <Table
          columns={columns}
          dataSource={requirementsList}
          pagination={false}
          className={`mt-2 table-responsive mx-auto py-3 ${classes.table}`}
            scroll={{ x: "max-content" }}
        />
        {add && (
          <MastersAddModal
            listapical={handleRequirementsData}
            value="requirement"
            close={handleClose}
            add={add}
            update={update}
            list={requirementsList}
            current={currentPage}
          />
        )}
        {deleteModal && (
          <MastersDeleteModal
            listapical={handleRequirementsData}
            value="requirements"
            close={handleClose}
            current={currentPage}

          />
        )}
        {update && (
          <MastersAddModal
            listapical={handleRequirementsData}
            value="requirements"
            close={handleClose}
            update={update}
            add={add}
            list={requirementsList}
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

import React from "react";
import { Button, Dropdown, Menu, Modal, Space, Table } from "antd";
import { useState } from "react";
import vector from "../../Assets/Img/Vector.png"
function DeleteModal() {
  const [DeleteModal, setDeleteModal] = useState(false);
  const handleCloseClick = () => {
    setDeleteModal(false);
  };
  const showModal = () => {
    setDeleteModal(true);
  };
  const menu = (
    <Menu
      items={[

        {
          label: <p className="me-3 ps-3 fw-600  pt-2 mb-1 fs25 bid_menu">Modify</p>,
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: (
            <p
              onClick={showModal}
              className="me-4 fw-600 fs25 pt-2 mb-1 ps-4 bid_menu"
            >
              Delete
            </p>
          ),
          key: "3",


        },
      ]}
    />
  );
  return (
    <div className="delete_modal">
      <Dropdown overlay={menu} className="" trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <img src={vector} />

            {/* <DownOutlined /> */}
          </Space>
        </a>
      </Dropdown>

      <Modal
        visible={DeleteModal}
        onOk={handleCloseClick}
        onCancel={handleCloseClick}
        centered
        footer={
          <>
            <div className="row mb-3">
              <div className="col">
                <Button
                  key="submit"
                  className="w-75 tc_orange deleteModal-btn"
                  type="primary "
                  onClick={handleCloseClick}
                >
                  Delete
                </Button>
              </div>
              <div className="col">
                <Button
                  key="submit"
                  type=" w-75 btn-outlined deleteModal-btn  me-5 bg-light"
                  onClick={handleCloseClick}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </>
        }
      >

        <p className="fw-600 fs24 ms-auto text-center ">
          Are you sure you want <br />to delete this auction date?
        </p>
      </Modal>
    </div>
  );
}

export default DeleteModal;

import React from "react";
import { Button, Dropdown, Menu, Modal, Select, Space, DatePicker, Table } from "antd";
import moment from 'moment-timezone';
import { useState } from "react";
import vector from "../../Assets/Img/Vector.png"
import Account from '../../api/Account'

function DeleteModal(record) {
  const { Option } = Select;
  const dateFormat = 'YYYY/MM/DD';
  const [DeleteModal, setDeleteModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);

  const [initialValues, setInitialValues] = useState({
    _id: record?.each?._id,
    instrument: record?.each?.instruments,
    AuctionDate: record?.each?.auctionDate,
    settlementDate: record?.each?.settlementDate,
    cuttOfDate: record?.each?.cutoffDate,


  })

  const handleCloseClick = () => {
    setDeleteModal(false);
  };
  const handleModifyCloseClick = () => {
    setModifyModal(false);
  }
  const handleDeleteRecord = () => {

    const res = Account.DeleteAuctionDates(record?.each)
    res.then((value) => {
      console.log('delete record response is===========>>', value)
      alert(value?.data?.message)
      setDeleteModal(false);

    })
      .catch((err) => {
        console.log(err)
      })
  };
  function handleDrctChange(e, name) {
    console.log(e, name)
    setInitialValues({ ...initialValues, [name]: e })
  }
  const handleUpdateAuctionDateSubmit = () => {
    console.log("handel submit-----", initialValues)


    const res = Account.UpdateAuctionDates(initialValues)
    res.then((value) => {
      alert(value?.data?.message)
      setModifyModal(false)
      // setSaveData(value?.data?.data)

    })
      .catch((err) => {
        console.log(err)
      })

  };
  const showDeleteModal = () => {
    setDeleteModal(true);
  };

  const showModifyModal = () => {
    setModifyModal(true);
  };
  const menu = (
    <Menu
      items={[

        {
          label: <p onClick={showModifyModal} className="me-3 ps-3 fw-600  pt-2 mb-1 fs25 bid_menu">Modify</p>,
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: (
            <p
              onClick={showDeleteModal}
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
                  onClick={handleDeleteRecord}
                >
                  Delete
                </Button>
              </div>
              <div className="col">
                <Button
                  key="submit"
                  type=" w-75 btn-outlined deleteModal-btn bg-light me-5"
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

      <Modal
        title="Add Auction Dates"
        visible={modifyModal}
        onCancel={handleModifyCloseClick}
        centered
        footer={
          <>
            <div className="row mb-3">
              <div className="col d-flex">
                <Button
                  key="submit"
                  className="w-30 auction-btn  ms-2"
                  type="primary "
                  onClick={handleUpdateAuctionDateSubmit}
                >
                  Save Auction Date
                </Button>
              </div>

            </div>
          </>
        }
      >
        <label htmlFor="BirthCity" className="col-form-label fw-500">
          Instruement
        </label>
        <Select
          className='w-100'
          defaultValue={record?.each?.instruments}
          name="instrument"
          placeholder="Select Instrument"


          onChange={(e) => handleDrctChange(e, "instrument")}
        >

          <Option key="MTB">MTB</Option>
          <Option key="Ijara Sukuk">Ijara Sukuk</Option>
          <Option key="PIB(Fixed-Rate)">PIB(Fixed-Rate)</Option>
          <Option key="PIB(Floating-Rate) Semi Annual">PIB(Floating-Rate) Semi Annual </Option>
          <Option key="PIB(Floating-Rate) Quarterly">PIB(Floating-Rate) Quarterly</Option>


        </Select>
        <div className=" d-flex flex-column mb-3 modalDate ">
          <label htmlFor="BirthDay" className="col-form-label fw-500 me-4">
            Auction Date
          </label>
          <div className="mt-auto ">
            <DatePicker
              name="AuctionDate"
              // defaultValue={record?.each?.auctionDate}
              defaultValue={moment(record?.each?.auctionDate, dateFormat)}
              onChange={(date, dateString) => {
                handleDrctChange(dateString, "AuctionDate");
              }}
              format="YYYY-MM-DD"
              // format="DD-MM-YYYY"
              className='w-100'
            // onChange={onChange} 
            />
          </div>
        </div>

        <div className=" d-flex flex-column mb-3 modalDate">
          <label htmlFor="BirthDay" className="col-form-label fw-500 me-4">
            Settlement Date
          </label>
          <div className="mt-auto ">
            <DatePicker
              name="settlementDate"
              // defaultValue={record?.each?.settlementDate}
              defaultValue={moment(record?.each?.settlementDate, dateFormat)}
              onChange={(date, dateString) => {
                handleDrctChange(dateString, "settlementDate");
              }}
              format="YYYY-MM-DD"
              className='w-100'
            // onChange={onChange} 
            />
          </div>
        </div>
        <div className=" d-flex flex-column mb-3 modalDate ">
          <label htmlFor="BirthDay" className="col-form-label fw-500 me-4">
            Cutoff Date & Time
          </label>
          <div className="mt-auto ">
            <DatePicker showTime
              name="cuttOfDate"
              // defaultValue={record?.each?.cutoffDate}
              defaultValue={moment(record?.each?.cutoffDate, dateFormat)}
              onChange={(date, dateString) => {
                handleDrctChange(dateString, "cuttOfDate");
              }}
              // format="DD-MM-YYYY"
              className='w-100'
            // onChange={onChange} 
            />
          </div>
        </div>



      </Modal>
    </div>
  );
}

export default DeleteModal;

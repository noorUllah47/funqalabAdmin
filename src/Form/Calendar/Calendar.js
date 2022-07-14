import { DatePicker, Modal, Select, Button } from 'antd'
import React, { useState } from 'react'
import Navbar from '../../Atoms/Navbar'
import PreviousAuctionTable from './PreviousAuctionTable'
import CTable from './Table'

function AdminCalendar() {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  const { Option } = Select;
  const [initialValues, setInitialValues] = useState({
    instrument: "",
    AuctionDate: "",
    settlementDate: "",
    cuttOfDate: "",


  })

  function handleDrctChange(e, name) {
    console.log(e, name)
    setInitialValues({ ...initialValues, [name]: e })
  }
  console.log("stateeeeeeeeeeeee------", initialValues)
  return (
    <div>

      {/* <Navbar /> */}
      <div className='mainCalendarDiv'>
        <div className='d-flex justify-content-between mb-5'>
          <h2 className='fw-700'>New Auction Calendar</h2>
          <button className='btn btn-primary auction-btn' onClick={showModal}> Add Auction Dates</button>
        </div>
        <div>
          <CTable
          />
        </div>
        <div className='d-flex justify-content-between mt-5 mb-5   '>
          <h2 className='fw-700' >Previous Auction Calendar</h2>
          <DatePicker
            picker="month" />
        </div>
        <div>
          <PreviousAuctionTable />

        </div>
      </div>
      <Modal
        title="Add Auction Dates"
        visible={visible}
        onCancel={handleCancel}
        centered
        footer={
          <>
            <div className="row mb-3">
              <div className="col d-flex">
                <Button
                  key="submit"
                  className="w-30 auction-btn  ms-2"
                  type="primary "
                  onClick={handleCancel}
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
              onChange={(date, dateString) => {
                handleDrctChange(dateString, "AuctionDate");
              }}
              format="DD-MM-YYYY"
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

              onChange={(date, dateString) => {
                handleDrctChange(dateString, "settlementDate");
              }}
              format="DD-MM-YYYY"
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
  )
}

export default AdminCalendar
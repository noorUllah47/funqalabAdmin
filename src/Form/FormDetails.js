import React, { useEffect, useState } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import Navbar from "../Atoms/Navbar";
import GetData from "../api/GetData";
import Table from './EventLogs/Table'
import fileDownload from 'js-file-download'
import { message, Select, Modal, Button } from 'antd';

import axios from 'axios'
import CorrectionTable from "./EventLogs/CorrectionTable";
import Account from '../api/Account'
import { Buffer } from 'buffer';
import FilePreview from "../Atom/FilePreview";
import UIDDocument from "../Atom/UIDDocument";
import ZipPreview from "../Atom/ZipPreview";
import Forms from "./Forms";
const { Option, OptGroup, } = Select;
export default function FormDetails(props) {
  let location = useLocation()
  const { id } = useParams();

  let data = location.state?.data

  const OfficialStatus = [
    { value: "01", label: "Submitted" },
    { value: "02", label: "Correction Required" },
    { value: "03", label: "Approved" },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [statusLoading, setstatusLoading] = useState(false);
  const [Description, setDescription] = useState("");
  // const [FileArray, setFileArray] = useState();

  // useEffect(() => {
  //   setFileArray([location?.state?.data?.cnicfront, location?.state?.data?.cnicback, location?.state?.data?.IncomeProof,
  //   location?.state?.data?.MailingAddProof, location?.state?.data?.kinCNIC_front, location?.state?.data?.JointCNIC_back,
  //   location?.state?.data?.JointIncomeProof, location?.state?.data?.JointMailingAddProof, ...location?.state?.data?.other?.other])


  // }, [])



  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (Description !== "") {
      setstatusLoading(true)
      SendStatus("Correction Required")
    }
    else {
      message.error('Details Needed')
    }

  };

  const handleCancel = () => {
    setDescription("")
    setIsModalVisible(false);
  };


  const handleStatusChange = (e) => {
    // e.preventDefault

    // console.log('value are respose ------------------------------->>>', e?.children)
    if (e.children == "Correction Required") {
      showModal()
    }
    else {
      SendStatus(e?.children)
    }

  }
  const SendStatus = (e) => {
    // e.preventDefault

    // console.log('value are respose ------------------------------->>>', e?.children)

    const response = Account.ChangeOfficialNclStatus(location.state.data?.uid, e, Description);
    response.then((value) => {

      message.success(value?.data?.message)
      setIsModalVisible(false);
      setstatusLoading(false);
      setDescription("")
      // console.log('value are respose ------------------------------->>>', value)
    })


  }


  const ZipDownload = (uid, img, imageState) => {

    const res = Account.GetZipDocuemnt(uid, img, imageState)
    res.then(value => {
      console.log({ value })

    })
  }


  const imagsFile = async (img, imageState) => {

    if (img.includes('.pdf')) {

      const res = Account.GetImageDocuemnt(img, imageState)
      res.then(value => {
        console.log({ value })

      })
    }
    else {
      let r = await axios.post(`https://ips-multinet-staging.finqalab.com/v1/doc/get`, {
        filename: img
      }, { responseType: "arraybuffer" });

      let d = Buffer.from(r.data).toString('base64');

      let type = img.includes('.pdf') ? 'data:application/pdf;base64' : 'data:image/png;base64'
      imageState(`${type}, ${d}`)
    }


  }




  const downloadFile = (file, name, type) => {
    // console.log({ file })
    const hide = message.loading('Action in progress..', 0); // Dismiss manually and asynchronously

    setTimeout(hide, 2500);
    const link = document.createElement('a');
    link.href = file;
    link.setAttribute('download', `${name}.${type}`); //or any other extension
    document.body.appendChild(link);
    link.click();
  }


  return (
    <>
      {/* <Navbar /> */}
      <div className=" infoformpage width_full pt-5 ">
        <div className=" mx-auto mb-4 py-0 infoform bg-white ">
          <div className="container p-3 minw100">
            <div className="d-inline-flex w-100">
              <div>
                <p className='fs20 fw-800 t-black-2'>Form Details</p>
              </div>
              <div className=" ms-auto">
                <NavLink to="/Form">
                  {/* <button className="infoformbtn">Close</button> */}

                  <Button type="primary" className="tag-primary btn br-7" >
                    Close
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>


          <div className="my-3 text-break ">

            <div className="my-3 container p-3 text-break minw100">
              <div className="d-flex justify-content-between">
                <p className=" fs20 fw-600 text-black px-0">Personal Details</p>

              </div>

              <div className="row">

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.AccountType}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">Account Type</p>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.firstName}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">First Name</p>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.lastName}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">Last Name</p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.RelativeName}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">Father's or Husband's Full Name</p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.email}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">Email Address</p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.phoneNumber}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    Phone Number
                  </p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.BirthDay}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">Date of Birth (e.g. 28-02-1995)</p>
                </div>


                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">

                    {data?.BirthCountry}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">Country of Birth</p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.BirthCity}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    City of Birth
                  </p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.Nationality}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">Nationality</p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.IDType}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">Choose Identity Document
                  </p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.CNIC}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">CNIC Number</p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data.Resident}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">Resident Status in Pakistan</p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.IssueDate}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">Issue Date (e.g. 28-02-1995)</p>
                </div>
                {data?.lifeTimeExpiry == 1 ? (
                  <div className="col-lg-3 col-md-6 col-12">
                    <p className=" fw-400 fs16 t-black-2 mb-1">
                      Life Time Expiry
                    </p>
                    <p className="fw-400 fs14 t-grey-a">Expiry Date </p>
                  </div>
                ) : (
                  <div className="col-lg-3 col-md-6 col-12">
                    <p className=" fw-400 fs16 t-black-2 mb-1">
                      {data?.ExpiryDate}
                    </p>
                    <p className="fw-400 fs14 t-grey-a">
                      Expiry Date </p>
                  </div>
                )}

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.Gender}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    Gender
                  </p>
                </div>

              </div>
              <div className="row mt-3 infoformpagebrdrbtm">

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.Street}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    Street Address
                  </p>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.Country}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    Country
                  </p>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.Provinces}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    Province/State
                  </p>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.City}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    City
                  </p>
                </div>

              </div>

              {!data?.MailingAddress &&
                <div className="row mt-3 infoformpagebrdrbtm">

                  <p className=" fs16 fw-600 text-black px-3">Mailing Address</p>
                  <div className="col-lg-3 col-md-6 col-12">
                    <p className=" fw-400 fs16 t-black-2 mb-1">
                      {data?.MailStreet}
                    </p>
                    <p className="fw-400 fs14 t-grey-a">
                      Street Address
                    </p>
                  </div>

                  <div className="col-lg-3 col-md-6 col-12">
                    <p className=" fw-400 fs16 t-black-2 mb-1">
                      {data?.MailCountry}
                    </p>
                    <p className="fw-400 fs14 t-grey-a">
                      Country
                    </p>
                  </div>

                  <div className="col-lg-3 col-md-6 col-12">
                    <p className=" fw-400 fs16 t-black-2 mb-1">
                      {data?.MailProvinces}
                    </p>
                    <p className="fw-400 fs14 t-grey-a">
                      Province/State
                    </p>
                  </div>

                  <div className="col-lg-3 col-md-6 col-12">
                    <p className=" fw-400 fs16 t-black-2 mb-1">
                      {data?.MailCity}
                    </p>
                    <p className="fw-400 fs14 t-grey-a">
                      City
                    </p>
                  </div>

                </div>}
            </div>

            <div className="my-3 container p-3 text-break infoformpagebrdrbtm minw100">
              <p className=" fs20 fw-600 text-black px-0">Financial Details</p>
              <div className="row">
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">{data?.BussType}</p>
                  <p className="fw-400 fs14 t-grey-a">Profession</p>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">{data?.IncomeSource}</p>
                  <p className="fw-400 fs14 t-grey-a">Source of Income</p>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data.CompName}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">Business / Employer Name</p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.AnnualIncome}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">Gross Annual Income (PKR)</p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.OtherIncome}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">Other Income</p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data.TaxFiler}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    Tax Filer
                  </p>
                </div>

                {data?.TaxFiler == 'YES' &&
                  <div className="col-lg-3 col-md-6 col-12">
                    <p className=" fw-400 fs16 t-black-2 mb-1">
                      {data.NTN}
                    </p>
                    <p className="fw-400 fs14 t-grey-a">
                      National Tax Number
                    </p>
                  </div>}

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data.PoliticalExpose}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    Political Exposed Person
                  </p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.BankTitle}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    Bank Title
                  </p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.BankNum}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    Bank Account Number
                  </p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.BankAddress}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    Bank Branch Address
                  </p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.USCitizen}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    Are You an American Citizen
                  </p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.GCard}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    US Green Card Holder
                  </p>
                </div>


                {data?.USCitizen === 'NO' && data?.GCard === 'NO' ? null : <>

                  <div className="col-lg-3 col-md-6 col-12">
                    <p className=" fw-400 fs16 t-black-2 mb-1">
                      {data?.USTIN}
                    </p>
                    <p className="fw-400 fs14 t-grey-a">
                      US Tax Identification Number
                    </p>
                  </div>
                  {data?.GCard !== 'NO' &&
                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.USGREENCARD}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">
                        US Green Card Number
                      </p>
                    </div>
                  }
                  <div className="col-lg-3 col-md-6 col-12">
                    <p className=" fw-400 fs16 t-black-2 mb-1">
                      {data?.frgnNumber}
                    </p>
                    <p className="fw-400 fs14 t-grey-a">
                      Overseas Contact Number
                    </p>
                  </div>
                  <div className="col-lg-3 col-md-6 col-12">
                    <p className=" fw-400 fs16 t-black-2 mb-1">
                      {data?.OverseasAddress}
                    </p>
                    <p className="fw-400 fs14 t-grey-a">Overseas Address</p>
                  </div>
                  <div className="col-lg-3 col-md-6 col-12">
                    <p className=" fw-400 fs16 t-black-2 mb-1">
                      {data?.PWRAttorney}
                    </p>
                    <p className="fw-400 fs14 t-grey-a">
                      Have you Given Any Power of Attorney
                    </p>
                  </div>
                  {data?.PWRAttorney === "YES" &&
                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.AttorneyAddress}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">
                        Attorney Address
                      </p>
                    </div>
                  }
                  <div className="col-lg-3 col-md-6 col-12">
                    <p className=" fw-400 fs16 t-black-2 mb-1">
                      {data?.renouncedCitizenchip}
                    </p>
                    <p className="fw-400 fs14 t-grey-a">
                      Have you Renounced Foreign Citizenship
                    </p>
                  </div>
                  <div className="col-lg-3 col-md-6 col-12">
                    <p className=" fw-400 fs16 t-black-2 mb-1">
                      {data?.taxformSubmit}
                    </p>
                    <p className="fw-400 fs14 t-grey-a">
                      W8BEN / W9USA Tax forms submitted
                    </p>
                  </div>
                  {data?.taxformSubmit === 'YES' && <div className="col-lg-3 col-md-6 col-12">
                    <p className=" fw-400 fs16 t-black-2 mb-1">
                      {data?.formSubmitDate}
                    </p>
                    <p className="fw-400 fs14 t-grey-a">
                      Date of Submittion
                    </p>
                  </div>}
                </>
                }
              </div>

            </div>

            {/* Joint Account */}

            {data?.AccountType == 'Joint' &&
              <>
                <div className="my-3 container p-3 text-break minw100">
                  <div className="d-flex justify-content-between">
                    <p className=" fs20 fw-600 text-black px-0">Joint Account</p>

                  </div>

                  <div className="row">

                    {console.log('joint data uis===========', data)}

                    {/* <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointAccountType}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">Account Type</p>
                    </div> */}
                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointAccountTitle}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">First Name</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointLastName}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">Last Name</p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointRelativeName}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">Father's or Husband's Full Name</p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.Jointemail}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">Email Address</p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointPhoneNumber}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">
                        Phone Number
                      </p>
                    </div>
                    {/* <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointNumber}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">
                        Landline Number
                      </p>
                    </div> */}

                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointBirthDay}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">Date of Birth (e.g. 28-02-1995)</p>
                    </div>


                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">

                        {data?.JointBirthCountry}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">Country of Birth</p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointBirthCity}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">
                        City of Birth
                      </p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointNationality}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">Nationality</p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointIDType}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">Choose Identity Document
                      </p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointCNIC}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">CNIC Number</p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointResident}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">Resident Status in Pakistan</p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointIssueDate}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">Issue Date (e.g. 28-02-1995)</p>
                    </div>
                    {data?.JointlifeTimeExpiry == 1 ? (
                      <div className="col-lg-3 col-md-6 col-12">
                        <p className=" fw-400 fs16 t-black-2 mb-1">
                          Life Time Expiry
                        </p>
                        <p className="fw-400 fs14 t-grey-a">Expiry Date </p>
                      </div>
                    ) : (
                      <div className="col-lg-2 col-md-6 col-12">
                        <p className=" fw-400 fs16 t-black-2 mb-1">
                          {data?.JointExpiryDate}
                        </p>
                        <p className="fw-400 fs14 t-grey-a">
                          Expiry Date </p>
                      </div>
                    )}

                    <div className="col-lg-2 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointGender}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">
                        Gender
                      </p>
                    </div>

                  </div>
                  <div className="row mt-3 ">

                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.Jointstreet}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">
                        Street Address
                      </p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.Jointcountry}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">
                        Country
                      </p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointProvinces}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">
                        Province/State
                      </p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointCity}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">
                        City
                      </p>
                    </div>

                  </div>

                  {parseInt(data?.JointMailingAddress) !== 1 &&
                    <div className="row mt-3 ">
                      <p className=" fs16 fw-600 text-black px-3">Mailing Address</p>
                      <div className="col-lg-3 col-md-6 col-12">
                        <p className=" fw-400 fs16 t-black-2 mb-1">
                          {data?.JointMailstreet}
                        </p>
                        <p className="fw-400 fs14 t-grey-a">
                          Street Address
                        </p>
                      </div>

                      <div className="col-lg-3 col-md-6 col-12">
                        <p className=" fw-400 fs16 t-black-2 mb-1">
                          {data?.JointmailCountry}
                        </p>
                        <p className="fw-400 fs14 t-grey-a">
                          Country
                        </p>
                      </div>

                      <div className="col-lg-3 col-md-6 col-12">
                        <p className=" fw-400 fs16 t-black-2 mb-1">
                          {data?.JointMailProvinces}
                        </p>
                        <p className="fw-400 fs14 t-grey-a">
                          Province/State
                        </p>
                      </div>

                      <div className="col-lg-3 col-md-6 col-12">
                        <p className=" fw-400 fs16 t-black-2 mb-1">
                          {data?.JointMailCity}
                        </p>
                        <p className="fw-400 fs14 t-grey-a">
                          City
                        </p>
                      </div>

                    </div>}
                  <div className="row">
                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">{data?.JointProfession}</p>
                      <p className="fw-400 fs14 t-grey-a">Profession</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">{data?.JointIncomeSource}</p>
                      <p className="fw-400 fs14 t-grey-a">Source of Income</p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointCompName}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">Business / Employer Name</p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointAnnualIncome}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">Gross Annual Income (PKR)</p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointOtherIncome}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">Other Income</p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointTaxFiler}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">
                        Tax Filer
                      </p>
                    </div>

                    {data?.JointTaxFiler == 'YES' &&
                      <div className="col-lg-3 col-md-6 col-12">
                        <p className=" fw-400 fs16 t-black-2 mb-1">
                          {data?.JointNTN}
                        </p>
                        <p className="fw-400 fs14 t-grey-a">
                          National Tax Number
                        </p>
                      </div>}

                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointPoliticalExpose}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">
                        Political Exposed Person
                      </p>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointUSCitizen}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">
                        Are You an American Citizen
                      </p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                      <p className=" fw-400 fs16 t-black-2 mb-1">
                        {data?.JointGCard}
                      </p>
                      <p className="fw-400 fs14 t-grey-a">
                        US Green Card Holder
                      </p>
                    </div>


                    {data?.JointUSCitizen === 'NO' && data?.JointGCard === 'NO' ? null : <>

                      <div className="col-lg-3 col-md-6 col-12">
                        <p className=" fw-400 fs16 t-black-2 mb-1">
                          {data?.JointUSTIN}
                        </p>
                        <p className="fw-400 fs14 t-grey-a">
                          US Tax Identification Number
                        </p>
                      </div>
                      {data?.JointGCard !== 'NO' &&
                        <div className="col-lg-3 col-md-6 col-12">
                          <p className=" fw-400 fs16 t-black-2 mb-1">
                            {data?.JointUSGREENCARD}
                          </p>
                          <p className="fw-400 fs14 t-grey-a">
                            US Green Card Number
                          </p>
                        </div>
                      }
                      <div className="col-lg-3 col-md-6 col-12">
                        <p className=" fw-400 fs16 t-black-2 mb-1">
                          {data?.JointfrgnNumber}
                        </p>
                        <p className="fw-400 fs14 t-grey-a">
                          Overseas Contact Number
                        </p>
                      </div>
                      <div className="col-lg-3 col-md-6 col-12">
                        <p className=" fw-400 fs16 t-black-2 mb-1">
                          {data?.JointOverseasAddress}
                        </p>
                        <p className="fw-400 fs14 t-grey-a">Overseas Address</p>
                      </div>
                      <div className="col-lg-3 col-md-6 col-12">
                        <p className=" fw-400 fs16 t-black-2 mb-1">
                          {data?.JointPWRAttorney}
                        </p>
                        <p className="fw-400 fs14 t-grey-a">
                          Have you Given Any Power of Attorney
                        </p>
                      </div>
                      {data?.JointPWRAttorney === "YES" &&
                        <div className="col-lg-3 col-md-6 col-12">
                          <p className=" fw-400 fs16 t-black-2 mb-1">
                            {data?.JointAttorneyAddress}
                          </p>
                          <p className="fw-400 fs14 t-grey-a">
                            Attorney Address
                          </p>
                        </div>
                      }
                      <div className="col-lg-3 col-md-6 col-12">
                        <p className=" fw-400 fs16 t-black-2 mb-1">
                          {data?.JointRenouncedCitizenchip}
                        </p>
                        <p className="fw-400 fs14 t-grey-a">
                          Have you Renounced Foreign Citizenship
                        </p>
                      </div>
                      <div className="col-lg-3 col-md-6 col-12">
                        <p className=" fw-400 fs16 t-black-2 mb-1">
                          {data?.JointTaxformSubmit}
                        </p>
                        <p className="fw-400 fs14 t-grey-a">
                          W8BEN / W9USA Tax forms submitted
                        </p>
                      </div>
                      {data?.JointTaxformSubmit === 'YES' && <div className="col-lg-3 col-md-6 col-12">
                        <p className=" fw-400 fs16 t-black-2 mb-1">
                          {data?.JointformSubmitDate}
                        </p>
                        <p className="fw-400 fs14 t-grey-a">
                          Date of Submittion
                        </p>
                      </div>}
                    </>
                    }
                  </div>

                </div>

              </>}


            {/* Document */}
            <div className="my-3 container p-3 text-break infoformpagebrdrbtm minw100">
              <div className="d-flex">

                <p className=" fs20 fw-600 text-black px-0">Documents</p>


                <ZipPreview
                  uid={location?.state?.data?.uid}
                  data={location?.state?.data}
                  name="Zip File"
                  imagsFile={ZipDownload}
                  downloadFile={downloadFile}
                />
              </div>

              <div className="row">
                <FilePreview
                  file={location?.state?.data?.cnicfront}
                  name="CNIC Front"
                  imagsFile={imagsFile}
                  downloadFile={downloadFile}
                />

                <FilePreview
                  file={location?.state?.data?.cnicback}
                  name="CNIC Back"
                  imagsFile={imagsFile}
                  downloadFile={downloadFile}
                />

                <FilePreview
                  file={location?.state?.data?.IncomeProof}
                  name="Income Proof"
                  imagsFile={imagsFile}
                  downloadFile={downloadFile}
                />

                <FilePreview
                  file={location?.state?.data?.MailingAddProof}
                  name="Proof of Mailing Address"
                  imagsFile={imagsFile}
                  downloadFile={downloadFile}
                />

                <FilePreview
                  file={location?.state?.data?.kinCNIC_front}
                  name="KIN CNIC Front"
                  imagsFile={imagsFile}
                  downloadFile={downloadFile}
                />

                <FilePreview
                  file={location?.state?.data?.kinCNIC_back}
                  name="Kin CNIC Back"
                  imagsFile={imagsFile}
                  downloadFile={downloadFile}
                />

                {/* <FilePreview
                  file={location?.state?.data?.KinIncomeProof}
                  name="Kin Income Proof"
                  imagsFile={imagsFile}
                  downloadFile={downloadFile}
                />

                <FilePreview
                  file={location?.state?.data?.KinMailingAddProof}
                  name="Proof of Kin Mailing Address"
                  imagsFile={imagsFile}
                  downloadFile={downloadFile}
                /> */}

                <FilePreview
                  file={location?.state?.data?.JointCNIC_front}
                  name="Joint CNIC Front"
                  imagsFile={imagsFile}
                  downloadFile={downloadFile}
                />

                <FilePreview
                  file={location?.state?.data?.JointCNIC_back}
                  name="Joint CNIC Back"
                  imagsFile={imagsFile}
                  downloadFile={downloadFile}
                />

                <FilePreview
                  file={location?.state?.data?.JointIncomeProof}
                  name="Joint Income Proof"
                  imagsFile={imagsFile}
                  downloadFile={downloadFile}
                />

                <FilePreview
                  file={location?.state?.data?.JointMailingAddProof}
                  name="Proof of Joint Mailing Address"
                  imagsFile={imagsFile}
                  downloadFile={downloadFile}
                />

                {location?.state?.data?.other?.other.map((x, index) => (

                  <FilePreview
                    file={x}
                    name={`${index + 1} Additional Document`}
                    imagsFile={imagsFile}
                    downloadFile={downloadFile}
                  />
                ))}


                <FilePreview
                  file={`${location?.state?.data?.uid}.pdf`}
                  name="IPSForm"
                  imagsFile={imagsFile}
                  downloadFile={downloadFile}
                />

                <FilePreview
                  file={`signature-${location?.state?.data?.uid}.pdf`}
                  name="Signature"
                  imagsFile={imagsFile}
                  downloadFile={downloadFile}
                />

                {location.state?.data?.tradingAgreement == 1 &&
                  <FilePreview
                    file={`trading-${location?.state?.data?.uid}.pdf`}
                    name="NCL Terms & Conditions"
                    imagsFile={imagsFile}
                    downloadFile={downloadFile}
                  />}

                {location.state?.data?.tripartiteAgreement == 1 &&
                  <FilePreview
                    file={`tripartitet-${location.state?.data?.uid}.pdf`}
                    name="Tripartite Terms & Conditions"
                    imagsFile={imagsFile}
                    downloadFile={downloadFile}
                  />}

                {location.state?.data?.giftAgreement == 1 &&
                  <FilePreview
                    file={`gift-${location.state?.data?.uid}.pdf`}
                    name="Gift/Inheritance Undertaking"
                    imagsFile={imagsFile}
                    downloadFile={downloadFile}
                  />}
                {location.state?.data?.retirementAgreement == 1 &&
                  <FilePreview
                    file={`retirement-${location.state?.data?.uid}.pdf`}
                    name="Retirement"
                    imagsFile={imagsFile}
                    downloadFile={downloadFile}
                  />}

              </div>

            </div>

            <div className="my-3 container p-3 text-break infoformpagebrdrbtm minw100">
              <p className=" fs20 fw-600 text-black px-0">Next To Kin</p>
              <div className="row">
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">{data?.KinName}</p>
                  <p className="fw-400 fs14 t-grey-a">Name</p>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">{data?.KinFthrName}</p>
                  <p className="fw-400 fs14 t-grey-a">Father / Husband's Name</p>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data.KinEmail}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    Email
                  </p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.KinRelation}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">Relationship with Account Holder</p>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.KinMailstreet}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">Street Address</p>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data.KinMailCountry}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    Country
                  </p>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data.KinMailProvinces}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    Province/State
                  </p>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data.KinMailCity}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    City
                  </p>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.KinNumber}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    Contact Number
                  </p>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.KinPhoneNumber}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    Phone Number
                  </p>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.KinIDType}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    ID type
                  </p>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.KinCNIC}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">
                    Identity Document Number
                  </p>
                </div>
                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">{data?.AccountOperatingInstruction}</p>
                  <p className="fw-400 fs14 t-grey-a">Account Operating Instruction</p>
                </div>


                <div className="col-lg-3 col-md-6 col-12">
                  <p className=" fw-400 fs16 t-black-2 mb-1">
                    {data?.TaxExemption}
                  </p>
                  <p className="fw-400 fs14 t-grey-a">Tax Exemption</p>
                </div>

              </div>

            </div>

            <div className="my-3 container p-3 text-break infoformpagebrdrbtm minw100">
              <p className=" fs20 fw-600 text-black px-0">Official Status</p>
              <div className="row">
                <div className="col-lg-3 col-md-6 col-12">

                  <p className="fw-400 fs14 t-grey-a">Status</p>

                  <div className="mt-auto">
                    <Select placeholder="Select any one" defaultValue={location?.state?.data?.status} onSelect={(value, event) => handleStatusChange(event)}>

                      {OfficialStatus.map(officialStatus => (
                        <Option key={officialStatus.value}>{officialStatus.label}</Option>
                      ))}

                    </Select>

                  </div >
                </div>

              </div>

            </div>

          </div>

        </div>

        <Modal visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}

          footer={<>
            <button
              className="btn-filled fs16 px-3 py-1 mx-1"
              type="button"
              onClick={handleOk}
            >

              {statusLoading ? (
                // <div className="spinner-border text-light" role="status">
                //     <span className="visually-hidden">Loading...</span>
                // </div>
                <div className="whitespinner">
                  <div className="bounce1"></div>
                  <div className="bounce2"></div>
                  <div className="bounce3"></div>
                </div>
              ) : (
                <>Yes</>
              )}

            </button>

            <button
              className="btn-filled fs16 px-3 py-1 mx-1"
              type="button"
              onClick={handleCancel}
            >
              Cancel

            </button>
          </>


          }>
          {console.log({ Description })}
          <p className="fs18 fw-600">Correction Required</p>
          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">Details</label>
            <textarea name='desription' onChange={(e) => {
              if (e.key === "Enter") {
                setDescription(`${e.target.value}\n`);
              }
              setDescription(e.target.value);
            }} placeholder='Write your message here...' className="form-control" id="message-text" required value={Description}></textarea>
          </div>
        </Modal>

      </div>
    </>
  );
}

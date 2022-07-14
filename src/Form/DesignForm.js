import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import View from "../Atoms/View";

export default function Form(props) {
  // const apiDstatus=props.dataFor[6].ApiDStatus
  // console.log("888888",apiDstatus.split(" "))
  const [status, setStatus] = useState(props.dataFor.status);
  return (
    <div>
      {props.dataFor.map(each => (

        <div className="container-fluid px-0 ">
          <div className="row container mx-auto text-break infoformpagebrdrbtm pt-3 pb-3">

            <div className="col-2">
              <p className="fs16 fw-400 t-black-2">{each.firstName}</p>
            </div>

            <div className="col-2">
              <p className="fs16 fw-400 t-black-2">{each?.multi?.CNIC}</p>
            </div>

            <div className="col-8">
              <div className="row row-col-5">
                <div className="col">
                  <p className="fs16 fw-400 t-black-2">{each.multi?.PERMANENT_CELL_NO}</p>
                </div>
                <div className="col">
                  <p className="fs16 fw-400 t-black-2">{each.email}</p>
                </div>

                <div className="col">
                  <p className="fs16 fw-400 t-black-2">{each?.COMP_STATE}</p>
                </div>
                <div className="col">
                  <div className="d-inline-flex">
                    <span className="greendot my-2"></span>
                    <p className="fs16 fw-400 t-black-2">{each?.ApiDStatus ? each?.ApiDStatus?.slice(1, 5) : "In Process"}</p>
                  </div>
                  {/* {status === "Completed" ? (
                    <div className="d-inline-flex">
                      <span className="greendot my-2"></span>
                      <p className="fs16 fw-400 t-black-2">{each.status}</p>
                    </div>
                  ) : status === "InProgress" ? (
                    <div className="d-inline-flex">
                      <span className="bluedot my-2"></span>
                      <p className="fs16 fw-400 t-black-2">{each.status}</p>
                    </div>
                  ) : (
                    <div className="d-inline-flex">
                      <span className="orangedot my-2"></span>
                      {each.ApiDStatus && each.ApiDStatus.split(" ").map((data, i) => (
                        <p className="fs16 fw-400 t-black-2">{i === 0 ? data : ""}</p>))}
                    </div>
                  )} */}
                </div>
                <div className="col">
                  <View each={each} funct={props.funcGetdata} />
                </div>
              </div>
            </div>
          </div>
        </div>))}</div>
  );
}

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Form({ props }) {
  // const apiDstatus=props[6].ApiDStatus
  // console.log("888888",apiDstatus.split(" "))
  console.log('propsa re on landing form ==============', props)
  const [status, setStatus] = useState(props.status);
  return (
    <div>
      {props.map(props => (
        <div className="container-fluid px-0 ">
          <div className="row container mx-auto text-break infoformpagebrdrbtm pt-3 pb-3">

            <div className="col-3 col-lg-6">
              <p className="fs16 fw-400 t-black-2">{props.firstName}</p>
            </div>
            <div className="col-3 col-lg-2">
              <p className="fs16 fw-400 t-black-2">{props.lastName}</p>
            </div>
            <div className="col-3 col-lg-2">
              <p className="fs16 fw-400 t-black-2">{props?.multi?.CNIC}</p>
            </div>
            <div className="col-3 col-lg-2">
              <p className="fs16 fw-400 t-black-2">{props?.multi?.CNIC}</p>
            </div>
            
          </div>
        </div>))}</div>
  );
}

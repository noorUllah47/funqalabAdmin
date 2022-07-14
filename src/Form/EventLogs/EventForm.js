import React from 'react';

const EventForm = (props) => {
    return (
        <div className="container-fluid px-0 ">
            <div className="row container text-break infoformpagebrdrbtm pt-3 pb-3">
                <div className="col-2 ">
                    <p>{props.time}</p>
                </div>
                {/* <div className="col-2">
                    <p>{props.date.getDate()+'-'+props.date.getMonth()+1+'-'+props.date.getFullYear()}</p>
                </div> */}
                <div className="col-2">
                    <p>{props.date}</p>
                </div>
                <div className="col-4">
                    <p>{props.event}</p>
                </div>
                <div className="col-4">
                    <p>{props.status}</p>
                </div>
            </div>
        </div>
    )
};

export default EventForm;

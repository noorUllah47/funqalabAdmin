import React, { useEffect, useState } from 'react';
import EventForm from './EventForm';
import PaginationComp from "../Pagination/Pagination";
import moment from 'moment-timezone';
const Table = ({ Data }) => {
  const [inView, setInView] = useState(10);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [pgNum, setPgNum] = useState(1);            //currentpage
  const [total, setTotal] = useState((Data.length / 10) + 1)   //total pages of all entries initially set 2
  const [perPage, setPerPage] = useState(10)        //entries per page
  console.log(total)
  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setPgNum(pageNumber);
    setStart((pageNumber * 10) - 10)
    setEnd(pageNumber * 10)
  }

  useEffect(() => {

    // moment.tz.setDefault('Asia/Karachi')
    setTotal(Math.trunc((Data.length / 10) + 1))
  }, [Data]);





  const formData1 = Data
    .slice(start, end).map((each) => {
      return (
        <div key={each.id}>
          <EventForm
            id={each.id}
            // time={moment(each.updatedAt).utc().format('H:mm:ss A')}
            // date={moment(each.updatedAt).utc().format('MM-DD-YYYY ')}

            time={moment.tz.setDefault('Asia/Karachi')(each.updatedAt).format('H:mm:ss A')}
            date={moment.tz.setDefault('Asia/Karachi')(each.updatedAt).utc().format('MM-DD-YYYY ')}


            event={each.description}
            status={each.status}
            each={each}
          />
        </div>
      );
    });

  return (
    <>
      <div className="mt-3 mb-0 row container mx-auto infoformpage py-2 infoformpagebrdrtop infoformpagebrdrbtm">
        <div className="col-2">
          <span className="t-grey-a fs14">TIME</span>
        </div>
        <div className="col-2 ">
          <span className="t-grey-a fs14">DATE</span>
        </div>
        <div className="col-4 ">
          <span className="t-grey-a fs14">EVENT</span>
        </div>
        <div className="col-4">
          <span className="t-grey-a fs14">DETAILS</span>
        </div>
      </div>
      <div className="my-3">{formData1}</div>
      <PaginationComp pgNum={pgNum} total={total} handlePageChange={handlePageChange} />
    </>
  );
};

export default Table;


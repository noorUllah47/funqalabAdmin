import React from 'react';
import Pagination from "react-js-pagination";
import './style.css'

const PaginationComp = ({pgNum, total, handlePageChange}) => {
    console.log("total",total)
    return (
        <div className="pag">
            <Pagination
                activePage={pgNum}
                itemsCountPerPage={10}
                totalItemsCount={total * 10}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
            />
        </div>
    );
};

export default PaginationComp;

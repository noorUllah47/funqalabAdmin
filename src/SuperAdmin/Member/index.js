import React, { useEffect, useState } from "react";
import Form from "./DesignForm";
import GetData from "../../api/GetData";
import PaginationComp from "./Pagination/Pagination";
import Navbar from "../../Atoms/Navbar";

const Member = () => {
    const [serachTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false)
    const [pgNum, setPgNum] = useState(1);            //currentpage
    const [total, setTotal] = useState(2)             //total pages of all entries initially set 2
    const [Data, setData] = useState([])
    const [SData, setSData] = useState([])              //consist of Data of current Page
    const [perPage, setPerPage] = useState(10)         //entries per page
    const [submission, setSubmission] = useState(0)   //total Submissions
    const [searchResult, setsearchResult] = useState([]);

    useEffect(() => {
        setLoading(true)
        const res = GetData.FormSubmitted(pgNum, perPage)
        res.then(value => {
            console.log(value.data.totalPages);
            console.log("serach values", value.data.data);

            setTotal(value.data.totalPages)
            setData(value.data.data)
            setSubmission(value.data.totalElements)
            setLoading(false)
        })
            .catch(error => {
                console.log(error.response)
            })
    }, [pgNum]);
    useEffect(() => {
        setLoading(true)
        const res = GetData.FormSubmitted2()
        res.then(value => {
            console.log(value.data);
            console.log("total values", value.data);
            // for()
            // setData(value.data.data)
            setSData(value.data)
            // setTotal(value.data.totalPages)
            // setData(value.data.data)
            // setSubmission(value.data.totalElements)
            setLoading(false)
        })
            .catch(error => {
                console.log(error.response)
            })
    }, []);

    const handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        setPgNum(pageNumber);
    }

    function calcommonChange(v) {
        console.log("first", v)
        setSearchTerm(v)
        if (v !== "") {

            const sreachResults = SData
                .filter((value) => {
                    if (v == "") {
                        return value;
                    } else if (
                        value.firstName.toLowerCase().includes(v.toLowerCase())
                    ) {
                        return value;
                    }
                    else if (
                        value.email.toLowerCase().includes(v.toLowerCase())
                    ) {
                        return value;
                    } else if (
                        value.CNIC.toLowerCase().includes(v.toLowerCase())
                    ) {
                        return value;
                    } else if (
                        value.number.toLowerCase().includes(v.toLowerCase())
                    ) {
                        return value;
                    }
                })
            console.log("result ////", sreachResults);
            setsearchResult(sreachResults)
        }
    }

    function handleSearch(e) {
        // alert(e.target.value)
        calcommonChange(e.target.value)

    }
    useEffect(() => {



    }, [serachTerm, searchResult])

    function handlePaste(e) {
        console.log(e.clipboardData.getData('Text'))

        let paste = (e.clipboardData || window.clipboardData).getData("text");
        paste = paste.split("|").join(","); //transform your pasted content
        const selectionStart = e.target.selectionStart;

        const selectionEnd = e.target.selectionEnd;

        const currentValue = e.target.value;

        const startValue = currentValue.substring(0, selectionStart);
        const endValue = currentValue.substring(selectionEnd);

        calcommonChange(startValue + paste + endValue);
        e.preventDefault();


    }

    return (
        <>
            <Navbar />
            <div className=" infoformpage width_full pt-5 ">
                <div className="col-10 mx-auto my-0 py-0 infoform bg-white ">
                    <div className="container p-3">
                        <div className="d-inline-flex w-100">
                            <div>
                                <h5>Forms</h5>
                            </div>
                            <div className="ms-auto">
                                <input
                                    type="search"
                                    className="forminput fw-400 fs14 "
                                    placeholder="Searching"
                                    value={serachTerm}
                                    onPaste={handlePaste}
                                    onBlur={handleSearch}

                                    onChange={
                                        handleSearch}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 mb-0 row container mx-auto infoformpage py-2 infoformpagebrdrtop infoformpagebrdrbtm">

                        <div className="col-3 col-lg-6">
                            <span className="t-grey-a fs14">EMAIL</span>
                        </div>
                        <div className="col-3 col-lg-2">
                            <span className="t-grey-a fs14">LOGIN TIME</span>
                        </div>
                        <div className="col-3 col-lg-2">
                            <span className="t-grey-a fs14">LOGOUT TIME</span>
                        </div>
                        <div className="col-3 col-lg-2">
                            <span className="t-grey-a fs14">DEVICE TYPE</span>
                        </div>
                    </div>
                    {loading ?
                        <div className="d-flex justify-content-center h-100">
                            <button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button></div> :
                        <div className="my-3">
                            <Form
                                props={serachTerm ? searchResult : Data}
                            />
                        </div>}
                    <div className="pagination">
                        <PaginationComp pgNum={pgNum} total={total} handlePageChange={handlePageChange} />
                    </div>

                </div>
            </div>
        </>
    );
}

export default Member;
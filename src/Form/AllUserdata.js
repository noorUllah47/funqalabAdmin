import React, { useEffect, useState } from "react";
import Form from "./DesignForm";
import Navbar from "../Atoms/Navbar";
import GetData from "../api/GetData";
import PaginationComp from "./Pagination/Pagination";
import { SearchOutlined } from '@ant-design/icons';
import { Table, Button, Input, Space, message } from 'antd';
import View from "../Atoms/View";
import { CSVLink } from "react-csv"

const form2 = []

export default function Forms1() {
    const [serachTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false)
    const [pgNum, setPgNum] = useState(1);            //currentpage
    const [total, setTotal] = useState(2)             //total pages of all entries initially set 2
    const [Data, setData] = useState([])
    const [CSVData, setCSVData] = useState([])
    const [SData, setSData] = useState([])              //consist of Data of current Page
    const [perPage, setPerPage] = useState(10)         //entries per page
    const [submission, setSubmission] = useState(0)   //total Submissions
    const [searchResult, setsearchResult] = useState([]);
    const [searchText, setSearchText] = useState([]);
    const [searchedColumn, setSearchedColumn] = useState([]);



    useEffect(() => {
        setLoading(true)
        getData()
    }, [pgNum]);



    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    // ref={node => {
                    //   this.searchInput = node;
                    // }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch1(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch1(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        className='btn'
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            // this.setState({
                            //   searchText: selectedKeys[0],
                            //   searchedColumn: dataIndex,
                            // });
                            setSearchText(selectedKeys[0])
                            setSearchedColumn(dataIndex)
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),

        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : 'rgb(32,111,235)' }} />,



        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                // setTimeout(() => this.searchInput.select(), 100);
            }
        },

    });


    const handleSearch1 = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // this.setState({
        //   searchText: selectedKeys[0],
        //   searchedColumn: dataIndex,
        // });
    };

    const handleReset = clearFilters => {
        clearFilters();
        // this.setState({ searchText: '' });
        setSearchText('')

    };

    const getData = () => {



        const res = GetData.FormSubmitted(pgNum, perPage)
        res.then(value => {


            // setTotal(value.data.totalPages)

            let reversedata = value.data.data.reverse()

            let newParseArray = []
            reversedata.map(val => {

                newParseArray.push({
                    firstName: val?.firstName,
                    phoneNumber: val?.phoneNumber,
                    email: val?.email,
                    CNIC: val?.CNIC,
                    IssueDate: val?.IssueDate,
                    status: val?.status
                })

            })


            setData(reversedata)
            setCSVData(newParseArray)

            // setSubmission(value.data.totalElements)
            setLoading(false)
        })
            .catch(error => {
                console.log(error.response)

            })
    }
    // useEffect(() => {
    //   setLoading(true)
    //   const res = GetData.FormSubmitted2()
    //   res.then(value => {

    //     // for()
    //     // setData(value.data.data)
    //     setSData(value.data)
    //     // setTotal(value.data.totalPages)
    //     // setData(value.data.data)
    //     // setSubmission(value.data.totalElements)
    //     setLoading(false)
    //   })
    //     .catch(error => {
    //       console.log(error.response)
    //     })
    // }, []);

    const handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        setPgNum(pageNumber);
    }

    function calcommonChange(v) {
        let encodedForSpecialCharacter = encodeURIComponent(v)

        setSearchTerm(v)

        const res = GetData.FormSearchSubmitted(pgNum, perPage, encodedForSpecialCharacter)
        res.then(value => {


            setTotal(value.data.totalPages)
            let reversedata = value.data.data.reverse()
            setData(reversedata)

            let newParseArray = []
            reversedata.map(val => {

                newParseArray.push({
                    firstName: val?.firstName,
                    phoneNumber: val?.phoneNumber,
                    email: val?.email,
                    CNIC: val?.CNIC,
                    IssueDate: val?.IssueDate,
                    status: val?.status
                })

            })


            setData(reversedata)
            setCSVData(newParseArray)

            setSubmission(value.data.totalElements)
            setLoading(false)
            setsearchResult(value.data.data)
        })
            .catch(error => {
                console.log(error.response)
            })
        // if (v !== "") {

        //   const sreachResults = SData
        //     .filter((value) => {
        //       if (v == "") {
        //         return value;
        //       } else if (
        //         value.firstName.toLowerCase().includes(v.toLowerCase())
        //       ) {
        //         return value;
        //       }
        //       else if (
        //         value.email.toLowerCase().includes(v.toLowerCase())
        //       ) {
        //         return value;
        //       } else if (
        //         value.CNIC.toLowerCase().includes(v.toLowerCase())
        //       ) {
        //         return value;
        //       } else if (
        //         value.number.toLowerCase().includes(v.toLowerCase())
        //       ) {
        //         return value;
        //       }
        //     })
        //   console.log("result ////", sreachResults);
        //   setsearchResult(sreachResults)
        // }



    }

    const handleViewRecord = (record) => {
        console.log('dats is============>>>', record)

        // this.setState({
        //   visible: true,
        //   detailRecord: record
        // })

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
    const columns = [
        {
            title: 'First Name',
            // width: 150,
            dataIndex: 'firstName',
            key: 'firstName',
            fixed: 'left',
            ...getColumnSearchProps('firstName'),
        },
        {
            title: 'Phone Number',
            // width: 150,
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            fixed: 'left',
            ...getColumnSearchProps('phoneNumber'),

        },
        {
            title: 'Email',
            dataIndex: 'email',
            ...getColumnSearchProps('email'),

            key: '1',
        },
        {
            title: 'CNIC',
            dataIndex: 'CNIC',
            ...getColumnSearchProps('CNIC'),
            key: '2',
        },

        {
            title: 'Issue Date',
            dataIndex: 'IssueDate',
            ...getColumnSearchProps('IssueDate'),
            key: '3',
        },
        {
            title: 'Expiry Date',
            dataIndex: 'ExpiryDate',
            // ...getColumnSearchProps('ExpiryDate'),
            key: '4',
            render: (item, record, index) => (<>
                <div className="ant-employed">


                    {record?.lifeTimeExpiry == 1 ? 'Life Time Expiry' : record?.ExpiryDate}

                </div>
            </>)
        },
        {
            title: 'Status',
            // width: 150,
            dataIndex: 'status',
            key: 'status',
            fixed: 'left',
            sorter: (a, b) => a.status.localeCompare(b.status),

        },


        {
            title: 'Date Updated',
            key: 'operation',
            //   render: () => {
            //   // <button className="infoformbtn">View</button>,
            //   <View each={each} funct={Data} />
            // }

            render: (item, record, index) => {
                let date = new Date(record.updatedAt)
                return (<>
                    <p>{date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</p>
                </>)
            }
        },
        {
            title: 'Time',
            key: 'operation',
            //   render: () => {
            //   // <button className="infoformbtn">View</button>,
            //   <View each={each} funct={Data} />
            // }

            render: (item, record, index) => {
                let date = new Date(record.updatedAt)
                return (<>
                    <p>{(date.getHours() % 12 || 12).toString().padStart(2, '0')}:{date.getMinutes().toString().padStart(2, '0')} {date.getHours() >= 12 ? 'pm' : 'am'}</p>
                </>)
            }
        },

        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 100,
            //   render: () => {
            //   // <button className="infoformbtn">View</button>,
            //   <View each={each} funct={Data} />
            // }

            render: (item, record, index) => (<>
                <div className="ant-employed">
                    {/* <span>{record.District}</span> */}

                    {/* <Button type="primary" className="tag-primary" > */}

                    <View each={record} />
                    {/* <Button type="primary" className="tag-primary btn" >
            VIEW
          </Button> */}
                </div>
            </>)
        },
    ];



    return (
        <>
            {/* <Navbar /> */}
            {/* <div className="d-flex justify-content-end m20">
                <CSVLink
                    filename={"Customer_Table.csv"}
                    data={CSVData}
                    className="btn btn-primary"
                    onClick={() => {
                        message.success("The file is downloading")
                    }}
                >
                    Export to CSV
                </CSVLink>
            </div> */}
            <div className="m20 infoform">


                <Table
                    columns={columns}
                    dataSource={Data}
                    // pagination={{
                    //   pageSize: 5,
                    // }}
                    scroll={{
                        x: 1300,
                    }}

                />
            </div>

            {/* <div className=" infoformpage width_full pt-5 ">
        <div className="col-10 mx-auto my-0 py-0 infoform bg-white ">
          <div className="container p-3">
            <div className="d-inline-flex w-100">
              <div>
                <h5>Forms</h5>
              </div>
              <div>
                <span className="infoformline "></span>
              </div>
              <div>
                <p className="fw-400 fs16 t-grey-a">
                  {submission} Submissions
                </p>
              </div>
              <div className="ms-auto">
                <input
                  type="search"
                  className="forminput fw-400 fs14 "
                  placeholder="Search"
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

            <div className="col-2">
              <span className="t-grey-a fs14">FULL LEGAL NAME</span>
            </div>
            <div className="col-2">
              <span className="t-grey-a fs14">UIN</span>
            </div>
            <div className="col-8">
              <div className="row row-col-5">
                <div className="col">
                  <span className="t-grey-a fs14">PHONE</span>
                </div>
                <div className="col">
                  <span className="t-grey-a fs14">Email</span>
                </div>

                <div className="col">
                  <span className="t-grey-a fs14">COMPLAINCE </span>
                </div>
                <div className="col">
                  <span className="t-grey-a fs14">STATUS </span>
                </div>
                <div className="col"></div>
              </div>
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
                dataFor={serachTerm ? searchResult : Data}
                funcGetdata={getData}
              />
            </div>}
          <div className="pagination">
            <PaginationComp pgNum={pgNum} total={total} handlePageChange={handlePageChange} />
          </div>

        </div>
      </div> */}
        </>
    );
}


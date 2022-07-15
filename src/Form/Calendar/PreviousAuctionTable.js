import { SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Menu, Modal, Space, Table } from "antd";
import { useRef, useState, useEffect } from "react";
// import Highlighter from "react-highlight-words";
import DeleteModal from "./DeleteModal";
import GetData from '../../api/GetData'
import moment from 'moment-timezone';



// const data = [
//   {
//     key: 1,
//     Instrument_Type: "T-Bill",
//     Auction_Date: "18-May-22",
//     Cutt_off: "3:00 Pm",
//     Settlement_Date: " 19-May-22",
//   },
//   {
//     key: 2,
//     Instrument_Type: "T-Bill",
//     Auction_Date: "1-Jun-22",
//     Cutt_off: "3:00 Pm",
//     Settlement_Date: "2-Jun-22",


//   },
//   {
//     key: 3,

//     Instrument_Type: "T-Bill",
//     Auction_Date: "15-Jun-22",
//     Cutt_off: "3:00 Pm",
//     Settlement_Date: "16-Jun-22",


//   },
//   {
//     key: 4,

//     Instrument_Type: "T-Bill",
//     Auction_Date: "29-Jun-22",
//     Cutt_off: "3:00 Pm",
//     Settlement_Date: " 30-Jun-22",


//   },

// ];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const PreviousAuctionTable = () => {

  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState();
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };


  useEffect(() => {
    // setLoading(true)

    const res = GetData.GetAllAuctions()
    res.then(value => {


      let todayDate = moment().format('YYYY-MM-DD')

      moment(todayDate).isAfter('2010-10-19');


      let previousAuction = value?.data?.data?.filter(item => {
        console.log('item are --------', item)
        if (moment(todayDate).isSame(item?.auctionDate) || moment(todayDate).isAfter(item?.auctionDate)) {
          return item
        }

      })


      console.log("previousAuction ========>> <<<", previousAuction);

      setData(previousAuction)

    })
      .catch(error => {
        console.log(error.response)
      })
  }, []);
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        // <Highlighter
        //   highlightStyle={{
        //     backgroundColor: '#ffc069',
        //     padding: 0,
        //   }}
        //   searchWords={[searchText]}
        //   autoEscape
        //   textToHighlight={text ? text.toString() : ''}
        // />
        <p></p>
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Instruments",
      dataIndex: "instruments",
      sorter: (a, b) => a.instruments.localeCompare(b.instruments),
      // fixed: 'left',
      width: 8,
      ...getColumnSearchProps('instruments'),



    },
    {
      title: "Auction Date",
      dataIndex: "auctionDate",
      width: 4,
      // filters: [
      //   {
      //     text: 'Joe',
      //     value: 'Joe',
      //   },
      //   {
      //     text: 'Jim',
      //     value: 'Jim',
      //   },],
      ...getColumnSearchProps('auctionDate'),

    },

    {
      title: "Settlmenet Date",

      dataIndex: "settlementDate",
      sorter: {
        compare: (a, b) => new Date(a.settlementDate) - new Date(b.settlementDate),
        // multiple: 3,
      },
      width: 4,
      ...getColumnSearchProps('settlementDate'),



    },

    {
      title: "Cuttoff Time",
      dataIndex: "cutoffDate",
      width: 3,
      ...getColumnSearchProps('cutoffDate'),
    },



  ];
  return (
    <>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        onChange={onChange}
        // scroll={{
        //   x: 640,
        //   y: 515,
        // }}
      />



    </>
  )
};

export default PreviousAuctionTable;

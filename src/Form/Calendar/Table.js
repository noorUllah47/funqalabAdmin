import { SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Menu, Modal, Space, Table } from "antd";
import { useRef, useState, useEffect } from "react";
import GetData from '../../api/GetData'
// import Highlighter from "react-highlight-words";
import DeleteModal from "./DeleteModal";
import moment from 'moment-timezone';





const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const CTable = (newSaveData) => {




  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState();
  console.log(data, 'new save daata is ============>>>', newSaveData)



  useEffect(() => {
    // setLoading(true)

    const res = GetData.GetAllAuctions()
    res.then(value => {

      console.log("total values", value?.data?.data);


      let todayDate = moment().format('YYYY-MM-DD')

      moment(todayDate).isAfter('2010-10-19');


      let inComingAuctions = value?.data?.data?.filter(item => {
        console.log('item are --------', item)
        if (moment(todayDate).isBefore(item?.auctionDate)) {
          return item
        }

      })

      setData(inComingAuctions)

    })
      .catch(error => {
        console.log(error.response)
      })
  }, []);





  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

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


    {
      title: "",
      dataIndex: "",
      width: 1,

      // render: () => <DeleteModal />

      render: (item, record, index) => (<>
        <div className="ant-employed">
          {/* <span>{record.District}</span> */}

          {/* <Button type="primary" className="tag-primary" > */}

          <DeleteModal each={record} />
          {/* <Button type="primary" className="tag-primary btn" >
    VIEW
  </Button> */}
        </div>
      </>)

    }
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

export default CTable;

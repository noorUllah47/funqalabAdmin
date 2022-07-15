
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  BankOutlined,
  VideoCameraOutlined,
  AuditOutlined,
  ExportOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { Layout, Menu ,Table} from 'antd';
import Item from 'antd/lib/list/Item';
import React, { useState } from 'react';
import Forms1 from './AllUserdata'
import Calendar from './Calendar/Calendar'
import Logo from "../Assets/Img/Logo1.svg";
import Logout from "../Assets/Img/Logout.svg";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Navbar from '../Atoms/Navbar';
import icon from "../Assets/Img/iconn.ico"
import ExportCsv from "./ExportCsv"
const { Header, Sider, Content } = Layout;

const Forms = () => {
  const history = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [menuSelected, setMenuSelected] = useState(1);

  const handleMenuClick = event => {
    console.log('main mkenu is =====', event)
    setMenuSelected(event?.key)
    //you can get here event.target.value
    //filter the content 
    //setState the content your component will re render and content will be updated.

  }
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const columns=[]
  const Data=[]

  return (
    <Layout>
      <Sider  trigger={null} collapsible collapsed={collapsed}>
        <div className="logo mt-5 " />
        <img  src={Logo} alt="" className={` mb-5 p-1 ${collapsed?"d-none":"d-block"}`} width="100%" height="40px" />
         <img className={` mb-5 p-1 ms-3  ${collapsed?"d-block":"d-none"}`} src={icon}/>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={(e) => handleMenuClick(e)}
          items={[
            
            {
              key: '1',
              icon: <UserOutlined />,
              label: ' IPS Users',

            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'IPS Clients',
            
            },
            {
              key: '3',
              icon: <AuditOutlined />,
              label: 'Bids Details',
            
            },
            {
              key: '4',
              icon: <AuditOutlined />,
              label: 'Payments Details',
            
            },
            {
              key: '5',
              icon: <CalendarOutlined /> ,
              label: 'Auction Calendar',
            
            },
            // {
            //   key: '3',
            //   icon: <UploadOutlined />,
            //   label: 'nav 3',

            // },
            getItem('Export ', 'sub2', <ExportOutlined />, [getItem('IPS Users', '6'), getItem('Auction Calendar', '8')])
          ]}
        />
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
          }}
        >
          {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
         
         
         })} */}
         <p 
        className={" cursorPointer d-flex justify-content-between"}
            onClick= {() => setCollapsed(!collapsed)}
            ><MenuUnfoldOutlined className='mt-4'/>
              {/* <img src={Logout} alt="" width="100%" height="40px" /> */}

          <div className=" cursorPointer">
            <span  onClick={() => { localStorage.clear(); history('/') }} className="t-grey-400 ">
              <img src={Logout} alt="" width="100%" height="40px" />
            </span>
          </div>
            </p>
         {/* <Navbar/> */}
        
        </Header>
       
        {menuSelected == 1 && (
          <Forms1 />
        )
        }
        {menuSelected == 5 && (
          <Calendar />
        )
        }
        {menuSelected == 6 && (
           <p></p>        )
        }
{menuSelected == 3 && (
           <Table
          //  style={{height:"1000px"}}
           columns={columns}
           dataSource={Data}
           // pagination={{
           //   pageSize: 5,
           // }}
           scroll={{
               x: 1300,
           }}

       />        )
        }

{menuSelected == 4 && (
           <Table
          //  style={{height:"1000px"}}
           columns={columns}
           dataSource={Data}
           // pagination={{
           //   pageSize: 5,
           // }}
           scroll={{
               x: 1300,
           }}

       />        )
        }
        {menuSelected == 2 && (
           <Table
          //  style={{height:"1000px"}}
           columns={columns}
           dataSource={Data}
           // pagination={{
           //   pageSize: 5,
           // }}
          

       />        )
        }
        {menuSelected == 6 && (
       <ExportCsv/>
               )
        }
        {menuSelected == 8 && (
       <ExportCsv/>
               )
        }
      </Layout>
    </Layout>
  );

};

export default Forms;


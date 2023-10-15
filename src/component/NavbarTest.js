import React, {useState,useEffect} from 'react';
import { Breadcrumb, Layout, Menu, theme,Input, Space, Button,Image,Dropdown ,message,Card,Row,Col,List,Popconfirm,Avatar} from "antd";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserOutlined} from '@ant-design/icons';
import '../style.css'

const { Search } = Input;


export default function NavbarTest() {
  
  const [MName, setMName] = useState('');
    const navigate = useNavigate();

    const handleClickLogout = () => {
        localStorage.removeItem("Token")  //สามารถลบข้อมูลที่เก็บไว้ใน Local Storage 
        navigate('/');
      };
  
      useEffect(() => {
        const tokens = localStorage.getItem("Token");
        const headers = {
          "Content-Type": 'application/json',
          "Authoriztion": `Bearer ${tokens}`
        }
        const fetchLoginToken = async () => {
          if (tokens !== null){
            try{
              const response = await axios.post('http://localhost:3359/api/login/authen', {},{ headers });
              const resp = response.data;  //รับข้อมูลจากเซิร์ฟเวอร์
              console.log('รับข้อมูลจากเซิร์ฟเวอร์:',resp.users[0].M_Name);  //เข้าถึงตัวแปร status 
              if (resp.status === 'Success'){
                setMName(resp.users[0].M_Name);
              }
              else if (resp.status === 'error') {
                localStorage.removeItem("Token");
                navigate('/');
              }
            }
            catch(error){
              console.log('เกิดข้อผิดพลาดในการส่งคำขอ:');
              localStorage.removeItem("Token");
              navigate('/');
            }
          }
          else {
               message.warning('กรุณาเข้าสู่ระบบ');
               localStorage.removeItem("Token")  //สามารถลบข้อมูลที่เก็บไว้ใน Local Storage 
               navigate('/');
            console.log('ไม่มี Token');
          }
        };
             fetchLoginToken();
      }, []);

      //Popconfirm Logout
      const confirm = (e) => {
        message.success('Logout');
        localStorage.removeItem("Token")  //สามารถลบข้อมูลที่เก็บไว้ใน Local Storage 
        navigate('/');
      };

    return(
        <div style={{ display: 'flex', alignItems: 'center',width: '100%'}}>
       
        <Menu className="resizable-menu"
        style={{ fontSize: '18px', color: 'white', backgroundColor: 'MediumVioletRed' }}
        mode="horizontal"
        items={[
            {
            key: '1',
            label: 'HOME',
            },
            {
            key: '2',
            label: 'IDOL',
            },
            {
            key: '3',
            label: 'MOVIES',
            },
        ]}
        />
        <div className="search-container">
        <Search 
            placeholder="search..."
            allowClear
            className="resizable-search"
        />
        </div>
        <div className="Label-container">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Space size={4}><Avatar size={32} icon={<UserOutlined />} /> {MName} </Space>
          </div>
        </div>
        <div className="button-container">
        <Popconfirm
            title="Want to Logout"
            description="Are you sure to Logout this task?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
        >
        <Button className="logout-button danger" type="text">LOGOUT</Button>
        </Popconfirm>
        </div>
        </div>
        
)}
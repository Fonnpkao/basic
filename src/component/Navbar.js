import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Space, Button, message, Popconfirm, Avatar } from "antd";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';

const { Search } = Input;

function NavbarTop() {
  const [MName, setMName] = useState('');
  const navigate = useNavigate();

  const handleClickLogout = () => {
    localStorage.removeItem("Token")
    navigate('/');
  };

  useEffect(() => {
    const tokens = localStorage.getItem("Token");
    const headers = {
      "Content-Type": 'application/json',
      "Authoriztion": `Bearer ${tokens}`
    }
    const fetchLoginToken = async () => {
      if (tokens !== null) {
        try {
          const response = await axios.post('http://localhost:3359/api/login/authen', {}, { headers });
          const resp = response.data;
          console.log('รับข้อมูลจากเซิร์ฟเวอร์:', resp.users[0].M_Name);
          if (resp.status === 'Success') {
            setMName(resp.users[0].M_Name);
          }
          else if (resp.status === 'error') {
            localStorage.removeItem("Token");
            navigate('/');
          }
        }
        catch (error) {
          console.log('เกิดข้อผิดพลาดในการส่งคำขอ:');
          localStorage.removeItem("Token");
          navigate('/');
        }
      }
      else {
        message.warning('กรุณาเข้าสู่ระบบ');
        localStorage.removeItem("Token")
        navigate('/');
        console.log('ไม่มี Token');
      }
    };
    fetchLoginToken();
  }, []);

  // Popconfirm Logout
  const confirm = (e) => {
    message.success('Logout');
    localStorage.removeItem("Token")  //สามารถลบข้อมูลที่เก็บไว้ใน Local Storage 
    navigate('/');
  };

  return (
    <Navbar style={{ backgroundColor: "#C71585" }} expand="lg" fixed="top" className="navbar-top"  >
        <Container fluid>
        <Navbar.Brand href="#home">K-POP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">TOP10</Nav.Link>
            <NavDropdown title="TYPE" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Boy Group</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Girl Group</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="d-flex align-items-center">
            <div className="search-container">
              <Search
                placeholder="search..."
                allowClear
                className="resizable-search" />
            </div>
            <div className="Label-container">
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black' }}>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarTop;

import React, {useState} from 'react';
import '../style.css'
import { useNavigate } from 'react-router-dom';
import {  Button, notification,  } from "antd";
import axios from 'axios';

const Register =()=>{

  /**ค่าเริ่มต้น */
  const [M_Name, setname] = useState('');
  const [User_Id, setUserId] = useState('');
  const [M_Pass, setPassword] = useState('');
  const [M_CPass, setConPassword] = useState('');

  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const handleClickCancel = () => {
  navigate('/');
  };  
    
    const handleInputChange = (event) => {        /**event.target เพื่อเข้าถึงข้อมูลหรือสถานะขององค์ประกอบต้นทางในการจัดการเหตุการณ์ เช่น การดึงค่าของช่องข้อมูล, การตรวจสอบค่าของเช็คบ็อกซ์, หรือการเปลี่ยนแปลงสถานะขององค์ประกอบต้นทางได้ */
    const { name, value } = event.target;
    if (name === 'M_Name') {
      setname(value);                     /** console.log(value) แสดงค่าใน Value */
    } else if (name === 'User_Id') {
      setUserId(value);
    } else if (name === 'M_Pass') {
      setPassword(value);
    } else if (name === 'M_CPass') {
      setConPassword(value);
      if (value === M_Pass) {
        console.log("Password ตรงกัน");
        document.getElementById("lblM_CPass").innerText = "Password Match.";
        document.getElementById("lblM_CPass").style.color = "green";
      } else {
        console.log("Password ไม่ตรงกัน !!");
        document.getElementById("lblM_CPass").innerText = "The Password confirmation does not match.";
        document.getElementById("lblM_CPass").style.color = "red";
      }
    }
  }

  const handleRegister = async (event, type) => {    //async ฟังก์ชันสำหรับ
    event.preventDefault();
  
    if (M_Name === '' || User_Id === '' || M_Pass === '' || M_CPass === '') {
      api.open({    
        message: 'Error',
        description: 'กรุณากรอกข้อมูลทุกช่อง',
        type: 'error',
        duration: 3,
      });
      return;   //จบคำสั่ง
    }
    if(M_Pass !== M_CPass){
      api.open({    
        message: 'Error',
        description: 'กรุณากรอกรหัสผ่านให้ตรงกัน',
        type: 'error',
        duration: 3,
      });
      return;   //จบคำสั่ง
    }
  
    try {     //เมื่อเกิดข้อผิดพลาดในบล็อกโค้ดที่อยู่ภายใน try โปรแกรมจะข้ามการทำงานในบล็อกโค้ดนั้นและเรียกใช้บล็อกโค้ดใน catch ที่เกี่ยวข้อง พารามิเตอร์ error ในบล็อก catch จะรับค่าข้อผิดพลาดที่เกิดขึ้น
      const serverURL = 'http://localhost:3359/api/regis';   //ที่อยู่่ของ ServerAPI
      const dataMember = {   //การเก็บข้อมูลแบบ JSON
        M_Name: M_Name,
        User_Id: User_Id,
        M_Pass: M_Pass,
      };

      // ส่งคำขอ POST ไปยังเซิร์ฟเวอร์
      const response = await axios.post(serverURL,dataMember);   //ได้การตอบกลับ มาเก็บไว้ที่ reponse

      const resp = response.data;
      console.log('รับข้อมูลจากเซิร์ฟเวอร์:', resp.status);  //เข้าถึงตัวแปร status
      if(resp.status == 'Success'){        // ส่วนที่ต้องการทำเมื่อสำเร็จ
        api.open({
          message: 'สมัครสมาชิกสำเร็จ',
          type: type,
          duration: 3,
        });
        setTimeout(() => {
          navigate('/');
        }, 3000); // หน่วงเวลา 3 วินาที (3000 มีค่าเป็นมิลลิวินาที)
      }
      else {
      api.open({
        message: 'User ID ซ้ำ',
        type: 'error',
        duration: 3,
      });
    }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งคำขอ:', error);
    }
  };

  const openNotificationWithIcon = (type) => {

  }
    
    return(
        <div className='Register-box'>
            <h2 style={{textAlign:'center',color:'Indigo'}}>Register</h2>
          <form>{contextHolder}
            <div className='container'>
                <label style={{color:'DimGrey'}}>Name :</label>
                <input status="error" className="Regis-box" type="text" name="M_Name"
                value={M_Name}
                onChange={handleInputChange}
                required  /**บังคับใส่ข้อมูล */
              />

                <label style={{color:'DimGrey'}}>User ID :</label>
                <input className="Regis-box" type="text" name="User_Id"
                value={User_Id}
                onChange={handleInputChange}
                required  /**บังคับใส่ข้อมูล */
              />

                <label style={{color:'DimGrey'}}>Password :</label>
                <input className="Regis-box" type="Password" name="M_Pass"
                value={M_Pass}
                onChange={handleInputChange}
                required  /**บังคับใส่ข้อมูล */
              />

              <label id="lblM_CPass" style={{ color: 'DimGrey' }}> Confirm Password : </label>
                <input className="Regis-box" type="Password" name="M_CPass"
                value={M_CPass}
                onChange={handleInputChange}
                required  /**บังคับใส่ข้อมูล */
              />
           </div>
            <div style={{ display: 'flex', justifyContent: 'center',marginTop:'35px' }}>
                <button onClick={(event) =>handleRegister(event,'success')}
                style={{background: 'LimeGreen',color: 'white',border: 'none', borderRadius: '5px',fontSize: '16px',cursor: 'pointer', padding:'10px', width:'100px'}}>
                Register</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center',marginTop:'20px' }}>
                <button onClick={handleClickCancel}
                style={{background: 'FireBrick',color: 'white',border: 'none', borderRadius: '5px',fontSize: '16px',cursor: 'pointer', padding:'5px',width:'100px'}}
                >Cancel</button>
          </div>
            </form>
        </div>
    );
}



export default Register;
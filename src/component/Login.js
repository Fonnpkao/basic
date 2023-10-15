import React, {useState,useEffect} from 'react';
import { BsFillPersonFill,BsBagFill} from "react-icons/bs";
import {  Button, notification  } from "antd";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style.css'


const LoginBox =()=>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const handleInputChange = (event) => {        /**event.target เพื่อเข้าถึงข้อมูลหรือสถานะขององค์ประกอบต้นทางในการจัดการเหตุการณ์ เช่น การดึงค่าของช่องข้อมูล, การตรวจสอบค่าของเช็คบ็อกซ์, หรือการเปลี่ยนแปลงสถานะขององค์ประกอบต้นทางได้ */
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

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
          console.log('รับข้อมูลจากเซิร์ฟเวอร์:', resp.status);  //เข้าถึงตัวแปร status
        }
        catch(error){
          console.log('เกิดข้อผิดพลาดในการส่งคำขอ:');
        }
      }
    };
         fetchLoginToken();
         console.log('TOKEN '+tokens);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {     //เมื่อเกิดข้อผิดพลาดในบล็อกโค้ดที่อยู่ภายใน try โปรแกรมจะข้ามการทำงานในบล็อกโค้ดนั้นและเรียกใช้บล็อกโค้ดใน catch ที่เกี่ยวข้อง พารามิเตอร์ error ในบล็อก catch จะรับค่าข้อผิดพลาดที่เกิดขึ้น
      const serverURL = 'http://localhost:3359/api/Login';   //ที่อยู่่ของ ServerAPI
      const dataMember = {   //การเก็บข้อมูลแบบ JSON
        User_Id: username,
        M_Pass: password,
      };

      // ส่งคำขอ POST ไปยังเซิร์ฟเวอร์
      const response = await axios.post(serverURL,dataMember);   //ได้การตอบกลับ มาเก็บไว้ที่ reponse

      const resp = response.data;  //รับข้อมูลจากเซิร์ฟเวอร์
      console.log('รับข้อมูลจากเซิร์ฟเวอร์:', resp.status);  //เข้าถึงตัวแปร status
      if(resp.status == 'Success'){        // ส่วนที่ต้องการทำเมื่อสำเร็จ
        api.open({
          message: 'Login Success',
          type: 'success',
          duration: 1,
        });
        localStorage.setItem("Token", resp.token) 
        setTimeout(() => {
          navigate('/Homepage');
        }, 1500); // หน่วงเวลา 1.5 วินาที (1000 มีค่าเป็นมิลลิวินาที)
        //console.log(resp)
      }
      else {
      api.open({
        message: 'Login Failed',
        type: 'error',
        duration: 3,
      });
    }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งคำขอ:', error);
    }
  };

    // ดำเนินการเกี่ยวกับการล็อคอินที่ต้องการทำต่อไป
    // api.open({     /*เป็นออบเจกต์ที่ใช้สำหรับเรียกใช้ฟังก์ชันการแจ้งเตือน*/
    //   message: 'Login Success', /**Title */
    //   description: (
    //     <div>
    //       Username : {username}
    //       <br />
    //       Password : {password}
    //     </div>
    //   ),
    //   duration: 2, /**กำหนดวินที ที่แสดงแจ้งเตือน */
    // });
  // }

  const handleClickRegister = () => {
    navigate('/Register');
  };

  return(
    <div className="login-box">
        <h2>LOGIN</h2>
        <form>{contextHolder} 
          <div className="user-box">
            <label><BsFillPersonFill color="Black" /> Username</label>
              <input style={{border: 'none' ,borderBottom:'solid 2px Cornsilk',background:'none',height:'25px'}} 
                type="text"
                name="username"
                value={username}
                onChange={handleInputChange}   /**onChange คือการตรวจสอบข้อมูลใน Input และทำการเรียกใช้ฟังค์ชั่น */
                required  /**บังคับใส่ข้อมูล */
              />
          </div>
          <div className="user-box" style={{marginTop:'18px'}}>
            <label><BsBagFill size={14} color="Black"/>  Password</label>
              <input style={{border: 'none' ,borderBottom:'solid 2px Cornsilk',background:'none',height:'25px'}}  
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                required
              />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center',marginTop:'35px' }}>
             <Button onClick={(event) =>handleSubmit(event)}
                style={{background: 'Purple',color: 'white',border: 'none', borderRadius: '5px',fontSize: '16px',cursor: 'pointer'}}>
                LOGIN</Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px'  }}>
                <a style={{color: 'Gray',fontSize: '18px',cursor: 'pointer'}}
                href="" onClick={handleClickRegister}>Register</a>
          </div>
      </form>
    </div>
  );
}



export default LoginBox;
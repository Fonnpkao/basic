const http = require('http');
const express = require('express');
const app = express();
const mysql = require('mysql2');
const axios = require('axios');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');  //เพื่อเอาไปใช้ Login
const secret = 'bangtansoyeondan';

app.use(cors());
app.use(express.json());

const port = 3359;    //post API

// เส้นทางแสดงข้อความ "Hello, World!"
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// เริ่มต้นการเชื่อมต่อฐานข้อมูล MySQL


// สร้าง connection pool
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   port: 5599,
//   database: 'kpop',
//   connectionLimit: 10, // จำนวนการเชื่อมต่อสูงสุดใน connection pool
// });

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password:'555999',
  port: 3333,
  database: 'kpop'
});
//การเชื่อมต่อกับฐานข้อมูลสำเร็จหรือไม่ คุณสามารถใช้ callback ในเมธอด getConnection() เพื่อดักจับข้อผิดพลาด:
pool.getConnection((error, connection) => {
  if (error) {
    console.error('Connection Error:', error);
  } else {
    console.log('Connected to the database.');
    // ดำเนินการกับ connection
    connection.release(); // คืน connection เข้าสู่ pool เมื่อเสร็จสิ้น
  }
});

//
function queryDB(queryString, values) {     // เป็นสตริง (string) ที่เก็บคำสั่ง SQL หรือ query ที่ต้องการใช้ในการเรียกข้อมูลหรือปรับปรุงข้อมูลในฐานข้อมูล
  return new Promise((resolve, reject) => {
    pool.query(queryString, values, (err, rows) => {
      if (err) {
        return reject(err);
      }
      return resolve(rows);  //query สำเร็จและไม่เกิดข้อผิดพลาดจะส่งผลลัพธ์ที่ได้จากฐานข้อมูลในรูปแบบของ rows ออกไป ทำให้ Promise ถูก resolve และส่งข้อมูลที่ค้นหาได้กลับออกมาใช้งานต่อได้
    });
  });
}
//เมื่อมีคำขอ HTTP GET เข้าสู่เส้นทาง /api/member แอปพลิเคชันจะเริ่มทำงานฟังก์ชันจากข้อความที่ส่งมาในพารามิเตอร์ (req, res) ซึ่งแทนคำขอที่เข้ามา (req) และออบเจ็กต์การตอบกลับ (res) ที่ใช้สำหรับส่งข้อมูลกลับไปยังผู้ใช้งาน
app.get('/api/member', async (req, res) => {
        try {
          const rows = await queryDB('SELECT * FROM `member`');
          res.json(rows);
        } catch (error) {
          console.error('Database error:', error);
          res.sendStatus(500);
        }
});

app.get('/api/kpop', async (req, res) => {
  try {
    const rows = await queryDB('SELECT * FROM kpop');
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.sendStatus(500);
  }
});

app.post('/api/regis', async (req, res) => {      //สร้างตัวแปรไว้รับเข้าและตอบกลับ
  
    //ตัวอย่างคำสั่ง SQL
    const sql = 'INSERT INTO `member` (`User_Id`, `M_Pass`, `M_Name`, `M_img`) VALUES (?,?,?,"Fon.jpg")';
    const User_Id = req.body.User_Id;  //รูปแบบ  Body เข้าถึงตัวแปร User_Id
    const M_Pass = req.body.M_Pass;
    const M_Name = req.body.M_Name;

    try{
      const user = await queryDB('SELECT * FROM member WHERE User_Id = ?',[User_Id]);  
        if(user.length > 0){
          res.json({status: 'error'});
          return;
        }
        bcrypt.hash(M_Pass, saltRounds, async function(err, hash) { //แปลง Password เป็นรูปแบบ hash การเข้ารหัส
          try {
            const rows = await queryDB(sql,[User_Id,hash,M_Name]);
          if(rows.affectedRows > 0){
            // res.json(rows.insertId);   
            res.json({status: 'Success'});
          }
          } catch (error) {
            console.error('Database error:', error);
            res.sendStatus(500);
          }
        });
    }
    catch (error) {
      console.error('Database error:', error);
      res.sendStatus(500);
    }
    });

    //ข้อมูลจากการ Login
    // app.post('/api/Login', async (req, res) => { 
    //   const User_Id = req.body.User_Id;
    //   const password = req.body.M_Pass;
      
    //   bcrypt.compare(password, '$2b$10$nPOquwSp2F5Hg', function(err, isLogin) {  
    //     if (isLogin) {
    //       res.json({ status: 'Success' });
    //     } else {
    //       res.json({ status: 'Error', err });
    //     }
    //   });
    // });

    app.post('/api/Login',async (req, res) => {
      const User_Id = req.body.User_Id;
      const password = req.body.M_Pass;
        try {
          const users = await queryDB('SELECT * FROM `member` WHERE `User_Id` =?', [User_Id]);
          if(users.length === 0) { 
            res.json({status:'error',message: 'No user found'});
            return;
          }
          bcrypt.compare(password, users[0].M_Pass, function(err, resulf) {  //compare คือการถอดรหัส    //users[0].M_Pass เข้าถึงข้อมูล Users อาร์เรย 0
            if (resulf){
              var token = jwt.sign({ userid: users[0].User_Id}, secret ,{ expiresIn: '1h' });
              res.json({status:'Success',message: 'Logged in',token})
            } else {
              res.json({status:'error',message: 'Logged failed'})
            }
          });
        } catch (error) {
          console.error('Database error:', error);
          res.sendStatus(500);
        }

    })

    app.post('/api/login/authen',async (req, res) => {
      try{
        const token = req.headers.authoriztion.split(' ')
        var decoded = jwt.verify(token[1], secret);

        const users = await queryDB('SELECT * FROM `member` WHERE `User_Id` =?',[decoded.userid]);
        if(users.length === 0) { 
          res.json({status:'error',message: 'No user found'});
          return;
        }
         res.json({status:'Success',message: 'ล๊อกอินสำเร็จ',users})  //Name: users[0].M_Name เข้าถึงตัวแปร M.Name
      }
      catch(error){
        res.json({status:'error',message: 'Token หมดอายุโปรดล๊อกอินใหม่'})
      }
    })
    
// เริ่มต้นการเรียกใช้งานเซิร์ฟเวอร์
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

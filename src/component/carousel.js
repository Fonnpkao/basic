import React, { useState,useEffect } from 'react';
import '../style.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  {Button,List,Card,Meta,Modal,Row,Col,Carousel} from 'antd';
import {LeftOutlined,RightOutlined} from '@ant-design/icons';
import ReactHtmlParser from 'html-react-parser';

const YourCarousel = ({Alldatakpop}) => {

//console.log(Alldatakpop)

  const { Meta } = Card;

  //ตั้งค่าปุ่มเลื่อน >
  const BtnLeftRight = { 
    background: 'none', // ไม่มีพื้นหลัง
    border: 'none', // ไม่มีเส้นขอบ
    cursor: 'pointer', // เปลี่ยนเคอร์เซอร์เป็นลูกศรเมื่อชี้
    padding: 0, // ไม่ใช้ Padding
    outline: 'none', // ไม่ใช้เส้นขอบเมื่อโฟกัส
    transition: 'none', // ลบเอฟเฟกต์เมื่อกด
    overflow:'hidden',  //ลบ Effec ที่ติดมากับปุ่ม
    height:'50px', 
}

  const top10 = [
    {
      "id": 1,
      "type": "clone",
      "bookID": "B2022ctQlt347iv1008160542",
      "img": "https://nginxweb.enjoybook.co/img/book/20220815122934.jpg",
    },
    {
      "id": 2,
      "type": "clone",
      "bookID": "B2021L5lwMAG1m51904163927",
      "img": "https://nginxweb.enjoybook.co/img/book/EJB2021q2gi7kRqX819041637481618825068.png",
    },
    {
      "id": 3,
      "type": "clone",
      "bookID": "B2021FhCZ0NxwL90803153422",
      "img": "https://nginxweb.enjoybook.co/img/book/EJB2021eUtkyz5SZT15101158321634273912.png",
    },
    {
      "id": 4,
      "type": "clone",
      "bookID": "B2021T0ai0ox31i2909120412",
      "img": "https://nginxweb.enjoybook.co/img/book/EJB20216lBz3bChJS29091158481632891528.png",
    }
  ]
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    style: {
      // กำหนด style ให้กับตัว Slider
      padding: '10px',
      backgroundColor: '#fff',
    }, 
    responsive: [
      {
        breakpoint: 1200, // เมื่อหน้าจอมีความกว้างต่ำกว่า 1200px
        settings: {
          slidesToShow: 4, // แสดง 4 รูปภาพในแต่ละรอบ
        },
      },
      {
        breakpoint: 992, // เมื่อหน้าจอมีความกว้างต่ำกว่า 992px
        settings: {
          slidesToShow: 3, // แสดง 3 รูปภาพในแต่ละรอบ
        },
      },
      {
        breakpoint: 768, // เมื่อหน้าจอมีความกว้างต่ำกว่า 768px
        settings: {
          slidesToShow: 2, // แสดง 2 รูปภาพในแต่ละรอบ
        },
      },
      {
        breakpoint: 576, // เมื่อหน้าจอมีความกว้างต่ำกว่า 576px
        settings: {
          slidesToShow: 2, // แสดง 2 รูปภาพในแต่ละรอบ
        },
      },
      {
        breakpoint: 490, // เมื่อหน้าจอมีความกว้างต่ำกว่า 490px
        settings: {
          slidesToShow: 1, // แสดง 1 รูปภาพในแต่ละรอบ
        },
      },
    ],
  };
  
  // ใน useEffect หรือ componentDidMount ของคอมโพเนนต์ของคุณ
  useEffect(() => {
    // ...
    console.log(Alldatakpop);
  }, []);
  
  const nextSlide = () => {
    slider.slickNext();
  };

  // ฟังก์ชันเลื่อนสไลด์ไปทางซ้าย
  const prevSlide = () => {
    slider.slickPrev();
  };

  let slider; // ใช้เก็บการอ้างอิง Slider

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalId, setIsModalId] = useState('');
  const [isModalImge2, setIsModalImge2] = useState('');
  const [isModalDetail, setIsModalDetail] = useState('');

  const OpenModalClick = (e,id,imge2,detail) => {
    setIsModalOpen(true);
    setIsModalId(id);
    setIsModalImge2(imge2 ? JSON.parse(imge2) : []);
    // console.log(imge2)
    setIsModalDetail(detail);
    //console.log('click', e);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

  const cleanedHtml = isModalDetail.replace(/\n/g, ''); // ใช้ Regular Expression ในการ replace ทุกตัว \n ด้วยช่องว่าง
  const modifiedHtmlContent = ReactHtmlParser(cleanedHtml);  //ใช้ในการแปลงข้อความ HTML ให้กลายเป็น JSX (JavaScript XML) เพื่อนำมาแสดงผลในส่วนแสดงผลของ React ได้ โดยปกติ React จะไม่แสดงผลข้อความ HTML ตรง ๆ บนหน้าเว็บไซต์ แต่จะจัดการกับ JSX 

  return (
    // <div>
    //   <div className="carousel-container">
    //     <div className="carousel-content"
    //     style={{transform:`translateX(-${currentIndex * (100 / numVisibleItems)}%)`,}}
    //     >
    //       {top10.map((noveltop) => (
    //         <div key={noveltop.id} className="carousel-card">
    //           {/* นี่คือเนื้อหาของแต่ละรายการใน Carousel */}
    //           {/* <Cardnovel Cardnovel={noveltop} /> */}
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <div>
    //     <button onClick={prevSlide}>ก่อนหน้า</button>
    //     <button onClick={nextSlide}>ถัดไป</button>
    //   </div>
    // </div>

  <div style={{height:'60vh'}}>
    {/* สไลค์เลือกวง */}
    <Slider {...settings} ref={(c) => (slider = c)}>
          {Alldatakpop.map((databoy) => (
            <div key={databoy.id}>
              {/* <img src={databoy.img} style={{ width: '100%', height: '100%' }} alt={`รูปภาพ ${databoy.id}`} /> */}
              <Card
              key={databoy.id}
              hoverable
              style={{width: 240,border:'none',backgroundColor:'Pink',margin:'10px'}}
              cover={<img alt="example" src={databoy.imge} style={{width:'100%',height:'280px',padding:'5px'}} />}
              onClick={(event) =>OpenModalClick(event,databoy.id,databoy.imge2,databoy.detail)}
              >
              <Meta title={databoy.title} description={databoy.description}  />
            </Card>
          </div>
          ))}
      </Slider>
      
      {/* ปุ่มลูกศรซ้าย-ขวา */}
      <div style={{justifyContent:'space-between',display: 'flex', justifyContent: 'center'}} >     
        <div style={{ display: 'flex', transform: 'translateY(-500%)', justifyContent: 'flex-start', zIndex: '999', width:'5%' }}>
          <Button onClick={prevSlide} style={{ ...BtnLeftRight }}>
            <LeftOutlined style={{ fontSize: '50px' }} />
          </Button>
        </div>
        <div style={{ display: 'flex', transform: 'translateY(-500%)', justifyContent: 'flex-end', zIndex: '999', marginLeft: 'auto',width:'5%' }}>
          <Button onClick={nextSlide} style={{ ...BtnLeftRight, marginRight: '20px' }}>
            <RightOutlined style={{ fontSize: '50px' }} />
          </Button>
        </div>
      </div> 

      {/* แสดงเนื้อหาใน Modal */}
      <Modal open={isModalOpen} width={1100} onCancel={handleCancel} okButtonProps={{style:{display:'none'}}}>
      <Row>
        {/* <Col xs={2} sm={4} md={6} lg={8} xl={1}></Col> */}
        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
          {isModalImge2 && isModalImge2.length > 0 && (
          <Carousel autoplay autoplaySpeed={3000}>
            {isModalImge2.map((imageUrl, index) => (
              <div key={index}>
                <img className='imgmodal'
                  src={imageUrl}
                  style={{ width: '100%', objectFit: 'cover' }}
                  alt="Centered Image"
                />
              </div>
            ))}
          </Carousel>
          )}
        </Col>
        {/* <Col xs={2} sm={4} md={6} lg={8} xl={1}></Col> */}
      </Row>
            {modifiedHtmlContent}
      </Modal>
  </div>            
  );
};

export default YourCarousel;
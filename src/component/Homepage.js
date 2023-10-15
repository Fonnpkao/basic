import React, {useState,useEffect,useRef } from 'react';
import { Breadcrumb, Layout, Menu, theme,Input, Space, Button,Image,Dropdown ,message,Card,Row,Col,List,Divider,Modal,Carousel,Pagination} from "antd";
import '../style.css'
import { useNavigate } from 'react-router-dom';
import { DownOutlined,LeftOutlined,RightOutlined} from '@ant-design/icons';
import NavbarTop from './Navbar';
import axios from 'axios';
import ReactHtmlParser from 'html-react-parser';
import YourCarousel from './carousel';
//import 'antd/dist/reset.css'


const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const pageSize = 12;

const items = [
{
  label: 'Boy Group',
  key: '1',
},
{
  label: 'Girl Group',
  key: '2',
}
]

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
   
  };
  const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#C71585',
  };

  const gridStyle = {
    width: '20%',
    textAlign: 'center',
  };

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
export default function HomePage() {     //componant
  const navigate = useNavigate();

  const [datakpop, setdatakpop] = useState([]);
  const [databoy, setdataboy] = useState([]);
  const [datagirl, setdatagirl] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalId, setIsModalId] = useState('');
  const [isModalImge2, setIsModalImge2] = useState('');
  const [isModalDetail, setIsModalDetail] = useState('');
  // const imageUrlString = imge2;
  // const ImgeArray = isModalImge2?.split(',').map(imageUrl => imageUrl.trim());
  // const imageUrlText = '[\'https://images.prestigeonline.com/wp-content/uploads/sites/3/2023/06/13125004/untitled-design-2023-06-09t110926-591-1600x900.jpeg\', \'https://images.prestigeonline.com/wp-content/uploads/sites/3/2023/06/13125004/untitled-design-2023-06-09t110926-591-1600x900.jpeg\', \'https://images.prestigeonline.com/wp-content/uploads/sites/3/2023/06/13125004/untitled-design-2023-06-09t110926-591-1600x900.jpeg\']';
// const ImgeArray = JSON.parse(imageUrlText);
// const ImgeArray = JSON.parse(isModalImge2);
// const ImgeArray = JSON.parse(isModalImge2);
// const ImgeArray = JSON.parse(isModalImge2);

  // const ImgeArray = [
  //   'https://images.prestigeonline.com/wp-content/uploads/sites/3/2023/06/13125004/untitled-design-2023-06-09t110926-591-1600x900.jpeg',
  //   'https://images.prestigeonline.com/wp-content/uploads/sites/3/2023/06/13125004/untitled-design-2023-06-09t110926-591-1600x900.jpeg',
  //   'https://images.prestigeonline.com/wp-content/uploads/sites/3/2023/06/13125004/untitled-design-2023-06-09t110926-591-1600x900.jpeg',
  // ];
  
  // const ImgeArrayText = JSON.stringify(ImgeArray);
  // const imageUrlString = 'https://images.prestigeonline.com/wp-content/uploads/sites/3/2023/06/13125004/untitled-design-2023-06-09t110926-591-1600x900.jpeg,https://images.prestigeonline.com/wp-content/uploads/sites/3/2023/06/13125004/untitled-design-2023-06-09t110926-591-1600x900.jpeg,https://images.prestigeonline.com/wp-content/uploads/sites/3/2023/06/13125004/untitled-design-2023-06-09t110926-591-1600x900.jpeg';
  
  // const imageUrlTextFromDatabase = '[\"https://images.prestigeonline.com/wp-content/uploads/sites/3/2023/06/13125004/untitled-design-2023-06-09t110926-591-1600x900.jpeg\",\"https://images.prestigeonline.com/wp-content/uploads/sites/3/2023/06/13125004/untitled-design-2023-06-09t110926-591-1600x900.jpeg\",\"https://images.prestigeonline.com/wp-content/uploads/sites/3/2023/06/13125004/untitled-design-2023-06-09t110926-591-1600x900.jpeg\"]';
  // const imageUrlTextFromDatabase = isModalImge2;
  // const ImgeArray = isModalImge2;

  // const modifiedHtml = '<h2><span style="color: rgb(85, 57, 130);">BTS หรือ &nbsp;Bantansoyeondan</span></h2>\n<h2><span style="color: rgb(147, 101, 184);">BTS ประกอบไปด้วยสมาชิกทั้งหมด 7 คน</span></h2>\n<ol>\n    <li><strong>RM</strong> ที่ย่อมาจาก Real Me หรือสเตจเนมเดิมคือ Rap Monster ลีดเดอร์ของวง <strong>คิม&nbsp;นัมจุน</strong></li>\n    <li><strong>จิน</strong> หรือ <strong>คิมซอกจิน</strong> พี่ใหญ่ของวง เจ้าของฉายา Worldwide Handsome ที่เจ้าตัวตั้งขึ้นมาด้วยตัวเองแต่ก็ปฏิเสธไม่ได้จริง ๆ เพราะหล่อมาก</li>\n    <li><strong>SUGA</strong> หรือ <strong>มินยุนกิ</strong> แรปเปอร์และโปรดิวเซอร์ทำเพลงมือทองของวง</li>\n    <li><strong>J-hope</strong> หรือ <strong>จองโฮซอก</strong> เมนแดนซ์และแรปเปอร์ของวงที่มีรอยยิ้มสดใสเป็นเอกลักษณ์</li>\n    <li><strong>จีมิน</strong> หรือ <strong>ปาร์คจีมิน</strong> เจ้าของเสียงหวานใสที่มีเสน่ห์มาพร้อมกับดวงตายิ้มสวย แถมยังเต้นได้พริ้วไหวสุดๆ</li>\n    <li><strong>V</strong> หรือ <strong>คิมแทฮยอง</strong> นอกจากเสียงนุ่มทุ้มที่ไม่มีใครเหมือนแล้ว ยังเคยได้รับรางวัลการันตีให้เป็นสุดยอดชายหนุ่มหน้าหล่อแห่งปี 2017 อีกด้วย มาถึงคนสุดท้าย</li>\n    <li><strong>JK</strong> หรือ <strong>จอนจองกุก</strong> น้องเล็กคนสุดท้อง ที่ได้ฉายาฮวังกึมมักเน่หรือน้องเล็กทองคำ เพราะมีความสามารถรอบด้าน เก่งไปหมดซะทุกอย่าง เป็นฉายาที่เหมาะสมที่สุดแล้ว</li>\n</ol>';
  // const modifiedHtmlContent = ReactHtmlParser(modifiedHtml);
  const cleanedHtml = isModalDetail.replace(/\n/g, ''); // ใช้ Regular Expression ในการ replace ทุกตัว \n ด้วยช่องว่าง
  const modifiedHtmlContent = ReactHtmlParser(cleanedHtml);

  const handleMenuClick = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const OpenModalClick = (e,id,imge2,detail) => {
    message.info('เลขที่: '+id);
    setIsModalOpen(true);
    setIsModalId(id);
    setIsModalImge2(imge2 ? JSON.parse(imge2) : []);
    // console.log(imge2)
   

    setIsModalDetail(detail);
    //console.log('click', e);
    };
 
  // const mappedData = data.map((item, index) => (
  // ));
  
  //console.log(mappedData);
  const [columns, setColumns] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      // ปรับค่าคอลัมน์ตามขนาดหน้าจอ
      if (window.innerWidth <= 454) {
        setColumns(1); // ในรูปแบบโทรศัพท์ให้เป็นคอลัมน์เดียว
      } else if (window.innerWidth <= 820){
        setColumns(2); // 
      } else if (window.innerWidth <= 1200){
        setColumns(3); // 
      } else if (window.innerWidth <= 1600){
        setColumns(4); // 
      }else if (window.innerWidth <= 2000){
        setColumns(5); // 
      }else if (window.innerWidth <= 2400){
        setColumns(6); // 
      }else{
        setColumns(7); // 
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // เรียกใช้ฟังก์ชันเมื่อคอมโพเนนต์ถูกโหลด

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    //try {
      axios.get('http://localhost:3359/api/kpop').then((response) => {
        setdatakpop(response.data);
      })
        // const response = await axios.get('http://localhost:3001/api/kpop');
        // const resp = response.data;
        // setdatakpop(resp);
        //console.log('รับข้อมูลจากเซิร์ฟเวอร์:', resp);
    // } catch (error) {
    //     console.log(error);
    // }
    .catch((error) => {
      console.log(error);
    });
  }, []);
  //console.log(datakpop)

  useEffect(() => {
    if (datakpop !== ' ') {
        const databoyItems = [];
        const datagirlItems = [];

        datakpop.forEach(item => {
            if (item.K_Type === '1') {
                databoyItems.push({
                    id: item.K_Id,
                    title: item.K_Title,
                    description: item.K_Description,
                    imge: item.K_Imge,
                    imge2: item.K_Imge2,
                    detail : item.K_Detail,
                });
            } else if (item.K_Type === '2') {
                datagirlItems.push({
                    id: item.K_Id,
                    title: item.K_Title,
                    description: item.K_Description,
                    imge: item.K_Imge,
                    imge2: item.K_Imge2,
                    detail : item.K_Detail,
                });
            }
        });
        setdataboy(databoyItems);
        setdatagirl(datagirlItems);
    }
}, [datakpop]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [currentPageBoy, setCurrentPageBoy] = useState(1);
  const [currentPageGirl, setCurrentPageGirl] = useState(1);
  
  const startIndexBoy = (currentPageBoy - 1) * pageSize;
  const endIndexBoy = startIndexBoy + pageSize;
  const visibleDataBoy = databoy.slice(startIndexBoy, endIndexBoy);  //แยกประเภทข้อมูล

  const startIndexGirl = (currentPageGirl - 1) * pageSize;
  const endIndexGirl = startIndexGirl + pageSize;
  const visibleDataGirl = datagirl.slice(startIndexGirl, endIndexGirl);

  const handlePageChangeBoy = (page) => {
    setCurrentPageBoy(page);
  };

  const handlePageChangeGirl = (page) => {
    setCurrentPageGirl(page);
  };

  const carouselRef = useRef(null);

  const ClickLeft = () => {
    carouselRef.current.prev();
  };

  const ClickRight = () => {
    carouselRef.current.next();
  };
  return (
    <div> 
      {/* <Layout className="layout" style={{ display: 'flex', flexDirection: 'column' }}> */}
        <Header style={{...headerStyle}} >
        <NavbarTop />
        </Header>
        <Content>
          <Divider orientation="left">
            <Button className="button-title danger">Boy Group</Button>
          </Divider>
          <YourCarousel Alldatakpop={databoy} Allimge2={isModalImge2}/>  
          <Divider orientation="left">
            <Button className="button-title danger">Girl Group</Button>
          </Divider>
          <YourCarousel Alldatakpop={datagirl} Allimge2={isModalImge2}/>  
          {/* <List style={{padding:'20px 30px 10px 30px',backgroundColor:'black'}}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={visibleDataBoy}  
            renderItem={(item) => (
              <List.Item>
               <Card
                  //key={index}
                  hoverable
                  style={{width: 230,border:'none'}}
                  cover={<img alt="example" src={item.imge}style={{width:'100%',height:'280px'}} />}
                  onClick={(event) =>OpenModalClick(event,item.id,item.imge2,item.detail)}
                >
                  <Meta title={item.title} description={item.description}  />
                </Card>
              </List.Item>
            )}
          /> */}
          {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Pagination
              style={{}}
              defaultCurrent={1}
              current={currentPageBoy}
              total={databoy.length}
              pageSize={pageSize}
              onChange={handlePageChangeBoy}
            />
          </div> */}
          {/* <Divider orientation="left">
            <Button className="button-title danger">Girl Group</Button>
          </Divider> */}
          {/* <List style={{padding:'20px 30px 10px 30px',backgroundColor:'Pink'}}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={visibleDataGirl}
            renderItem={(item) => (
              <List.Item>
               <Card
                  //key={index}
                  hoverable
                  style={{
                    width: 230,  
                  }}
                  cover={<img alt="example" src={item.imge}style={{width:'100%',height:'280px'}} />}
                >
                  <Meta title={item.title} description={item.description}  />
                </Card>
              </List.Item>
            )}
          /> */}
          {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Pagination
              style={{}}
              defaultCurrent={1}
              current={currentPageGirl}
              total={datagirl.length}
              pageSize={pageSize}
              onChange={handlePageChangeGirl}
            />
          </div> */}
        </Content>
        <Modal title={isModalId} open={isModalOpen} width={1100} onCancel={handleCancel} okButtonProps={{style:{display:'none'}}}>
  
  <Row>
    <Col xs={2} sm={4} md={6} lg={8} xl={1}></Col>
    <Col xs={20} sm={16} md={12} lg={8} xl={22} 
    style={{height:'80vh',width:'100%'}}>
      {isModalImge2 && isModalImge2.length > 0 && (
      <Carousel autoplay autoplaySpeed={3000} style={{ maxWidth: '100%', width: '100%', height: 'auto' }}>
        {isModalImge2.map((imageUrl, index) => (
          <div key={index}>
            <img
              src={imageUrl}
              style={{ maxWidth: '100%', height: '80vh', objectFit: 'cover', maxHeight: '100%' }}
              alt="Centered Image"
            />
          </div>
        ))}
      </Carousel>
      )}
    </Col>
    <Col xs={2} sm={4} md={6} lg={8} xl={1}></Col>
  </Row>
        {modifiedHtmlContent}
        </Modal>
        <Footer style={footerStyle}>Footer</Footer>
      {/* </Layout> */}
    </div>
  );
};


// style={{display: 'flex',justifycontent: 'flex-end'}}


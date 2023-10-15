import React from 'react';
import { Card, Row, Col } from 'antd';
import ReactAudioPlayer from 'react-audio-player';
import MusicList from '../MusicList/zamona-net-bts-butter.mp3';

export default function Playlist() {
    const { Meta } = Card;

    // สมมติว่าคุณมีข้อมูลสำหรับแต่ละ Card ในรายการ playlists
    const playlists = [
        {
            title: 'Europe Street beat 1',
            description: 'www.instagram.com/1',
            imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        },
        {
            title: 'Europe Street beat 2',
            description: 'www.instagram.com/2',
            imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        },
        {
            title: 'Europe Street beat 3',
            description: 'www.instagram.com/3',
            imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        },
        {
            title: 'Europe Street beat 4',
            description: 'www.instagram.com/4',
            imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        },
        {
            title: 'Europe Street beat 4',
            description: 'www.instagram.com/4',
            imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        },
        {
            title: 'Europe Street beat 4',
            description: 'www.instagram.com/4',
            imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        },
        {
            title: 'Europe Street beat 4',
            description: 'www.instagram.com/4',
            imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        },
        {
            title: 'Europe Street beat 4',
            description: 'www.instagram.com/4',
            imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        },
        {
            title: 'Europe Street beat 4',
            description: 'www.instagram.com/4',
            imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        },
        {
            title: 'Europe Street beat 4',
            description: 'www.instagram.com/4',
            imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        },
        
    ];

return (
    <div>
    <Row gutter={16}>
        {playlists.map((playlist, index) => (   //map() ที่ใช้สำหรับการแปลงแต่ละสมาชิกในอาร์เรย์ เพื่อวนลูปข้อมูลในอาร์เรย์ออกมาแสดง
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={index}>
            <Col span={8}>
            <img style={{width:'100%', borderRadius:'10px',padding:'3px'}} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </Col>
            <Col span={16}>
            <div style={{ flex: 1 }}> {/* ใช้ flex: 1 เพื่อให้เนื้อหาอยู่ทางขวา */}
                    <Meta title="Europe Street beat" description="www.instagram.com" />
            </div>
            <div>
        <ReactAudioPlayer style={{width:'100%',}}
          src={MusicList}
        //   autoPlay
          controls
        />
      </div>
        </Col>    
        </Col>
        ))}
    </Row>
    
    </div>
); 
}

import React, { useEffect, useState } from 'react';
import { Typography, Input, List, Card, Image, Space } from "antd";

function App() {
  const [searchText, setSearchText] = useState("")
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
// https://remarkable-figolla-03c88a.netlify.app/
  useEffect(() =>{
    //Api liya hai website se jo niche link hai search wala
    setLoading(true)
    fetch(`https://dummyjson.com/products/search?q=${searchText}`)
   .then(res => res.json())
   .then(response=>{
     setLoading(false)
     setDataSource(response.products)
   });
  },[searchText])
  return (
    <Space style={{padding: '0px 16px'}} direction='vertical'>
      <Typography.Title style={{textAlign: "center", fontFamily: "monospace"}}>
        Sonikesh's Gallery
      </Typography.Title>
      <Input.Search style={{maxWidth: 500, display: "flex", margin: "auto"}} onSearch={(value)=>{
          setSearchText(value)
      }}></Input.Search>
      <Typography.Text>
        Showing results for: <Typography.Text strong>{searchText || 'All'}</Typography.Text>
      </Typography.Text>
      <List loading={loading} dataSource={dataSource} grid={{xs:1, sm:2, md:3, lg:4, xl:5, xxl:6 }} 
      renderItem={(item=>{
         return <Card hoverable key={item.id} style={{height: 300, margin: 12, overflow:'hidden'}}>
             <Image src={item.thumbnail} preview={{ visible: false }} onClick={()=>{
                setPreviewImages(item.images)
             }}></Image>
         </Card>
      })}></List>
      {
        previewImages.length>0 ? (<Image.PreviewGroup preview={{visible: previewImages.length, onVisibleChange:(value)=>{
          if(!value){
            setPreviewImages([])
          }
        }}}>
          {
            previewImages.map((image)=>{
              return <Image src={image} />
            })
          }
        </Image.PreviewGroup>
        ): null
      } 
    </Space>
  );
}

export default App;

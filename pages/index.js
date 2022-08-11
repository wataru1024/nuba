import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react';
import db from '../config/firebase'
import { collection, setDoc, getDocs, doc} from "firebase/firestore";
import SelectBar from './components/selectBar';
import Link from 'next/link';

export default function Home() {

  const [menuList, setMenuList] = useState([]);
  
  async function getFirebaseItems() {
    const menuCol = collection(db, 'menu');
    const menuSnapshot = await getDocs(menuCol);
    const cityList = menuSnapshot.docs.map(doc => doc.data());
    
    setMenuList(cityList);
  }
  useEffect(() => {
    getFirebaseItems();
  }, []);
  
  
  
  const [iFood_name, setiFood_name] = useState('');
  const [iFood_price, setiFood_price] = useState('');
  const [iFood_size, setiFood_size] = useState('');
  const [iFood_color, setiFood_color] = useState('#000000');
  
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const d ={
      food_color: iFood_color,
      food_name: iFood_name,
      food_price: Number(iFood_price),
      food_size: iFood_size
    }
    setMenuList([...menuList,d])
    await setDoc(doc(db, "menu", iFood_name), {
      ...d
    });

    setiFood_name('')
    setiFood_price('')
    setiFood_size('')
    setiFood_color('')
    console.log(d)
  }

  
  const exporttest = menuList.map((food, index) => (
    <div key={index.toString()}>      
      <SelectBar 
        food={food}
        index={index} 
        setMenuList={setMenuList} 
        menuList={menuList}>          
      </SelectBar>
    </div>
  ));


  return (
    <>
      <h1>Menu作成画面</h1>
      {exporttest}
      <div>
        <input placeholder='name' value={iFood_name} onChange={(e)=>{setiFood_name(e.target.value)}}></input>
        <input placeholder='price'value={iFood_price} onChange={(e)=>{setiFood_price(e.target.value)}}></input>
        <input placeholder='size' value={iFood_size} onChange={(e)=>{setiFood_size(e.target.value)}}></input>
        <input placeholder='color' type="color" value={iFood_color} onChange={(e)=>{setiFood_color(e.target.value)}}></input>
      <button onClick={handleSubmit}>追加</button>
      </div>
      <Link href="/abc/abc">
        <button id={styles.startOrder}>このMenuでオーダーを開始</button>
      </Link>
    </>
  )
}

// async function f() {
  //   const querySnapshot = await getDocs(collection(db, "menu"));
  //   querySnapshot.forEach((doc) => {
    //     console.log(doc.id, " => ", doc.data());
    //   });
    // }
    // f()
    
    // const unsub = onSnapshot(
      //   doc(db, "menu", "food"), (doc) => {  
        //   console.log("Current data: ", doc.data());
        // }); 
        
        //https://engineering.webstudio168.jp/2022/02/firebase-js-sdk-%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3-9%E3%81%A7cloud-firestore%E3%81%AB%E6%8E%A5%E7%B6%9A%E3%81%99%E3%82%8B%E3%81%AB%E3%81%AF/#toc2
        

// https://it-memo.work/javascript-spread-array-basic/
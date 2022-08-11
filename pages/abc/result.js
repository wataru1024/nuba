import styles from '../../styles/Result.module.css' 
import { doc, collection, setDoc, getDocs, serverTimestamp} from "firebase/firestore";
import db from '../../config/firebase'
import React, {useEffect, useState } from 'react';
import Link from 'next/link';
import SendSheet from '../components/sendSheet';


export default function resultPage() {


  const [result, setResult] = useState({doneList:[], menuList:[]})
 

  //時間定義
  const date = new Date()
  const orderedYear = date.getFullYear()
  const orderedMonth = date.getMonth() + 1
  const orderedDate = orderedMonth+"_"+date.getDate()
  const orderedTime = date.getHours()+"時"+date.getMinutes()+"分"

  const collectionName = orderedYear+"_"+orderedDate

  //firebase読み込み
  async function getFirebaseItems () {
    const doneCol = collection(db, collectionName+":Done");
    const doneSnapshot = await getDocs(doneCol);
    const doneList = doneSnapshot.docs.map(doc => doc.data());
    
    const menuCol = collection(db, 'menu');
    const menuSnapshot = await getDocs(menuCol);
    const menuList = menuSnapshot.docs.map(doc => doc.data());

    setResult({doneList:doneList, menuList:menuList})
  }
  useEffect(() => {
    getFirebaseItems();
  }, []);

  let sumTotal = 0
  result.doneList.forEach(el => {   
    sumTotal = sumTotal + el.total
  });

  let menuNameBox = []
  result.menuList.forEach(el=>{
    menuNameBox.push(el.food_name)
  })

  let totallingData = []
  menuNameBox.forEach(menuName => {
    let count = 0
    result.doneList.forEach(el=>{

      el.foods.forEach(orderedFood =>{
        if(menuName == orderedFood.name) {
          count = count + orderedFood.count
        }
      })
      
    })
    totallingData.push({orderedFoodName:menuName, count:count})
  });
  console.log(totallingData)

  const thankYou = totallingData.map((el,index)=>(
    <div key={index.toString()} >
      {el.orderedFoodName}:{el.count}
    </div>
  ))






  return(<>
    <Link href="/abc/abc"><a><button>←</button></a></Link>
    {thankYou}
    <h1>売上:{sumTotal}円!!</h1>
    <SendSheet
      totallingData={totallingData}
      sumTotal={sumTotal}
    ></SendSheet>
  </>)
}